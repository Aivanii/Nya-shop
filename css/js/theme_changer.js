document.getElementById("color_change_button").addEventListener("click", theme_changing);

const dark_color = "#17191e"
const light_color = "#7e42ff"


let light = "?id=light";
let dark = "?id=dark";
let x = "?id=" + document.getElementById("box").value;
let z = window.location.href;
let y;
function theme_changing() {
    document.body.classList.toggle("dark");
    document.getElementById("navbar").classList.toggle("dark");
    let a_objects = document.getElementsByClassName("nav-link");
    for (let i = 0; i < a_objects.length; i++) {
        a_objects[i].classList.toggle("dark");
    }
    document.getElementById("logo").classList.toggle("dark");

    if(x === "?id=light"){
        y = z.replace(light,'');
        x ="?id=dark"
        if(z.includes('?id=dark')){

        }else{
            y += x
        }
        
        document.documentElement.style.setProperty('--bs-border-color', dark_color);
        document.querySelector('.navbar').style.setProperty('--bs-navbar-toggler-border-color', dark_color);
        document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg-dark.svg')";

        let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--dark-logo-img').replace(/"/g, '');
        document.getElementById("logo_img").src = logo_img;

        document.documentElement.style.setProperty('--actual-color-one', light_color);
        document.documentElement.style.setProperty('--actual-color-two', dark_color);

        document.documentElement.style.setProperty('--actual-theme', "dark");
        window.location.href = y;
        
    }else{

        y = z.replace(dark,'');

        x ="?id=light"
        if(z.includes('?id=light')){

        }else{
            y += x
        }
        
        
        document.documentElement.style.setProperty('--bs-border-color', light_color);
        document.querySelector('.navbar').style.setProperty('--bs-navbar-toggler-border-color', light_color);
        document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg.svg')";

        let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--light-logo-img').replace(/"/g, '');
        document.getElementById("logo_img").src = logo_img;

        document.documentElement.style.setProperty('--actual-color-one', dark_color);
        document.documentElement.style.setProperty('--actual-color-two', light_color);

        document.documentElement.style.setProperty('--actual-theme', "light");
        window.location.href = y;
        

    }
    
}

    
if(x == "?id=dark"){
 
    const checkbox = document.getElementById('box');
    checkbox.checked = true

    document.body.classList.toggle("dark");
    document.getElementById("navbar").classList.toggle("dark");
    let a_objects = document.getElementsByClassName("nav-link");
    for (let i = 0; i < a_objects.length; i++) {
        a_objects[i].classList.toggle("dark");
    }
    document.getElementById("logo").classList.toggle("dark");

    document.documentElement.style.setProperty('--bs-border-color', dark_color);
    document.querySelector('.navbar').style.setProperty('--bs-navbar-toggler-border-color', dark_color);
    document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg-dark.svg')";

    let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--dark-logo-img').replace(/"/g, '');
    document.getElementById("logo_img").src = logo_img;

    document.documentElement.style.setProperty('--actual-color-one', light_color);
    document.documentElement.style.setProperty('--actual-color-two', dark_color);

    document.documentElement.style.setProperty('--actual-theme', "dark");

    
}else{  
    if(document.getElementsByClassName("dark") ? true : false ){

    }else{
        document.body.classList.toggle("dark");
        document.getElementById("navbar").classList.toggle("dark");
        let a_objects = document.getElementsByClassName("nav-link");
        for (let i = 0; i < a_objects.length; i++) {
            a_objects[i].classList.toggle("dark");
        }
        document.getElementById("logo").classList.toggle("dark"); 
    }
    document.documentElement.style.setProperty('--bs-border-color', light_color);
    document.querySelector('.navbar').style.setProperty('--bs-navbar-toggler-border-color', light_color);
    document.getElementById("navbar-toggler-icon").style.backgroundImage = "url('../img/toggler-icon-bg.svg')";

    let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--light-logo-img').replace(/"/g, '');
    document.getElementById("logo_img").src = logo_img;

    document.documentElement.style.setProperty('--actual-color-one', dark_color);
    document.documentElement.style.setProperty('--actual-color-two', light_color);

    document.documentElement.style.setProperty('--actual-theme', "light");
}
