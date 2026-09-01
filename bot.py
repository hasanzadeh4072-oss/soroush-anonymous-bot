import os
import requests
from flask import Flask, request

app = Flask(__name__)

TOKEN = os.environ.get("SOROUSH_TOKEN")
TARGET = 203571

API = f"https://api.splus.ir/bot{TOKEN}"


@app.route("/", methods=["GET"])
def home():
    return "Anonymous Soroush Bot is running", 200


@app.route("/health", methods=["GET"])
def health():
    return "OK", 200


@app.route("/webhook", methods=["POST"])
def webhook():
    update = request.get_json(silent=True) or {}

    print("RECEIVED UPDATE:", update)

    message = update.get("message") or {}
    text = message.get("text")

    if not text:
        print("NO TEXT FOUND")
        return "OK", 200

    try:
        response = requests.post(
            f"{API}/sendMessage",
            json={
                "chat_id": TARGET,
                "text": "📩 پیام ناشناس:\n\n" + text
            },
            timeout=20
        )

        print("SEND MESSAGE STATUS:", response.status_code)
        print("SEND MESSAGE RESPONSE:", response.text)

    except Exception as e:
        print("SOROUSH API ERROR:", repr(e))

    return "OK", 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
