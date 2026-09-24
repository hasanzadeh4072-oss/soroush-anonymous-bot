const sendButton =
    document.getElementById("sendButton");

const status =
    document.getElementById("status");


alert("TEST 3 - app.js جدید");


sendButton.addEventListener("click", async () => {

    sendButton.disabled = true;

    status.textContent =
        "در حال ارسال درخواست به Render...";


    try {

        await fetch(
            "https://soroush-anonymous-bot.onrender.com/health",
            {
                method: "GET",
                mode: "no-cors",
                cache: "no-store"
            }
        );


        status.textContent =
            "درخواست به Render ارسال شد. ✅";


    } catch (error) {

        status.textContent =
            "ارسال درخواست ناموفق بود. ❌\n\n" +
            error.name +
            "\n" +
            error.message;

    }


    sendButton.disabled = false;

});


