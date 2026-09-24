alert("تست initData نسخه ۹");

let initData = "";

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
            initData
        );

        alert(
            initData
                ? "initData دریافت شد ✅\n\n" + initData
                : "initData خالی است ❌"
        );

    } else {

        alert(
            "Soroush.WebApp پیدا نشد ❌"
        );

    }

} catch (error) {

    console.error(error);

    alert(
        "خطا:\n" + error.message
    );

}
