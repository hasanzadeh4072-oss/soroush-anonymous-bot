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


// ارسال پیام
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
        "در حال ارسال...";


    try {

        /*
         * اطلاعاتی که برنامک به Python می‌فرستد.
         *
         * نوع:
         * anonymous  = پیام ناشناس
         * identified = پیام با مشخصات
         */

        const data = {

            type: selectedType,

            message: message

        };


        const response =
            await fetch("/webapp", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(data)

            });


        const result =
            await response.json();


        if (!response.ok || !result.ok) {

            throw new Error(
                result.error ||
                "ارسال پیام انجام نشد."
            );

        }


        status.textContent =
            "پیامت با موفقیت ارسال شد. ✅";


        messageInput.value = "";

        counter.textContent = "0";


    } catch (error) {

        console.error(error);

        status.textContent =
            "ارسال پیام انجام نشد. دوباره تلاش کنید.";

    }


    sendButton.disabled = false;

});



