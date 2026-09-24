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
    "https://soroush-anonymous-bot.onrender.com/webapp";


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


// تست اتصال و ارسال پیام
sendButton.addEventListener("click", async () => {

    const message =
        messageInput.value.trim();


    if (!message) {

        status.textContent =
            "لطفاً متن پیام را وارد کنید.";

        return;

    }


    sendButton.disabled = true;

    status.textContent =
        "در حال اتصال به سرور...";


    try {

        const data = {

            type: selectedType,

            message: message

        };


        console.log(
            "SENDING TO:",
            API_URL
        );

        console.log(
            "DATA:",
            data
        );


        const response =
            await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            );


        console.log(
            "SERVER STATUS:",
            response.status
        );


        const responseText =
            await response.text();


        console.log(
            "SERVER RESPONSE:",
            responseText
        );


        let result;

        try {

            result =
                JSON.parse(responseText);

        } catch {

            result = {};

        }


        if (
            !response.ok ||
            !result.ok
        ) {

            throw new Error(
                result.error ||
                "سرور پاسخ موفق ارسال نکرد."
            );

        }


        status.textContent =
            "اتصال به سرور موفق بود. ✅";


        messageInput.value = "";

        counter.textContent =
            "0";


    } catch (error) {

        console.error(
            "WEBAPP ERROR:",
            error
        );


        status.textContent =
            "اتصال به سرور انجام نشد. ❌";

    }


    sendButton.disabled = false;

});


