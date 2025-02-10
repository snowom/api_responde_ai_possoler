let btnSetToken = document.getElementById("btn_set_token");
let inputToken = document.getElementById("input_token");
let cardContent = document.getElementById("card_content");
const LOCAL_STORAGE_KEY = "token_respai";

window.addEventListener('load', ()=>{
    if(localStorage.getItem(LOCAL_STORAGE_KEY) != "") {
        inputToken.value = localStorage.getItem(LOCAL_STORAGE_KEY);
        return;
    }
})

btnSetToken.addEventListener("click", ()=> {
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
                     <p class="lead">Token inválido</p>
                     <small class="form-text" style="margin-bottom: 20px !important;">${errorMessage}</small>
                 </center>
             </div>
         </div>
     `;
}