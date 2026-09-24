const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");

alert("تست ۴ اجرا شد ✅");

sendButton.addEventListener("click", async () => {

    status.textContent = "در حال تست اتصال...";

    try {

        const response = await fetch(
            "https://soroush-anonymous-bot.onrender.com/health",
            {
                method: "GET",
                mode: "cors"
            }
        );

        const text = await response.text();

        status.textContent =
            "اتصال موفق ✅ پاسخ: " + text;

    } catch (error) {

        status.textContent =
            "اتصال ناموفق ❌ " + error;

        console.error(error);
    }

});
