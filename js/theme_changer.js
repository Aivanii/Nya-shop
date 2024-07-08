document.getElementById("color_change_button").addEventListener("click", theme_changing);

const dark_color = "#17191e"
const light_color = "#7e42ff"

let actual_theme = "light";

function theme_changing() {
    document.body.classList.toggle("dark");
    document.getElementById("navbar").classList.toggle("dark");
    let a_objects = document.getElementsByClassName("nav-link");
    for (let i = 0; i < a_objects.length; i++) {
        a_objects[i].classList.toggle("dark");
    }

    if(actual_theme === "light"){
        document.documentElement.style.setProperty('--bs-border-color', dark_color);
        document.querySelector('.navbar').style.setProperty('--bs-navbar-toggler-border-color', dark_color);
        document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg-dark.svg')";
        actual_theme = "dark";
    }else{
        document.documentElement.style.setProperty('--bs-border-color', light_color);
        document.querySelector('.navbar').style.setProperty('--bs-navbar-toggler-border-color', light_color);
        document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg.svg')";
        actual_theme = "light";
    }
}