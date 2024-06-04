window.addEventListener('resize', changing_image);

function changing_image(){
    if(window.innerWidth < 266){
        document.documentElement.style.setProperty('--dark-logo-img', "img/nya_logo_small-dark.svg");
        document.documentElement.style.setProperty('--light-logo-img', "img/nya_logo_small.svg");
    }else{
        document.documentElement.style.setProperty('--dark-logo-img', "img/nya_logo-dark.svg");
        document.documentElement.style.setProperty('--light-logo-img', "img/nya_logo.svg");
    }
    image_update();
}

function image_update(){
    let theme = getComputedStyle(document.documentElement).getPropertyValue('--actual-theme').replace(/"/g, '');
    if(theme == "light"){
        let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--light-logo-img').replace(/"/g, '');
        document.getElementById("logo_img").src = logo_img;
    }else{
        let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--dark-logo-img').replace(/"/g, '');
        document.getElementById("logo_img").src = logo_img;
    }
}
changing_image();
