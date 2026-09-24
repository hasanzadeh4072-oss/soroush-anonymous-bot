const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

alert("تست ۳ اجرا شد ✅");

sendButton.addEventListener("click", () => {
    status.textContent = "تست ۳ اجرا شد ✅";
});
