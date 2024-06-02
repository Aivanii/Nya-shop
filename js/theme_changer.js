document.getElementById("color_change_button").addEventListener("click", theme_changing);

function theme_changing() {
    document.body.classList.toggle("dark");
    document.getElementById("navbar").classList.toggle("dark");
    let a_objects = document.getElementsByClassName("nav-link");
    for (let i = 0; i < a_objects.length; i++) {
        a_objects[i].classList.toggle("dark");
    }

}