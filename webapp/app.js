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


// ارسال پیام - تست اتصال
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
        "در حال تست اتصال...";


    try {

        const data = {

            type: selectedType,

            message: message

        };


        const response =
            await fetch("https://httpbin.org/post", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(data)

            });


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                "HTTP " + response.status
            );

        }


        console.log("HTTPBIN RESPONSE:", result);


        status.textContent =
            "اتصال موفق بود. ✅";


    } catch (error) {

        console.error(error);

        status.textContent =
            "اتصال ناموفق بود. ❌";

    }


    sendButton.disabled = false;

});
