const messageTypes =
    document.querySelectorAll(".message-type");

const messageInput =
    document.getElementById("message");

const counter =
    document.getElementById("count");

const sendButton =
    document.getElementById("sendButton");

const status =
    document.getElementById("status");


/* =========================
   بررسی WebApp سروش‌پلاس
========================= */

let webApp = null;
let user = null;

try {

    if (typeof WebApp !== "undefined") {
        webApp = WebApp;
    }

    if (
        webApp &&
        webApp.initDataUnsafe &&
        webApp.initDataUnsafe.user
    ) {
        user = webApp.initDataUnsafe.user;
    }

} catch (error) {

    console.error(
        "WEBAPP ERROR:",
        error
    );
}


/* =========================
   نمایش اطلاعات برای تست
========================= */

let debugInfo = "";

if (!webApp) {

    debugInfo =
        "❌ WebApp پیدا نشد.";

} else {

    const initData =
        webApp.initData || "";

    const initDataUnsafe =
        webApp.initDataUnsafe || {};

    const currentUser =
        initDataUnsafe.user || {};

    debugInfo =
        "WebApp: ✅\n\n" +

        "Version: " +
        (webApp.version || "ندارد") +
        "\n\n" +

        "Platform: " +
        (webApp.platform || "ندارد") +
        "\n\n" +

        "initData: " +
        (initData ? "✅ دریافت شد" : "❌ خالی است") +
        "\n\n" +

        "initDataUnsafe: " +
        (webApp.initDataUnsafe ? "✅ وجود دارد" : "❌ وجود ندارد") +
        "\n\n" +

        "User: " +
        (initDataUnsafe.user ? "✅ وجود دارد" : "❌ وجود ندارد") +
        "\n\n" +

        "ID: " +
        (currentUser.id || "ندارد") +
        "\n\n" +

        "First Name: " +
        (currentUser.first_name || "ندارد") +
        "\n\n" +

        "Username: " +
        (currentUser.username
            ? "@" + currentUser.username
            : "❌ ندارد");
}


/* =========================
   نمایش تست روی صفحه
========================= */

if (status) {

    status.textContent =
        debugInfo;

    status.style.whiteSpace =
        "pre-line";

    status.style.textAlign =
        "right";

    status.style.direction =
        "ltr";

}


/* =========================
   آماده‌سازی WebApp
========================= */

try {

    if (
        webApp &&
        typeof webApp.ready === "function"
    ) {
        webApp.ready();
    }

} catch (error) {

    console.error(
        "READY ERROR:",
        error
    );

}


/* =========================
   انتخاب نوع پیام
========================= */

messageTypes.forEach((button) => {

    button.addEventListener("click", () => {

        messageTypes.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});


/* =========================
   شمارش حروف
========================= */

messageInput.addEventListener("input", () => {

    counter.textContent =
        messageInput.value.length;

});


/* =========================
   غیرفعال کردن ارسال
   در نسخه تست
========================= */

sendButton.disabled = true;

sendButton.textContent =
    "نسخه آزمایشی";
