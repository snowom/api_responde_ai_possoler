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
            "Authorization" : "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjozOTMzOTgsImdsb2JhbF91bml2ZXJzaXR5X2lkIjoiZGNiNGU1YzEtY2VjZi00MzFhLTlmNzgtYTgzM2I3ZGFlNGIyIiwiaXNfbG9nZ2VkIjp0cnVlLCJoYXNfYWNjZXNzIjpmYWxzZSwibG9naW5fdG9rZW4iOiJZckdraVphRFBXQ1RWc0pCTHU4VyIsIm1vYmlsZV90b2tlbiI6bnVsbCwiZ2xvYmFsX2NhbXB1c19pZCI6ImZmNGIwNzg1LWNmZjctNDJiZi1iMTkxLTNkNzhhNmU1N2Y2MCIsInVuaXZlcnNpdHlfaGFzX2NhbXBpIjp0cnVlLCJzZXNzaW9uX2lkIjoxMTM0OTkzMiwicGxhdGZvcm0iOiJXZWIifSwiZXhwIjoxNzM4Mzk5NTIwfQ.Nyh8RFXvR3dFPxR6MNRNToaSESqbPFLZ2ar4dQdsFMU"
        }
    }).then((resp) => {
        if (resp.data.resourceType == "video") {
            //TODO: IMPLEMENTAÇÃO AULÃO
            return;
        }
        if (resp.data.resourceType == "book_exercise") {
            cardContent.classList.add("defaultBookExercise");

            let content = `<div style='flex: 1 1 0%; align-self: center; background-color: white; width: 100%'>`;
            content += `<div style='padding: 0px 30px;'>`;
            content += `<div style="margin: 60px 0px;">`;
            content += `<h2>Enunciado</h2>`;
            content += `<div style='margin: 30px 0px; 60px;'>${resp.data.lightBody}</div>`
            content += `</div>`;

            resp.data.lightSolution.forEach((step, index) => {
                let currentStep = index += 1;
                content += `<div style="margin: 60px 0px;">`;
                content += `<h2>Passo ${currentStep}</h2>`;
                content += `<div style='margin: 30px 0px; 60px;'>${step}</div>`;
                content += `</div>`;
            });

            content += `<div style='margin: 30px 0px;'>`;
            content += `<h2>Resposta</h2>`;
            content += `<div style='border-left: 4px solid rgb(54, 170, 173); padding: 20px; font-size: 1.2em;'><div style='margin: 30px 0px;'>${resp.data.lightAnswer}</div></div>`;
            content += `</div></div></div>`;
            cardContent.innerHTML = content;
            return;
        }
        if (resp.data.resourceType == "exercise") {
            cardContent.classList.add("defaultExercise");

            let content = `<div style='flex: 1 1 0%; align-self: center; background-color: white; width: 100%'>`;
            content += `<div style='padding: 0px 30px;'>`;
            content += `<div style="margin: 60px 0px;">`;
            content += `<h2>Enunciado</h2>`;
            content += `<div style='margin: 30px 0px; 60px;'>ENUNCIADO AQUI</div>`
            content += `</div>`;

            resp.data.lightSolution.forEach((step, index) => {
                let currentStep = index += 1;
                content += `<div style="margin: 60px 0px;">`;
                content += `<h2>Passo ${currentStep}</h2>`;
                content += `<div style='margin: 30px 0px; 60px;'>${step}</div>`;
                content += `</div>`;
            });

            content += `<div style='margin: 30px 0px;'>`;
            content += `<h2>Resposta</h2>`;
            content += `<div style='border-left: 4px solid rgb(247, 172, 60); padding: 20px; font-size: 1.2em;'><div style='margin: 30px 0px;'>${resp.data.lightAnswer}</div></div>`;
            content += `</div></div></div>`;
            cardContent.innerHTML = content;
            return;
        }
        if (resp.data.resourceType == "list_exercise") {
            //TODO: IMPLEMENTAÇÃO BOOK LIST_EXERCISE
            return;
        }
        if (resp.data.resourceType == "theory") {
            cardContent.classList.add("defaultTheory");
            const SINGLE_VIDEO_SIZE = 450;
            const SPACE_BETWEEN_VIDEOS = 50;
            let totalHeight = (SINGLE_VIDEO_SIZE*resp.data.videos.length) + (SPACE_BETWEEN_VIDEOS*resp.data.videos.length);
            let content = ``;

            content = `
                <div class="row">
                     <div class="col-12">
                         ${resp.data.lightBody}
                     </div>
                 </div>
             `;

             content += `
                <div class="row" style="height: 600px !important;">
                     <div class="col-12">
                         <h2 style="color: rgb(0, 184, 214) !important; font-size: 1.55em; margin-top: 10px; line-height: 31px; padding-bottom: 30px; margin: 0px; padding: 0px; font-weight: inherit; margin-block-start: 0.83em; margin-block-end: 0.83em; margin-inline-start: 0px; margin-inline-end: 0px;">Vídeo Aula</h2>
             `;

             (resp.data.videos).forEach((video) => {
                content += (video.provider.includes("youtube"))
                    ? `<div data-cy="video-iframe" allowfullscreen="" frameborder="0" style="width: 100%; height: ${SINGLE_VIDEO_SIZE}px;">
                           <div style="width: 100%; height: 100%;">
                               <iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="https://www.youtube.com/embed/${video.providerId}?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Fapp.respondeai.com.br&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"></iframe>
                           </div>
                       </div>
                       <div style="height: ${SPACE_BETWEEN_VIDEOS}px !important"></div>`

                    : `<div style="padding:56.25% 0 0 0;position:relative;">
                         <iframe src="https://player.vimeo.com/video/${video.providerId}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                       </div>
                       <div style="height: ${SPACE_BETWEEN_VIDEOS}px !important"></div>`;
             });
            content += `</div></div>`;
            cardContent.innerHTML = content;
            return;
        }
    }).catch((erro) => {
        if (erro.response.status == 401) {
            setInvalidOrExpiredTokenBlock();
            return;
        }
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

function setInvalidOrExpiredTokenBlock() {
    cardContent.innerHTML = `
        <div class="row">
             <div class="col-12">
                 <div class="container-fluid d-flex justify-content-center">
                     <dotlottie-player src="https://assets9.lottiefiles.com/packages/lf20_csi2q9oq.json" loop background="transparent" speed="1" style="width: 300px; height: 300px" autoplay></dotlottie-player>
                 </div>
                 <center>
                     <p class="lead">Token inválido ou expirado</p>
                     <small class="form-text" style="margin-bottom: 20px !important;">Atualize seu token de acesso <a href="">aqui</a> antes de tentar novamente</small>
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