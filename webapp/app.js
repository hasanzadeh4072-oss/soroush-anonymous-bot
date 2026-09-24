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


const API_URL =
    "https://soroush-anonymous-bot.onrender.com/health";


let selectedType = "anonymous";


// انتخاب نوع پیام
messageTypes.forEach((button) => {

    button.addEventListener("click", () => {

        messageTypes.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedType =
            button.dataset.type;

        status.textContent = "";

    });

});


// شمارش حروف
messageInput.addEventListener("input", () => {

    counter.textContent =
        messageInput.value.length;

});


// تست اتصال
sendButton.addEventListener("click", async () => {

    sendButton.disabled = true;

    status.textContent =
        "در حال بررسی اتصال...";


    try {

        console.log(
            "CONNECTING TO:",
            API_URL
        );


        const response =
            await fetch(API_URL, {
                method: "GET",
                cache: "no-store"
            });


        const result =
            await response.text();


        console.log(
            "SERVER STATUS:",
            response.status
        );

        console.log(
            "SERVER RESPONSE:",
            result
        );


        if (!response.ok) {
            throw new Error(
                "HTTP " + response.status
            );
        }


        status.textContent =
            "اتصال به Render موفق بود. ✅";


    } catch (error) {

        console.error(
            "CONNECTION ERROR:",
            error
        );


        status.textContent =
            "اتصال به Render برقرار نشد. ❌";

    }


    sendButton.disabled = false;

});


