import os
import requests
from flask import Flask, request

app = Flask(__name__)

TOKEN = os.environ["SOROUSH_TOKEN"]
TARGET = "@mohammad_h23"

API = f"https://api.splus.ir/bot{TOKEN}"


@app.route("/", methods=["GET"])
def home():
    return "Anonymous Soroush Bot is running"


@app.route("/webhook", methods=["POST"])
def webhook():
    update = request.get_json(silent=True) or {}
    message = update.get("message", {})

    text = message.get("text")

    if text:
        requests.post(
            f"{API}/sendMessage",
            json={
                "chat_id": TARGET,
                "text": "📩 پیام ناشناس:\n\n" + text
            },
            timeout=20
        )

    return "OK"


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
