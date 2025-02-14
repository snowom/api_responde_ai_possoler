let r = setInterval(() => {
    if (
        typeof Glide == "function" &&
        document.getElementById("labelTutorial") != null &&
        document.getElementById("videoDesk") != null &&
        document.getElementById("videoMobile") != null
    ) {
        clearInterval(r);
        initGlideLibrary();
    }
}, 1000)


function initGlideLibrary() {
    try{
        let labelTutorial = document.getElementById("labelTutorial");
        let videoDesk = document.getElementById("videoDesk");
        let videoMobile = document.getElementById("videoMobile");
        let arrayTitulos = ["Obter e definir token do Responde Aí em um computador", "Obter e definir token do Responde Aí em um dispositivo mobile"];
        let configs = {type: "carousel", perView: 1, focusAt: "center"};

        var glide = new Glide(".tutorials", configs);
        glide.on(["mount.after", "run"], () => {
            removeSkeletonLoaderFromElements();
            videoDesk.style.display = "block";
            videoMobile.style.display = "block";
            labelTutorial.style.color = '#212529';
            labelTutorial.innerHTML = arrayTitulos[glide.index];
        });
        glide.mount();
    }catch(erro){
       console.error(`Error on init GlideJS library - ${erro.toString()}`);
    }
}

function removeSkeletonLoaderFromElements() {
    let skeletonElements = document.querySelectorAll(".skeleton-loader");
    skeletonElements.forEach((element) => {
        element.classList.remove("skeleton-loader");
    });
}