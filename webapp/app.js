alert("نسخه ۸ اجرا شد ✅");

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
    "https://soroush-anonymous.hasanzadeh4072.workers.dev/";

let selectedType = "anonymous";

let initData = "";

let username = "";


// =====================================
// دریافت اطلاعات برنامک سروش‌پلاس
// =====================================

try {

    if (
        typeof Soroush !== "undefined" &&
        Soroush.WebApp
    ) {

        console.log("Soroush.WebApp: ✅");

        initData =
            Soroush.WebApp.initData || "";

        console.log(
            "INIT DATA:",
            initData ? "✅ موجود است" : "❌ خالی است"
        );

        if (
            Soroush.WebApp.initDataUnsafe &&
            Soroush.WebApp.initDataUnsafe.user
        ) {

            const user =
                Soroush.WebApp.initDataUnsafe.user;

            username =
                user.username || "";

            console.log(
                "USER:",
                user
            );

            console.log(
                "USERNAME:",
                username || "ندارد"
            );

        } else {

            console.log(
                "USER: ❌ وجود ندارد"
            );

        }

    } else {

        console.log(
            "Soroush.WebApp: ❌ وجود ندارد"
        );

    }

} catch (error) {

    console.error(
        "USER INFO ERROR:",
        error
    );

}


// =====================================
// انتخاب نوع پیام
// =====================================

messageTypes.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            messageTypes.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedType =
                button.dataset.type;

            status.textContent = "";

        }
    );

});


// =====================================
// شمارش حروف
// =====================================

messageInput.addEventListener(
    "input",
    () => {

        counter.textContent =
            messageInput.value.length;

    }
);


// =====================================
// ارسال پیام
// =====================================

sendButton.addEventListener(
    "click",
    async () => {

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

            const data = {
                type: selectedType,
                message: message
            };


            // فقط در حالت «با مشخصات»
            // اطلاعات WebApp ارسال می‌شود.
            if (selectedType === "identified") {

                data.initData =
                    initData;

            }


            console.log(
                "SEND TYPE:",
                selectedType
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


            const result =
                await response.json();


            console.log(
                "SERVER RESPONSE:",
                result
            );


            if (
                !response.ok ||
                !result.ok
            ) {

                throw new Error(
                    result.error ||
                    "ارسال پیام انجام نشد."
                );

            }


            status.textContent =
                "پیامت با موفقیت ارسال شد. ✅";

            messageInput.value = "";

            counter.textContent =
                "0";


        } catch (error) {

            console.error(
                "SEND ERROR:",
                error
            );

            status.textContent =
                error.message ||
                "ارسال پیام انجام نشد. دوباره تلاش کنید.";

        }


        sendButton.disabled = false;

    }
);
