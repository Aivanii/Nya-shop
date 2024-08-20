html = "";
html = `
<div class = "filter-container" id = "filter-container">
    <span class = "filter-button transform_scaler" id = "filter_button">Отмена</span>
    <ol>
     

`

let categories = {
    "Одежда": ["Сумки", "Купальники"],
    "Товары_для_взрослых": ["Секс куклы"],
    "Канцтовары": ["Тетради", "Блокноты", "Ручки", "Линейки"],
    "Аксессуары": ["Фигурки", "Коврики", "Кружки",
    "Накладные ушки", "Ночники", "Зажигалки"],
    "Книги": ["Поваренные"],
    "Бижутерия": ["Подвески", "Кольца"],
    "Аниме_боксы": ["Genshin Impact"],
    "Мягкие_игрушки": ["Чехлы для салфеток"]
}
let index = 0;
let div = `
    <form id = 'myForm' action = '/Go_to_catalog' method = 'POST'>
    <input type="hidden" name="divValue" id="divValue" value="">
    <input type="hidden" name="liValue" id="liValue" value="">
`
for (let key in categories) {
    html += `
    <li class = "transform_scaler" id = "${key}_category">
        <span>${key.replace(/_/g, " ")}</span>
    </li>
    `
    div += `
    <div class = "filter-container child-filter-container" id = "${key}_category_menu" value = >
    <span class = "filter-button transform_scaler" name = 'category_menu'>${key.replace(/_/g, " ")}</span>
    <ol>
    
    `
    categories[key].forEach(function (value) {
        div += `
        <li class = "transform_scaler" onclick = "submitForm('${value}','${key.replace(/_/g, " ")}')">
            <span>${value}</span>
        </li>
    `
    });
    div += `

        </ol>
        
        </div>
    `
}
div += `
</form>
`
document.body.insertAdjacentHTML('afterend', div);
html += ` 

</ol>
</div>
`;
document.body.insertAdjacentHTML('afterend', html);

for (let key in categories) {
    document.querySelector(`#${key}_category`).addEventListener("click", (event) => {
        if (currently_visible == "") {
            document.querySelector(`#${key}_category_menu`).classList.toggle('visible');
            currently_visible = document.querySelector(`#${key}_category_menu`);
        }
        else if (currently_visible != document.querySelector(`#${key}_category_menu`)) {
            currently_visible.classList.toggle('visible');
            document.querySelector(`#${key}_category_menu`).classList.toggle('visible');
            currently_visible = document.querySelector(`#${key}_category_menu`);
        } else {
            currently_visible = "";
            document.querySelector(`#${key}_category_menu`).classList.toggle('visible');
        }
    });
}

let currently_visible = "";
if(document.getElementById('select-filt_1')){
    const selectElement = document.getElementById('select-filt_1');
    selectElement.addEventListener('change', function() {
        
    fetch(`/Filtirspisok`,{
            method: 'post',
            body: `ids=${selectElement.value}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            location.reload()
        })
    
    });
}
document.querySelector("#filter_button").addEventListener("click", (event) => {
    if (currently_visible) {
        currently_visible.classList.toggle('visible');
        currently_visible = "";
    }
    document.querySelector("#filter-container").style.display = "none";
});
if (document.querySelector("#filter_main_button")) {
    document.querySelector("#filter_main_button").addEventListener("click", (event) => {
        if (currently_visible) {
            currently_visible.classList.toggle('visible');
            currently_visible = "";
        }
        document.querySelector("#filter-container").style.display = "block";
    });
}
document.querySelector("#main-pc-filter-button").addEventListener("click", (event) => {
    if (currently_visible) {
        currently_visible.classList.toggle('visible');
        currently_visible = "";
    }
    document.querySelector("#filter-container").style.display = "none";
});

document.querySelector("#main-pc-filter-button").addEventListener("click", (event) => {
    document.querySelector("#filter-container").style.display = "block";
});
function submitForm(liValue, divValue) {
    const form = document.getElementById('myForm');
    form.elements.divValue.value = divValue;
    form.elements.liValue.value = liValue;
    form.submit();
}
