const spans_holder = document.querySelector("#spans-holder");
html = "";
let actual_rating = 0;
const label = document.querySelector("#label-span");
const ratings = [
    "Ужасно   ",
    "Плохо    ",
    "Нормально",
    "Хорошо   ",
    "Отлично  "
]

for (let i = 0; i < 5; i++) {
    html += `<span>★</span>`;
}
spans_holder.innerHTML = html;

for (let i = 0; i < spans_holder.childNodes.length; i++) {
    spans_holder.childNodes[i].onmouseover = function() { paint_stars(i+1); };
    spans_holder.childNodes[i].onmouseout = function() { zeroing_color(i+1); };
    spans_holder.childNodes[i].onclick = function() { star_on_click(i+1, ratings[i]); };
}

function star_on_click(length, text){
    actual_rating = length;
    label.innerText = text;
    label.setAttribute('data-rate', length);
}

function paint_stars(length) {
    for(let i = 0; i < 5; i++){
        spans_holder.childNodes[i].style.color = "#cecece";
    }
    for(let i = 0; i < length; i++){
        spans_holder.childNodes[i].style.color = "gold";
    }
}

function zeroing_color(length) {
    for(let i = length-1; i > actual_rating-1; i--){
        spans_holder.childNodes[i].style.color = "#cecece";
    }
    for(let i = 0; i < actual_rating; i++){
        spans_holder.childNodes[i].style.color = "gold";
    }
}