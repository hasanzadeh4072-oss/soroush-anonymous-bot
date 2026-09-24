import os
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

TOKEN = os.environ.get("SOROUSH_TOKEN")
TARGET = 203571

if not TOKEN:
    raise RuntimeError("SOROUSH_TOKEN environment variable is not set.")

API = f"https://api.splus.ir/bot{TOKEN}"


@app.route("/", methods=["GET"])
def home():
    return "Anonymous Soroush Bot is running", 200


@app.route("/health", methods=["GET"])
def health():
    return "OK", 200


# مسیر مخصوص WebApp
# مسیرهای قبلی بات دست‌نخورده باقی می‌مانند.
@app.route("/webapp", methods=["POST", "OPTIONS"])
def webapp():

    if request.method == "OPTIONS":
        response = jsonify({"ok": True})
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response, 200

    data = request.get_json(silent=True) or {}

    print("WEBAPP DATA:", data)

    text = (data.get("message") or "").strip()
    message_type = data.get("type", "anonymous")
    user = data.get("user") or {}

    if not text:
        response = jsonify({
            "ok": False,
            "error": "متن پیام خالی است."
        })
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response, 400

    if len(text) > 2000:
        response = jsonify({
            "ok": False,
            "error": "متن پیام بیش از حد مجاز است."
        })
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response, 400

    # پیام ناشناس
    if message_type == "anonymous":

        admin_text = (
            "📩 پیام ناشناس:\n\n"
            + text
        )

    # پیام با مشخصات
    elif message_type == "identified":

        user_id = user.get("id")
        first_name = user.get("first_name") or ""
        last_name = user.get("last_name") or ""
        username = user.get("username") or ""

        sender_name = (
            f"{first_name} {last_name}"
        ).strip()

        admin_text = (
            "📩 پیام با مشخصات:\n\n"
            + text
            + "\n\n"
            + "👤 اطلاعات فرستنده:\n"
            + f"شناسه کاربر: {user_id or 'نامشخص'}"
        )

        if sender_name:
            admin_text += (
                f"\nنام: {sender_name}"
            )

        if username:
            admin_text += (
                f"\nنام کاربری: @{username}"
            )

    else:

        response = jsonify({
            "ok": False,
            "error": "نوع پیام نامعتبر است."
        })
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response, 400

    try:

        response = requests.post(
            f"{API}/sendMessage",
            json={
                "chat_id": TARGET,
                "text": admin_text
            },
            timeout=20
        )

        print(
            "WEBAPP SEND STATUS:",
            response.status_code
        )

        print(
            "WEBAPP SEND RESPONSE:",
            response.text
        )

        if not response.ok:

            result = jsonify({
                "ok": False,
                "error": "ارسال پیام انجام نشد."
            })

            result.headers[
                "Access-Control-Allow-Origin"
            ] = "*"

            return result, 500

        result = jsonify({
            "ok": True
        })

        result.headers[
            "Access-Control-Allow-Origin"
        ] = "*"

        return result, 200

    except Exception as e:

        print(
            "WEBAPP API ERROR:",
            repr(e)
        )

        result = jsonify({
            "ok": False,
            "error": "خطا در ارسال پیام."
        })

        result.headers[
            "Access-Control-Allow-Origin"
        ] = "*"

        return result, 500


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
            "سلام 👋\n\n"
            "💌 اینجا می‌تونی نظرات، پیشنهادات یا هر پیامی که دوست داری رو "
            "به‌صورت ناشناس برای کانال شعرکده ارسال کنی.\n\n"
            "🔐 هویتت برای مدیر کانال نمایش داده نمی‌شه.\n\n"
            "@LIFE_M23 | شعرکده"
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

            print(
                "START RESPONSE STATUS:",
                response.status_code
            )

            print(
                "START RESPONSE:",
                response.text
            )

        except Exception as e:

            print(
                "SOROUSH API ERROR:",
                repr(e)
            )

        return "OK", 200

    # اگر پیام متنی نیست
    if not text:

        print("NO TEXT FOUND")

        return "OK", 200

    # جلوگیری از ارسال پیام مدیر به خودش
    if user_id == TARGET:

        print(
            "MESSAGE FROM ADMIN - NOT FORWARDED"
        )

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

        print(
            "SEND MESSAGE STATUS:",
            response.status_code
        )

        print(
            "SEND MESSAGE RESPONSE:",
            response.text
        )

        # پیام تأیید برای فرستنده
        if response.ok:

            confirmation_text = (
                "پیامت با موفقیت به شعرکده رسید. ✅\n\n"
                "💌 اگر حرف دیگه‌ای داری، همین‌جا برامون بفرست.\n\n"
                "@LIFE_M23 | شعرکده"
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

        print(
            "SOROUSH API ERROR:",
            repr(e)
        )

    return "OK", 200


if __name__ == "__main__":

    port = int(
        os.environ.get(
            "PORT",
            10000
        )
    )

    app.run(
        host="0.0.0.0",
        port=port
    )
