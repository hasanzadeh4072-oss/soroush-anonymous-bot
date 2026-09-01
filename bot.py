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
    chat = message.get("chat") or {}

    user_id = chat.get("id")

    # پاسخ به دستور /start
    if text == "/start":
        welcome_text = (
            "👋 سلام!\n\n"
            "اینجا می‌تونی پیام خودت رو به‌صورت ناشناس ارسال کنی.\n\n"
            "💬 نظرت، پیشنهادت یا پاسخ چالش رو همین‌جا تایپ کن و بفرست.\n\n"
            "📩 پیام شما بدون نمایش هویت برای مدیر ارسال می‌شود."
        )

        try:
            response = requests.post(
                f"{API}/sendMessage",
                json={
                    "chat_id": user_id,
                    "text": welcome_text
                },
                timeout=20
            )

            print("START RESPONSE STATUS:", response.status_code)
            print("START RESPONSE:", response.text)

        except Exception as e:
            print("SOROUSH API ERROR:", repr(e))

        return "OK", 200

    # اگر پیام متنی نیست
    if not text:
        print("NO TEXT FOUND")
        return "OK", 200

    # جلوگیری از ارسال پیام مدیر به خودش
    if user_id == TARGET:
        print("MESSAGE FROM ADMIN - NOT FORWARDED")
        return "OK", 200

    # ارسال پیام ناشناس به مدیر
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

        # پیام تأیید برای فرستنده
        if response.ok:
            confirmation_text = (
                "✅ پیام شما با موفقیت ارسال شد.\n\n"
                "اگر پیام دیگری دارید، می‌توانید همین‌جا ارسال کنید."
            )

            confirmation_response = requests.post(
                f"{API}/sendMessage",
                json={
                    "chat_id": user_id,
                    "text": confirmation_text
                },
                timeout=20
            )

            print(
                "CONFIRMATION STATUS:",
                confirmation_response.status_code
            )
            print(
                "CONFIRMATION RESPONSE:",
                confirmation_response.text
            )

    except Exception as e:
        print("SOROUSH API ERROR:", repr(e))

    return "OK", 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)


