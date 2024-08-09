$button = document.querySelector(".catalog-submit-button");
let chosen_discount = 0;
$button.onclick = function() {
    data = {}
    data["discount"] = chosen_discount;

    const rating_button = document.querySelector("#flexSwitchCheckChecked12");

    data["rating_4_stars"] = rating_button.checked;

    let price_from = document.querySelector(".ss").value;
    if(!price_from){price_from = 0;}

    data["price_from"] = price_from 

    const price_to = document.querySelector(".ss1").value;

    data["price_to"] = price_to;

    console.log(data)

    if(data["price_to"] < data["price_from"]){
        alert("Введите правильные значения в поля ввода цены.");
    }
    else{
        console.log("отправка файла: ", data)
        //fetch('/вставь потом сюда ссылку, б', {
        //method: 'POST',
        //headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
        //})
        //.then(res => res.json())
        //.catch(error => console.error('Ошибка:', error));
    }
}
//rating 4*

//discount
const radios = document.querySelectorAll('input[name="flexRadioDefault"]');
radios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            chosen_discount = `${(index)*10}`.trim();
        }
    });
});