alert("تست نهایی نسخه ۱۲ شروع شد ✅");

console.log("========== VERSION 12 ==========");

const webApp = window.WebApp;

let unsafe = null;


// =====================================
// بررسی WebApp
// =====================================

if (!webApp) {

    alert(
        "window.WebApp پیدا نشد ❌"
    );

    throw new Error(
        "window.WebApp not found"
    );

}


// =====================================
// دریافت initDataUnsafe
// =====================================

unsafe =
    webApp.initDataUnsafe || null;


if (!unsafe) {

    alert(
        "initDataUnsafe پیدا نشد ❌"
    );

    throw new Error(
        "initDataUnsafe not found"
    );

}


// =====================================
// بررسی کلیدهای اصلی
// =====================================

const keys =
    Object.keys(unsafe);


console.log(
    "initDataUnsafe:",
    unsafe
);

console.log(
    "KEYS:",
    keys
);


// =====================================
// ساخت گزارش
// =====================================

let report =
    "نتیجه تست نسخه ۱۲\n\n";


report +=
    "window.WebApp: ✅\n\n";


report +=
    "initDataUnsafe: ✅\n\n";


report +=
    "کلیدهای موجود:\n";


if (keys.length === 0) {

    report +=
        "❌ هیچ کلیدی وجود ندارد";

} else {

    keys.forEach(
        (key) => {

            report +=
                "• " + key + "\n";

        }
    );

}


// =====================================
// بررسی کلیدهای احتمالی کاربر
// =====================================

report +=
    "\n--------------------\n\n";


const possibleKeys = [
    "user",
    "username",
    "id",
    "user_id",
    "userId",
    "profile",
    "account",
    "currentUser",
    "chat",
    "sender"
];


possibleKeys.forEach(
    (key) => {

        if (
            Object.prototype.hasOwnProperty.call(
                unsafe,
                key
            )
        ) {

            report +=
                key +
                ": ✅ وجود دارد\n";

        } else {

            report +=
                key +
                ": ❌\n";

        }

    }
);


// =====================================
// نمایش نتیجه
// =====================================

alert(report);


// =====================================
// گزارش کامل در Console
// =====================================

console.log(
    "========== INIT DATA UNSAFE =========="
);

console.log(
    unsafe
);

console.log(
    "========== KEYS =========="
);

console.log(
    keys
);

console.log(
    "========== JSON =========="
);

try {

    console.log(
        JSON.stringify(
            unsafe,
            null,
            2
        )
    );

} catch (error) {

    console.log(
        "JSON ERROR:",
        error
    );

}
