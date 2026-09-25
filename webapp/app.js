alert("تست نهایی نسخه ۱۰ شروع شد ✅");

console.log("========== WEBAPP DEBUG ==========");

const results = [];

function check(name, value) {

    const exists =
        value !== undefined &&
        value !== null;

    results.push(
        name + ": " +
        (exists ? "✅" : "❌")
    );

    console.log(
        name,
        exists ? value : "NOT FOUND"
    );

    return exists ? value : null;
}


// =====================================
// بررسی تمام APIهای احتمالی
// =====================================

const soroush =
    check(
        "window.Soroush",
        window.Soroush
    );

const webApp =
    soroush
        ? check(
            "Soroush.WebApp",
            soroush.WebApp
        )
        : null;


const windowWebApp =
    check(
        "window.WebApp",
        window.WebApp
    );


const max =
    check(
        "window.WebApp.MAX",
        window.WebApp &&
        window.WebApp.MAX
    );


const soroushPlus =
    check(
        "window.SoroushPlus",
        window.SoroushPlus
    );


const miniApp =
    check(
        "window.MiniApp",
        window.MiniApp
    );


// =====================================
// بررسی initData
// =====================================

let initData = "";

let user = null;


if (webApp) {

    initData =
        webApp.initData || "";

    console.log(
        "Soroush.WebApp.initData:",
        initData
    );


    if (
        webApp.initDataUnsafe &&
        webApp.initDataUnsafe.user
    ) {

        user =
            webApp.initDataUnsafe.user;

        console.log(
            "Soroush.WebApp.initDataUnsafe.user:",
            user
        );

    }

}


// =====================================
// نمایش نتیجه
// =====================================

let message =
    "نتیجه تست نسخه ۱۰\n\n";


message +=
    results.join("\n");


message +=
    "\n\n--------------------\n";


message +=
    "initData: " +
    (
        initData
            ? "✅ دریافت شد"
            : "❌ خالی است"
    );


message +=
    "\n";


message +=
    "user: " +
    (
        user
            ? "✅ وجود دارد"
            : "❌ وجود ندارد"
    );


message +=
    "\n\n";


if (user) {

    message +=
        "username: " +
        (
            user.username ||
            "ثبت نشده"
        );

}


alert(message);


// =====================================
// خروجی کامل برای Console
// =====================================

console.log(
    "========== FINAL RESULT =========="
);

console.log(
    "Soroush:",
    soroush
);

console.log(
    "Soroush.WebApp:",
    webApp
);

console.log(
    "window.WebApp:",
    windowWebApp
);

console.log(
    "SoroushPlus:",
    soroushPlus
);

console.log(
    "MiniApp:",
    miniApp
);

console.log(
    "initData:",
    initData
);

console.log(
    "user:",
    user
);
