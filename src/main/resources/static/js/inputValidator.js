let btnUnlock = document.getElementById("btn_unlock");
let inputUrl = document.getElementById("input_url");
let errorLabel = document.getElementById("error_label");


btnUnlock.addEventListener("click", ()=>{
    errorLabel.style.display = "none"
    inputUrl.style.borderColor = "#ced4da";
    inputUrl.disabled = true;
    btnUnlock.disabled = true;
    let inputContent = inputUrl.value;

    axios({
        method: "POST",
        url: "/v1/gateway",
        timeout: 10000,
        data: JSON.stringify({
            url: inputContent
        }),
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjozOTMzOTgsImdsb2JhbF91bml2ZXJzaXR5X2lkIjoiZGNiNGU1YzEtY2VjZi00MzFhLTlmNzgtYTgzM2I3ZGFlNGIyIiwiaXNfbG9nZ2VkIjp0cnVlLCJoYXNfYWNjZXNzIjpmYWxzZSwibG9naW5fdG9rZW4iOiJZckdraVphRFBXQ1RWc0pCTHU4VyIsIm1vYmlsZV90b2tlbiI6bnVsbCwiZ2xvYmFsX2NhbXB1c19pZCI6ImZmNGIwNzg1LWNmZjctNDJiZi1iMTkxLTNkNzhhNmU1N2Y2MCIsInVuaXZlcnNpdHlfaGFzX2NhbXBpIjp0cnVlLCJzZXNzaW9uX2lkIjoxMTM0OTkzMiwicGxhdGZvcm0iOiJXZWIifSwiZXhwIjoxNzM4MzA0OTg2fQ.vUaKA1Si5nPXs0njachk28l5JCwC6rpf3fmCGZngBQg"
        }
    }).then((resp) => {
        //TODO: LOGICA Request Sucesso
    }).catch((erro) => {
        //TODO: LOGICA Request Falha
        errorLabel.style.display = "block"
        inputUrl.style.borderColor = "#ff00009c"
    }).finally(() => {
        inputUrl.disabled = false;
        btnUnlock.disabled = false;
    });
});


inputUrl.addEventListener("focus", ()=>{
    errorLabel.style.display = "none"
    inputUrl.style.borderColor = "#ced4da";
});

["change", "propertychange", "keyuponpaste", "input"].forEach((evt) => {
    inputUrl.addEventListener(evt, ()=>{
    let inputContent = inputUrl.value;

    if (!inputContent.includes("app.respondeai.com.br") &&
        (!inputContent.includes("https://") || !inputContent.includes("http://"))
    ) {
        btnUnlock.disabled = true;
        return;
    }
    btnUnlock.disabled = false;
    }, false);
});