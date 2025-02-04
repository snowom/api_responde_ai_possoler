let btnUnlock = document.getElementById("btn_unlock");
let inputUrl = document.getElementById("input_url");
let errorLabel = document.getElementById("error_label");
let cardContent = document.getElementById("card_content");


btnUnlock.addEventListener("click", ()=>{
    cardContent.classList.remove("defaultVideoLesson");
    cardContent.classList.remove("defaultBookExercise");
    cardContent.classList.remove("defaultExercise");
    cardContent.classList.remove("defaultListExercise");
    cardContent.classList.remove("defaultTheory");

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
            "Authorization" : "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjozOTMzOTgsImdsb2JhbF91bml2ZXJzaXR5X2lkIjoiZGNiNGU1YzEtY2VjZi00MzFhLTlmNzgtYTgzM2I3ZGFlNGIyIiwiaXNfbG9nZ2VkIjp0cnVlLCJoYXNfYWNjZXNzIjpmYWxzZSwibG9naW5fdG9rZW4iOiJZckdraVphRFBXQ1RWc0pCTHU4VyIsIm1vYmlsZV90b2tlbiI6bnVsbCwiZ2xvYmFsX2NhbXB1c19pZCI6ImZmNGIwNzg1LWNmZjctNDJiZi1iMTkxLTNkNzhhNmU1N2Y2MCIsInVuaXZlcnNpdHlfaGFzX2NhbXBpIjp0cnVlLCJzZXNzaW9uX2lkIjoxMTM0OTkzMiwicGxhdGZvcm0iOiJXZWIifSwiZXhwIjoxNzM4NjUyNTU0fQ.mc0Q_K1Fz3YtZHKHuZP2q3BPBNJRc0fTEbSc5aDS6rU",
        }
    }).then((resp) => {
        if (resp.data.resourceType == "video") {
            cardContent.classList.add("defaultVideoLesson");

            let content = `
                <div class="titleLesson">
                    <center>
                        <p>AULÃO DE ${resp.data.lesson_name}</p>
                    </center>
                </div>`;

            content += `
                <div class="glide videoLessons ">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">`;

            resp.data.video_lessons.forEach((videoLesson, index) => {
                let video = videoLesson.video;

                content += (video.provider.includes("youtube"))
                    ? `<li class="glide__slide">
                           <div data-cy="video-iframe" allowfullscreen="" frameborder="0" style="width: 100%; height: 550px;">
                               <div style="width: 100%; height: 100%;">
                                   <iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="https://www.youtube.com/embed/${video.providerId}?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Fapp.respondeai.com.br&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"></iframe>
                               </div>
                           </div>
                           ${mountVideoDescriptionData(video, videoLesson.coveredTopics, index+1)}
                       </li>`
                    : `<li class="glide__slide">
                           <div style="width: 100%; height: 550px;">
                               <iframe src="https://player.vimeo.com/video/${video.providerId}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                           </div>
                           ${mountVideoDescriptionData(video, videoLesson.coveredTopics, index+1)}
                       </li>`;
            });
            content += `</ul></div></div>`;

            cardContent.innerHTML = content;
            initGlideLibrary();
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

            const SINGLE_VIDEO_SIZE = 450;
            const SPACE_BETWEEN_VIDEOS = 50;

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
            content += `<div style='border-left: 4px solid rgb(247, 172, 60); padding: 20px; font-size: 1.2em;'><div style='margin: 30px 0px;'>${resp.data.lightAnswer}</div></div>`;
            content += `</div></div></div>`;

            if (resp.data.videos.length > 0) {
                content += `
                    <div class="row" style="height: 600px !important;">
                         <div class="col-12">
                             <h2 style="color: rgb(247, 172, 60) !important; font-size: 1.55em; margin-top: 10px; line-height: 31px; padding-bottom: 30px; margin: 0px; padding: 0px; font-weight: inherit; margin-block-start: 0.83em; margin-block-end: 0.83em; margin-inline-start: 0px; margin-inline-end: 0px;">Vídeo Aula</h2>
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
            }
            cardContent.innerHTML = content;
            return;
        }
        if (resp.data.resourceType == "list_exercise") {
            cardContent.classList.add("defaultListExercise");

            const SINGLE_VIDEO_SIZE = 450;
            const SPACE_BETWEEN_VIDEOS = 50;

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

            if (resp.data.videos.length > 0) {
                content += `
                    <div class="row" style="height: 600px !important;">
                         <div class="col-12">
                             <h2 style="color: rgb(54, 170, 173) !important; font-size: 1.55em; margin-top: 10px; line-height: 31px; padding-bottom: 30px; margin: 0px; padding: 0px; font-weight: inherit; margin-block-start: 0.83em; margin-block-end: 0.83em; margin-inline-start: 0px; margin-inline-end: 0px;">Vídeo Aula</h2>
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
            }
            cardContent.innerHTML = content;
            return;
        }
        if (resp.data.resourceType == "theory") {
            cardContent.classList.add("defaultTheory");
            const SINGLE_VIDEO_SIZE = 450;
            const SPACE_BETWEEN_VIDEOS = 50;
            let content = ``;

            content = `
                <div class="row">
                     <div class="col-12">
                         ${resp.data.lightBody}
                     </div>
                 </div>
             `;

            if (resp.data.videos.length > 0) {
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
            }
            content += `</div></div>`;
            cardContent.innerHTML = content;
            return;
        }
    }).catch((erro) => {
        if (erro.toString().includes("status code 401")) {
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

function mountVideoDescriptionData(videoObject, coveredTopics, index) {
    let content = ``;

    coveredTopics.forEach((topic)=> {
        content += `
            <li style="margin: 30px 0px !important; display: flex; -webkit-box-pack: justify; justify-content: space-between; -webkit-box-align: center; align-items: center; height: 30px;">
               <div class="row">
                   <div class="col-12">
                       <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" class="sc-lmgjyN iRXdY" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                           <path d="M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H7C6.44771 7 6 6.55228 6 6Z" fill="currentColor"></path>
                           <path d="M6 10C6 9.44771 6.44772 9 7 9H17C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11H7C6.44771 11 6 10.5523 6 10Z" fill="currentColor"></path>
                           <path d="M7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44771 15 7 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H7Z" fill="currentColor"></path>
                           <path d="M6 18C6 17.4477 6.44772 17 7 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H7C6.44772 19 6 18.5523 6 18Z" fill="currentColor"></path>
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 2.34315 3.34315 1 5 1H19C20.6569 1 22 2.34315 22 4V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V4ZM5 3H19C19.5523 3 20 3.44771 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44771 3 5 3Z" fill="currentColor"></path>
                       </svg>
                       <span>${topic.name}</span>
                   </div>
                   <div class="col-12" style="margin-top: 15px !important;">
                       <div class="topicList" style="height: 100% !important; margin-right: 10px !important; position: relative !important;">
                          <a style="display: inline-block !important; width: 110px !important; height: 26px !important; text-align: center !important; border: 1px solid rgb(221, 221, 221) !important; color: inherit !important; text-decoration: none !important; font-size: 0.9em !important; margin: 2px !important; line-height: 24px !important; cursor: pointer !important;" href="/aprender/topico/${topic.subjectId}/${topic.id}/teoria/${topic.theoryId}">Aprender +</a>
                          <a style="display: inline-block !important; width: 110px !important; height: 26px !important; text-align: center !important; border: 1px solid rgb(221, 221, 221) !important; color: inherit !important; text-decoration: none !important; font-size: 0.9em !important; margin: 2px !important; line-height: 24px !important; cursor: pointer !important;" href="/aprender/topico/${topic.subjectId}/${topic.id}/exercicio/${topic.firstExerciseId}">Praticar +</a>
                      </div>
                   </div>
               </div>
           </li>`;
    });

    return `
        <div style="min-height: 300px !important; width: 100% !important; padding: 30px !important;">
           <p id="dicaTutorial" style="text-align: center !important; margin: 25px 0px !important;">
               <em style="color: #000 !important">
                   <strong>Dica: </strong>
                   <span>Clique e arraste horizontalmente para mudar de video aula ou use os direcionais do teclado</span>
               </em>
           </p>
           <div style="display: flex !important; -webkit-box-pack: justify !important; justify-content: space-between !important;">
               <div style="font-size: 1.2em !important; color: rgb(249, 172, 62) !important; display: flex !important;">
                   <div style="width: 38px !important; height: 38px !important; border-radius: 50% !important; font-size: 1.2em !important; font-weight: bold !important; color: rgb(255, 255, 255) !important; background: rgb(249, 172, 62) !important; margin: 0px 10px 0px -10px !important; display: flex !important; -webkit-box-align: center !important; align-items: center !important; -webkit-box-pack: center !important; justify-content: center !important;">${index}</div>
                   <div style="font-size: 1.2em !important; color: rgb(249, 172, 62) !important; line-height: 38px; !important">${videoObject.name}</div>
               </div>
           </div>
           <div class="row">
               <div class="col-12">
                   <div style="font-size: 0.7em !important; color: rgb(51, 51, 51) !important; text-transform: uppercase !important; margin: 30px 10px !important;">Tópicos abordados no módulo ${index}</div>
               </div>
               <div class="col-12">
                   <ul style="display: flex; flex-direction: column; gap: 10px; list-style-position: inside !important; padding: 0 !important;">
                     ${content}
                  </ul>
               </div>
           </div>
       </div>`;
}

function initGlideLibrary() {
    try{
        let configs = {
            type: "carousel",
            perView: 1,
            focusAt: "center"
        };

        var glide = new Glide(".videoLessons", configs);
        glide.on(["mount.after", "run"], () => {});
        glide.mount();
    }catch(erro){
       console.error(`Error on init GlideJS library - ${erro.toString()}`);
    }
}