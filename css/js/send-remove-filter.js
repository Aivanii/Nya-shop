var reset_filters_btn = document.querySelector("#reset_filters_btn")
reset_filters_btn.onclick = function () {
    let data = {}
    data["discount"] = 0;
    data["rating_4_stars"] = false;
    data["price_from"] = 0;
    data["price_to"] = '';

    console.log(data)
    fetch('/Filtirpromax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(error => console.error('Ошибка:', error));
    window.location.href = window.location.href
}