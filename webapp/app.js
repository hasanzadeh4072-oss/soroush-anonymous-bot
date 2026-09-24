const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

alert("تست ۵ اجرا شد ✅");

sendButton.addEventListener("click", () => {

    status.textContent = "در حال باز کردن Render...";

    window.location.href =
        "https://soroush-anonymous-bot.onrender.com/health";

});
