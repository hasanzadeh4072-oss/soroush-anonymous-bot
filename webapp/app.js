document.body.innerHTML += `
    <pre style="
        direction:ltr;
        text-align:left;
        white-space:pre-wrap;
        padding:20px;
        font-size:14px;
    ">
${typeof WebApp !== "undefined"
    ? JSON.stringify(WebApp.initDataUnsafe, null, 2)
    : "WebApp پیدا نشد"}
    </pre>
`;
