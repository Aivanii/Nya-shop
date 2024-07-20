html = "";
html = `
<div class = "filter-container" id = "filter-container">
    <span class = "filter-button transform_scaler" id = "filter_button">Отмена</span>
    <ol>
`

let categories = {
    "Одежда": ["Сумки", "Купальники"],
    "Товары_для_взрослых": ["Секс кукла"],
    "Канцтовары": ["Тетради", "Блокноты"],
    "Аксессуары": ["Фигурки", "Коврики", "Кружки",
    "Накладные ушки", "Ночники", "Зажигалки"],
    "Книги": ["Поваренные"],
    "Бижутерия": ["Подвески", "Кольца"],
    "Аниме_боксы": ["Genshin Impact"],
    "Мягкие_игрушки": ["Чехлы для салфеток"]
}
let index = 0;
for(let key in categories){
    html += `
    <li class = "transform_scaler" id = "${key}_category">
        <span>${key.replace(/_/g, " ")}</span>
    </li>
    `
    let div = `
    <div class = "filter-container child-filter-container" id = "${key}_category_menu">
    <span class = "filter-button transform_scaler">${key.replace(/_/g, " ")}</span>
    <ol>
    `
    categories[key].forEach(function(value) {
        div += `
        <li class = "transform_scaler">
            <span>${value}</span>
        </li>
    `
    });
    div += `
        </ol>
        </div>
    `
    document.body.insertAdjacentHTML('afterend', div);
    
    console.group(key)
    categories[key].forEach(function(value) {
        console.log(value);
    });
    console.groupEnd()
    //html += `
    //<li class = "transform_scaler">
    //    <span>${category}</span>
    //</li>
    //`
}
html += `    </ol>
</div>`;
document.body.insertAdjacentHTML('afterend', html);

for (let key in categories){
    document.querySelector(`#${key}_category`).addEventListener("click", (event) => {
        if(currently_visible == ""){
            document.querySelector(`#${key}_category_menu`).classList.toggle('visible');
            currently_visible = document.querySelector(`#${key}_category_menu`);
        }
        else if(currently_visible != document.querySelector(`#${key}_category_menu`)){
            currently_visible.classList.toggle('visible');
            document.querySelector(`#${key}_category_menu`).classList.toggle('visible');
            currently_visible = document.querySelector(`#${key}_category_menu`);
        }else{
            currently_visible = "";
            document.querySelector(`#${key}_category_menu`).classList.toggle('visible');
        }
    });
}

let currently_visible = "";

document.querySelector("#filter_button").addEventListener("click", (event) => {
    if(currently_visible){
        currently_visible.classList.toggle('visible');
        currently_visible = "";
    }
    document.querySelector("#filter-container").style.display = "none";
});

document.querySelector("#filter_main_button").addEventListener("click", (event) => {
    if(currently_visible){
        currently_visible.classList.toggle('visible');
        currently_visible = "";
    }
    document.querySelector("#filter-container").style.display = "block";
});

document.querySelector("#main-pc-filter-button").addEventListener("click", (event) => {
    if(currently_visible){
        currently_visible.classList.toggle('visible');
        currently_visible = "";
    }
    document.querySelector("#filter-container").style.display = "none";
});

document.querySelector("#main-pc-filter-button").addEventListener("click", (event) => {
    document.querySelector("#filter-container").style.display = "block";
});