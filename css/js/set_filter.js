html = "";
html = `
<div class = "filter-container" id = "filter-container">
    <span class = "filter-button transform_scaler" id = "filter_button">Отмена</span>
    <ol>
`

let categories = [
    "Кружки",
    "Фигурки",
    "Постеры",
    "Секс куклы",
    "Купальники",
    "Игровые коврики",
    "Ночники",
    "Ободки",
    "Книги",
    "Подарочные наборы",
    "Сумки",
    "Бутылки для воды"
];
categories.forEach((category) => {
    html += `
    <li class = "transform_scaler">
        <span>${category}</span>
    </li>
    `
  })
html += `    </ol>
</div>`;
document.body.insertAdjacentHTML('afterend', html);

document.querySelector("#filter_button").addEventListener("click", (event) => {
    document.querySelector("#filter-container").style.display = "none";
});

document.querySelector("#filter_main_button").addEventListener("click", (event) => {
    document.querySelector("#filter-container").style.display = "block";
});