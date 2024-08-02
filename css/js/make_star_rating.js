const spans_holder = document.querySelector(".spans-holder");
let html = "";
for (let i = 0; i < 5; i++) {
    html += `<span>☆</span>`;
}
spans_holder.innerHTML = html;

for (let i = 0; i < spans_holder.childNodes.length; i++) {
    spans_holder.childNodes[i].onmouseover = function() { paint_stars(i+1); };
    spans_holder.childNodes[i].onmouseout = function() { zeroing_color(i+1); };
}

function paint_stars(length) {
    for(let i = 0; i < length; i++){
        spans_holder.childNodes[i].textContent = "★";
        spans_holder.childNodes[i].style.color = "gold";
    }
}

function zeroing_color(length) {
    for(let i = 0; i < length; i++){
        spans_holder.childNodes[i].textContent = "☆";
        spans_holder.childNodes[i].style.color = "#cecece";
    }
}