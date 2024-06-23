document.getElementById("color_change_button").addEventListener("click", theme_changing);

const dark_color = "#202034";
const light_color = "#262641";

const white_color = "#fff";


const white_text_color = "#ffffff8c";
const dark_text_color = "#0000008c";

let actual_theme = "light";

function theme_changing() {

    if(actual_theme === "light"){
        document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg-dark.svg')";

        let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--dark-logo-img').replace(/"/g, '');
        document.getElementById("logo_img").src = logo_img;

        document.body.style.background = "#262641";

        document.documentElement.style.setProperty('--actual-hovered-links-color', "white");
        document.documentElement.style.setProperty('--actual-color-one', light_color);
        document.documentElement.style.setProperty('--actual-color-two', dark_color);
        document.documentElement.style.setProperty('--actual-color-three', dark_color);
        document.documentElement.style.setProperty('--actual-non-active-links-color', white_text_color);

        document.documentElement.style.setProperty('--actual-theme', "dark");
        actual_theme = "dark";
    }else{
        document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg.svg')";

        let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--light-logo-img').replace(/"/g, '');
        document.getElementById("logo_img").src = logo_img;

        document.body.style.background = "white";

        document.documentElement.style.setProperty('--actual-hovered-links-color', "black");
        document.documentElement.style.setProperty('--actual-color-one', dark_color);
        document.documentElement.style.setProperty('--actual-color-two', light_color);
        document.documentElement.style.setProperty('--actual-color-three', white_color);
        document.documentElement.style.setProperty('--actual-non-active-links-color', dark_text_color);

        document.documentElement.style.setProperty('--actual-theme', "light");
        actual_theme = "light";
    }
}