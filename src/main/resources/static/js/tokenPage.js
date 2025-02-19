let btnSetToken = document.getElementById("btn_set_token");
let inputToken = document.getElementById("input_token");
let cardContent = document.getElementById("card_content");
let btnCopy = document.getElementById("btn_copy");
let codeBlock = document.getElementById("code_block");
const LOCAL_STORAGE_KEY = "token_respai";

setDefaultValuesInPrismPlugin();

window.addEventListener('load', ()=>{
    if(localStorage.getItem(LOCAL_STORAGE_KEY) != "") {
        inputToken.value = localStorage.getItem(LOCAL_STORAGE_KEY);
        return;
    }
})

btnCopy.addEventListener("mouseover", ()=> {
    btnCopy.style.background = "transparent";
}, false);

btnCopy.addEventListener("click", ()=> {
    try{
        btnCopy.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #6c757d;transform: ;msFilter:;"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path><path d="M6 12h6v2H6zm0 4h6v2H6z"></path></svg>`;
        let code = codeBlock.getAttribute('value');
        navigator.clipboard.writeText(code).then(()=>{
            setSuccessCopyIcon();
        });
    }catch(error){
        console.error(error);
    }
}, false);


btnSetToken.addEventListener("click", ()=> {
    btnSetToken.disabled = true;
    inputToken.disabled = true;

    const inputTokenValue = inputToken.value;
    axios({
        method: "POST",
        url: "/v1/gateway",
        timeout: 10000,
        data: JSON.stringify({
            url: "https://app.respondeai.com.br/lecture/aulao/38"
        }),
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : inputTokenValue,
        }
    }).then((resp) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, inputTokenValue);
        setSuccessResponseBlock();
    }).catch((erro) => {
        if (erro.toString().includes("status code 401")) {
            setErrorResponseBlock("");
            return;
        }
        setErrorResponseBlock(erro.toString());
    }).finally(()=>{
        btnSetToken.disabled = false;
        inputToken.disabled = false;
    });
})

function setSuccessResponseBlock() {
    cardContent.innerHTML = `
        <div class="row">
             <div class="col-12">
                 <div class="container-fluid d-flex justify-content-center">
                     <dotlottie-player src="https://lottie.host/36528405-6991-40d6-8e76-7cdbbf7103b8/QYreag6SyA.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" autoplay></dotlottie-player>
                 </div>
                 <center>
                     <p class="lead">Token validado e definido com sucesso!</p>
                     <small class="form-text" style="margin-bottom: 20px !important;">Volte para a <a href="/">página principal</a> e comece a estudar!</small>
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
                     <p class="lead">Token inválido ou expirado</p>
                     <small class="form-text" style="margin-bottom: 20px !important;">${errorMessage}</small>
                 </center>
             </div>
         </div>
     `;
}

function setSuccessCopyIcon() {
    btnCopy.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #6c757d;transform: ;msFilter:;">
            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
        </svg>`;
}

function setDefaultValuesInPrismPlugin() {
    Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
        'break-lines': 60, //max number of characters in each line before break
    });
}