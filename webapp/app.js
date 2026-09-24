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
let username = "";


// ==============================
// دریافت اطلاعات کاربر
// ==============================


try {


let user = null;

// روش رسمی سروش‌پلاس
if (
    typeof Soroush !== "undefined" &&
    Soroush.WebApp
) {

    console.log(
        "Soroush.WebApp: ✅"
    );

    if (
        Soroush.WebApp.initDataUnsafe &&
        Soroush.WebApp.initDataUnsafe.user
    ) {

        user =
            Soroush.WebApp.initDataUnsafe.user;

    }

}

// سازگاری با WebApp قبلی
if (
    !user &&
    typeof window.WebApp !== "undefined" &&
    window.WebApp.initDataUnsafe &&
    window.WebApp.initDataUnsafe.user
) {

    console.log(
        "window.WebApp: ✅"
    );

    user =
        window.WebApp.initDataUnsafe.user;

}

if (user) {

    username =
        user.username || "";

    console.log(
        "USER:",
        user
    );

    console.log(
        "USERNAME:",
        username
    );

} else {

    console.log(
        "USER INFO: ❌ وجود ندارد"
    );

}



} catch (error) {


console.error(
    "USER INFO ERROR:",
    error
);



}


// ==============================
// انتخاب نوع پیام
// ==============================


messageTypes.forEach((button) => {


button.addEventListener(
    "click",
    () => {

        messageTypes.forEach(
            (item) => {
                item.classList.remove(
                    "active"
                );
            }
        );

        button.classList.add(
            "active"
        );

        selectedType =
            button.dataset.type;

        status.textContent = "";

    }
);



});


// ==============================
// شمارش حروف
// ==============================


messageInput.addEventListener(
"input",
() => {


    counter.textContent =
        messageInput.value.length;

}



);


// ==============================
// ارسال پیام
// ==============================


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
            message: message,
            username: username
        };

        console.log(
            "SEND DATA:",
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
            "ارسال پیام انجام نشد. دوباره تلاش کنید.";

    }

    sendButton.disabled =
        false;

}



);

