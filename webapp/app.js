const sendButton =
    document.getElementById("sendButton");

const status =
    document.getElementById("status");


alert("TEST 2 - app.js جدید");


sendButton.addEventListener("click", async () => {

    sendButton.disabled = true;

    status.textContent =
        "TEST 2: در حال اتصال به Render...";


    try {

        const response =
            await fetch(
                "https://soroush-anonymous-bot.onrender.com/health",
                {
                    method: "GET",
                    mode: "cors",
                    cache: "no-store"
                }
            );


        const text =
            await response.text();


        status.textContent =
            "TEST 2: اتصال موفق ✅\n" +
            "Status: " +
            response.status +
            "\nResponse: " +
            text;


    } catch (error) {

        status.textContent =
            "TEST 2: خطای اتصال ❌\n\n" +
            error.name +
            "\n" +
            error.message;

    }


    sendButton.disabled = false;

});


