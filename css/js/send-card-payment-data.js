const $button = document.querySelector("#card-payment-submit-button");
$button.onclick = function() {
    let is_okay = true;
    const nums = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
    const card_details = ["number", "exp-date", "cvv"]
    data = {}
    data[card_details[0]] = document.querySelector("#card-number").value;
    if(document.querySelector("#card-number").value.length != 19){is_okay = false;}
    data[card_details[1]] = document.querySelector("#exp-date").value;
    if(document.querySelector("#exp-date").value.length != 5){is_okay = false;}
    data[card_details[2]] = document.querySelector("#cvv").value;
    if(document.querySelector("#cvv").value.length != 3){is_okay = false;}
    for (var key in data) {
        if(nums.has(data[key].slice(-1)) == false){
            is_okay = false;
            break;
        }
    }
    if(is_okay == true){
        fetch('/вставь потом сюда ссылку, б', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(error => console.error('Ошибка:', error));
    }
}