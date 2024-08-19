const goods_values = [];

let total_price = 0;

let counts = []

const $actual_prices = document.getElementsByClassName("actual-price");
const $spans = document.getElementsByClassName("buttons_span");
for(let i = 0; i < $actual_prices.length; i++){
    counts.push($spans[i].textContent);
    let price = $actual_prices[i].textContent;
    price = Number(price.slice(0, -2));
    goods_values.push(price);
    price = price * $spans[i].textContent
    total_price += price;

}
console.log(counts);
console.log(total_price);

const $minus_buttons = document.getElementsByClassName("button_minus");
const $plus_buttons = document.getElementsByClassName("button_plus");
const $text_area = document.getElementById("text_area");
const $button = document.getElementsByClassName("favorite_button");

for(let i = 0; i < $plus_buttons.length; i++){
    $plus_buttons[i].addEventListener("click", function() {
        plus_counts($spans[i], i, $button[i].value);
    });

    $minus_buttons[i].addEventListener("click", function() {
        minus_counts($spans[i], i, $button[i].value);
    });
}
function plus_counts($text_obj, index, id){
    if($text_obj.textContent <= 98){
        counts[index]++;
        total_price += goods_values[index];
        $text_obj.textContent++;
        if(!$minus_buttons[index].classList.contains('transform_scaler')){
            $minus_buttons[index].classList.add('transform_scaler');
            $minus_buttons[index].classList.toggle("disabled_button_toggle");
        }else if($text_obj.textContent == 99){
            $plus_buttons[$text_obj].classList.remove('transform_scaler');
            $plus_buttons[$text_obj].classList.toggle("disabled_button_toggle");
        }
        $text_area.textContent = `Перейти к оплате заказа на сумму ${total_price} рублей`;
        fetch(`/Amount`,{
            method: 'post',
            body: `id=${id}&amount=${$text_obj.textContent}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
        });
    }
    
}
function minus_counts($text_obj, index, id){
    if($text_obj.textContent > 1) { 
        total_price -= goods_values[index];
        counts[index]--;
        $text_obj.textContent--;
        if(!$plus_buttons[index].classList.contains('transform_scaler')){
            $plus_buttons[index].classList.add('transform_scaler');
            $plus_buttons[index].classList.toggle("disabled_button_toggle");
        }else if($text_obj.textContent == 1){
            $minus_buttons[index].classList.remove('transform_scaler');
            $minus_buttons[index].classList.toggle("disabled_button_toggle");
        }
        $text_area.textContent = `Перейти к оплате заказа на сумму ${total_price} рублей`;
        fetch(`/Amount`,{
            method: 'post',
            body: `id=${id}&amount=${$text_obj.textContent}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
        });
    }
    
}
$text_area.textContent = `Перейти к оплате заказа на сумму ${total_price} рублей`;


