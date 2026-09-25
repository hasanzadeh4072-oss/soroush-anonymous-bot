alert("تست نسخه ۱۱ شروع شد ✅");

console.log("========== VERSION 11 ==========");
console.log("window.WebApp:", window.WebApp);


// =====================================
// بررسی window.WebApp
// =====================================

const webApp = window.WebApp;

let initData = "";
let initDataUnsafe = null;
let user = null;


// =====================================
// بررسی initData
// =====================================

if (webApp) {

    console.log(
        "WebApp موجود است ✅"
    );


    initData =
        webApp.initData || "";


    console.log(
        "initData:",
        initData
    );


    // =================================
    // بررسی initDataUnsafe
    // =================================

    initDataUnsafe =
        webApp.initDataUnsafe || null;


    console.log(
        "initDataUnsafe:",
        initDataUnsafe
    );


    // =================================
    // بررسی user
    // =================================

    if (
        initDataUnsafe &&
        initDataUnsafe.user
    ) {

        user =
            initDataUnsafe.user;


        console.log(
            "USER:",
            user
        );


    } else {

        console.log(
            "initDataUnsafe.user: ❌"
        );

    }


} else {

    console.log(
        "window.WebApp پیدا نشد ❌"
    );

}


// =====================================
// بررسی مستقیم user
// =====================================

const directUser =
    webApp
        ? webApp.user
        : null;


console.log(
    "WebApp.user:",
    directUser
);


// =====================================
// بررسی username
// =====================================

let username = "";

if (user) {

    username =
        user.username || "";

}

if (!username && directUser) {

    username =
        directUser.username || "";

}


// =====================================
// نمایش نتیجه
// =====================================

let result =
    "نتیجه تست نسخه ۱۱\n\n";


result +=
    "window.WebApp: " +
    (
        webApp
            ? "✅ موجود است"
            : "❌ موجود نیست"
    );


result +=
    "\n\n";


result +=
    "initData: " +
    (
        initData
            ? "✅ موجود است"
            : "❌ خالی است"
    );


result +=
    "\n\n";


result +=
    "initDataUnsafe: " +
    (
        initDataUnsafe
            ? "✅ موجود است"
            : "❌ وجود ندارد"
    );


result +=
    "\n\n";


result +=
    "initDataUnsafe.user: " +
    (
        user
            ? "✅ موجود است"
            : "❌ وجود ندارد"
    );


result +=
    "\n\n";


result +=
    "WebApp.user: " +
    (
        directUser
            ? "✅ موجود است"
            : "❌ وجود ندارد"
    );


result +=
    "\n\n";


result +=
    "username: " +
    (
        username
            ? "@" + username.replace(/^@/, "")
            : "❌ ثبت نشده"
    );


alert(result);


// =====================================
// چاپ اطلاعات کامل برای Console
// =====================================

console.log(
    "========== FINAL =========="
);

console.log(
    "WebApp:",
    webApp
);

console.log(
    "initData:",
    initData
);

console.log(
    "initDataUnsafe:",
    initDataUnsafe
);

console.log(
    "user:",
    user
);

console.log(
    "directUser:",
    directUser
);

console.log(
    "username:",
    username
);
