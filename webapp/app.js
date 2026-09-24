alert("APP.JS جدید اجرا شد");

const sendButton =
    document.getElementById("sendButton");

const status =
    document.getElementById("status");


sendButton.addEventListener("click", async () => {

    status.textContent =
        "در حال اتصال به Render...";


    try {

        const response = await fetch(
            "https://soroush-anonymous-bot.onrender.com/health",
            {
                method: "GET",
                mode: "cors",
                cache: "no-store"
            }
        );


        console.log(
            "STATUS:",
            response.status
        );


        const text =
            await response.text();


        console.log(
            "RESPONSE:",
            text
        );


        status.textContent =
            "اتصال به Render موفق بود. ✅";


    } catch (error) {

        console.error(
            "ERROR:",
            error
        );


        status.textContent =
            "اتصال به Render انجام نشد. ❌";

    }

});


