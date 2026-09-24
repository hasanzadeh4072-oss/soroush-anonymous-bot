alert("APP.JS جدید اجرا شد");

const sendButton =
    document.getElementById("sendButton");

const status =
    document.getElementById("status");

sendButton.addEventListener("click", () => {

    status.textContent =
        "APP.JS جدید با موفقیت اجرا شد. ✅";

});


