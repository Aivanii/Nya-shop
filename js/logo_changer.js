window.addEventListener('resize', changing_image);
changing_image();
function changing_image(){
    if(window.innerWidth < 266){
        document.documentElement.style.setProperty('--light-logo-img', "img/nya_logo_small.svg");
    }else{
        document.documentElement.style.setProperty('--light-logo-img', "img/nya_logo.svg");
    }

    let logo_img = getComputedStyle(document.documentElement).getPropertyValue('--light-logo-img').replace(/"/g, '');
    document.getElementById("logo_img").src = logo_img;
}