let btnMenu = document.getElementById("btnMenu");
let sidebar = document.querySelector('.sidebar');
let wallSidebarOpen = document.getElementById('wallSidebarOpen');

btnMenu.onclick = () =>{
    if (sidebar.classList.toggle("active")) {
        wallSidebarOpen.classList.add("wall_sidebar_open");
        wallSidebarOpen.style.height = `${document.body.clientHeight}px`;
        return;
    }
    wallSidebarOpen.classList.remove("wall_sidebar_open");
    wallSidebarOpen.style.height = "0px";
}

wallSidebarOpen.addEventListener("click", ()=>{
    if (wallSidebarOpen.classList.contains("wall_sidebar_open")) {
        wallSidebarOpen.style.height = "0px";
    }
});


let elements = [
    "token_icon", "home_icon", "info_icon", "question_icon", "contact_icon",
    "github_icon", "donate_icon", "wallSidebarOpen", "tutorials_icon"
]

elements.forEach((element)=>{
    closeSidebarMenu(document.getElementById(element));
})


function closeSidebarMenu(element)
{
    element.addEventListener("click", ()=>{

        /* CASO VISUALIZAÇÃO MOBILE */
        if(window.innerWidth<=540){
            sidebar.classList.toggle("active");
            wallSidebarOpen.classList.remove("wall_sidebar_open");
        }else{
            /* CASO VISUALIZAÇÃO DESKTOP */
            if(sidebar.classList.contains("active")){
                sidebar.classList.toggle("active");
                wallSidebarOpen.classList.remove("wall_sidebar_open");
            }
        }
    });
}