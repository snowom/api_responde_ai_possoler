let btnUnlock = document.getElementById("btn_unlock");
let inputUrl = document.getElementById("input_url");
let errorLabel = document.getElementById("error_label");
let cardContent = document.getElementById("card_content");


btnUnlock.addEventListener("click", ()=>{
    errorLabel.style.display = "none"
    inputUrl.style.borderColor = "#ced4da";
    inputUrl.disabled = true;
    btnUnlock.disabled = true;
    let inputContent = inputUrl.value;

    setWaitResponseBlock();

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
        setErrorResponseBlock(erro.toString());
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

function setWaitResponseBlock() {
    cardContent.innerHTML = `
        <div class="row">
             <div class="col-12">
                 <div class="container-fluid d-flex justify-content-center">
                     <dotlottie-player src="${setRandomLoadLottieAnimation()}" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
                 </div>
                 <center>
                     <p class="lead">Aguarde um momento...<br>Removendo os bloqueios...</p>
                 </center>
             </div>
         </div>
     `;
}

function setErrorResponseBlock(errorMessage) {
    cardContent.innerHTML = `
        <div class="row">
             <div class="col-12">
                 <div class="container-fluid d-flex justify-content-center">
                     <dotlottie-player src="https://lottie.host/e96e04a2-f818-436f-868e-8b56c1ef8a85/ambi2MSaaw.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" autoplay></dotlottie-player>
                 </div>
                 <center>
                     <p class="lead">URL não suportada ou inválida</p>
                     <small class="form-text" style="margin-bottom: 20px !important;">${errorMessage}</small>
                 </center>
             </div>
         </div>
     `;
}

function setRandomLoadLottieAnimation() {
    let lottieAnimations = [
        "https://lottie.host/bdcbee9c-f14e-4256-93e9-cecdef8a9769/XJk9aQcd03.lottie", // Monkey
        "https://lottie.host/d928bb6a-2a4d-464d-bc62-4f3c9ced13e8/HX44ktQJ14.lottie", // Fox
        "https://lottie.host/b49be9b9-a91a-4e8e-a7d0-d769ffafefca/IgabRp2M1i.lottie", // Turtle
        "https://lottie.host/c9678c3f-5217-4ae4-84bf-00c7a3cc7beb/lpvfeV2ywH.lottie" // Cow
    ]
    let randNumber = Math.floor(Math.random() * lottieAnimations.length)
    return lottieAnimations[randNumber];
}