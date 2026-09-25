import os
import requests
from flask import Flask, request

app = Flask(__name__)

TOKEN = os.environ.get("SOROUSH_TOKEN")
TARGET = 203571

API = f"https://api.splus.ir/bot{TOKEN}"


# پیام با مشخصات فقط برای یک پیام
user_modes = {}


# کیبورد معمولی پایین صفحه
KEYBOARD = {
    "keyboard": [
        [
            {"text": "🕵️ پیام ناشناس"},
            {"text": "👤 پیام با ارسال نام و شناسه کاربری"}
        ]
    ],
    "resize_keyboard": True
}


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
    sender = message.get("from") or {}

    user_id = chat.get("id")

    # پاسخ به دستور /start
    if text == "/start":
        welcome_text = (
            "سلام 👋\n\n"
            "💌 اینجا می‌تونی نظرات، پیشنهادات یا هر پیامی که دوست داری رو "
            "به‌صورت ناشناس برای کانال شعرکده ارسال کنی.\n\n"
            "🔐 هویتت برای مدیر کانال نمایش داده نمی‌شه.\n\n"
            "‼️ اما هر بار که گزینهٔ «پیام با ارسال نام و شناسه کاربری» رو "
            "انتخاب کنی، مشخصاتت همراه پیام برای پاسخ‌گویی در اختیار مدیر قرار می‌گیره.\n\n"
            "@LIFE_M23 | شعرکده"
        )

        try:
            response = requests.post(
                f"{API}/sendMessage",
                json={
                    "chat_id": user_id,
                    "text": welcome_text,
                    "reply_markup": KEYBOARD
                },
                timeout=20
            )

            print("START RESPONSE STATUS:", response.status_code)
            print("START RESPONSE:", response.text)

        except Exception as e:
            print("SOROUSH API ERROR:", repr(e))

        return "OK", 200

    # انتخاب پیام ناشناس
    if text == "🕵️ پیام ناشناس":
        user_modes.pop(user_id, None)

        try:
            response = requests.post(
                f"{API}/sendMessage",
                json={
                    "chat_id": user_id,
                    "text": (
                        "🕵️ پیام ناشناس انتخاب شد.\n\n"
                        "حالا پیامت رو بفرست."
                    ),
                    "reply_markup": KEYBOARD
                },
                timeout=20
            )

            print("MODE RESPONSE STATUS:", response.status_code)
            print("MODE RESPONSE:", response.text)

        except Exception as e:
            print("SOROUSH API ERROR:", repr(e))

        return "OK", 200

    # انتخاب پیام با نام و شناسه کاربری
    if text == "👤 پیام با ارسال نام و شناسه کاربری":
        user_modes[user_id] = "identified"

        try:
            response = requests.post(
                f"{API}/sendMessage",
                json={
                    "chat_id": user_id,
                    "text": (
                        "👤 پیام با ارسال نام و شناسه کاربری انتخاب شد.\n\n"
                        "مشخصاتت فقط همراه با پیام بعدی برای مدیر ارسال می‌شه.\n\n"
                        "حالا پیامت رو بفرست."
                    ),
                    "reply_markup": KEYBOARD
                },
                timeout=20
            )

            print("MODE RESPONSE STATUS:", response.status_code)
            print("MODE RESPONSE:", response.text)

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

    # بررسی حالت پیام
    identified = user_modes.pop(user_id, None) == "identified"

    # ارسال پیام ناشناس
    if not identified:
        message_text = (
            "📩 پیام ناشناس:\n\n"
            + text
        )

    # ارسال پیام با مشخصات
    else:
        first_name = (
            sender.get("first_name")
            or chat.get("first_name")
            or ""
        )

        last_name = (
            sender.get("last_name")
            or chat.get("last_name")
            or ""
        )

        username = (
            sender.get("username")
            or chat.get("username")
            or ""
        )

        full_name = f"{first_name} {last_name}".strip()

        if not full_name:
            full_name = "نام ثبت نشده"

        if username:
            username_text = "@" + username
        else:
            username_text = "ندارد"

        message_text = (
            "📩 پیام با مشخصات فرستنده:\n\n"
            f"👤 نام: {full_name}\n"
            f"🔗 نام کاربری: {username_text}\n"
            f"🆔 شناسه: {user_id}\n\n"
            + text
        )

    # ارسال پیام به مدیر
    try:
        response = requests.post(
            f"{API}/sendMessage",
            json={
                "chat_id": TARGET,
                "text": message_text
            },
            timeout=20
        )

        print("SEND MESSAGE STATUS:", response.status_code)
        print("SEND MESSAGE RESPONSE:", response.text)

        # پیام تأیید برای فرستنده
        if response.ok:
            confirmation_text = (
                "پیامت با موفقیت به شعرکده رسید. ✅\n\n"
                "💌 اگر حرف دیگه‌ای داری، همین‌جا برامون بفرست.\n\n"
                "‼️ توجه کن: اگر می‌خوای مشخصاتت به مدیر کانال برسه، "
                "باید قبل از هر پیام گزینهٔ "
                "«پیام با ارسال نام و شناسه کاربری» رو انتخاب کنی.\n\n"
                "@LIFE_M23 | شعرکده"
            )

            confirmation_response = requests.post(
                f"{API}/sendMessage",
                json={
                    "chat_id": user_id,
                    "text": confirmation_text,
                    "reply_markup": KEYBOARD
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
