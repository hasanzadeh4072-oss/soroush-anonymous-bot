const sendButton =
    document.getElementById("sendButton");

const status =
    document.getElementById("status");


sendButton.addEventListener("click", async () => {

    sendButton.disabled = true;

    status.textContent =
        "در حال اتصال به Render...";


    try {

        const url =
            "https://soroush-anonymous-bot.onrender.com/health";


        console.log("REQUEST URL:", url);


        const response =
            await fetch(url, {
                method: "GET",
                mode: "cors",
                cache: "no-store"
            });


        console.log(
            "HTTP STATUS:",
            response.status
        );


        const text =
            await response.text();


        console.log(
            "SERVER RESPONSE:",
            text
        );


        status.textContent =
            "اتصال موفق بود ✅\n" +
            "Status: " +
            response.status +
            "\nResponse: " +
            text;


    } catch (error) {

        console.error(
            "FETCH ERROR:",
            error
        );


        status.textContent =
            "خطای واقعی اتصال ❌\n\n" +
            error.name +
            "\n" +
            error.message;

    }


    sendButton.disabled = false;

});


