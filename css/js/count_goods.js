const goods_values = [];

let total_price = 0;

let counts = []

const $actual_prices = document.getElementsByClassName("actual-price");

for(let i = 0; i < $actual_prices.length; i++){
    counts.push(1);
}

for(let i = 0; i < $actual_prices.length; i++){
    let price = $actual_prices[i].textContent;
    price = Number(price.slice(0, -2));
    goods_values.push(price);
    total_price += price;
}
console.log(goods_values);
console.log(total_price);

const $spans = document.getElementsByClassName("buttons_span");
const $minus_buttons = document.getElementsByClassName("button_minus");
const $plus_buttons = document.getElementsByClassName("button_plus");
const $text_area = document.getElementById("text_area");
for(let i = 0; i < $plus_buttons.length; i++){
    $plus_buttons[i].addEventListener("click", function() {
        plus_counts($spans[i], i);
    });

    $minus_buttons[i].addEventListener("click", function() {
        minus_counts($spans[i], i);
    });
}
function plus_counts($text_obj, index){
    if(counts[index] <= 98){
        counts[index]++;
        total_price += goods_values[index];
        $text_obj.textContent = counts[index];
        console.log("click");
        if(!$minus_buttons[index].classList.contains('transform_scaler')){
            $minus_buttons[index].classList.add('transform_scaler');
            $minus_buttons[index].classList.toggle("disabled_button_toggle");
        }else if(counts[index] == 99){
            $plus_buttons[index].classList.remove('transform_scaler');
            $plus_buttons[index].classList.toggle("disabled_button_toggle");
        }
        $text_area.textContent = `Перейти к оплате заказа на сумму ${total_price} рублей`;
    }
}
function minus_counts($text_obj, index){
    if(counts[index] > 1) { 
        total_price -= goods_values[index];
        counts[index]--;
        $text_obj.textContent = counts[index];
        if(!$plus_buttons[index].classList.contains('transform_scaler')){
            $plus_buttons[index].classList.add('transform_scaler');
            $plus_buttons[index].classList.toggle("disabled_button_toggle");
        }else if(counts[index] == 1){
            $minus_buttons[index].classList.remove('transform_scaler');
            $minus_buttons[index].classList.toggle("disabled_button_toggle");
        }
        $text_area.textContent = `Перейти к оплате заказа на сумму ${total_price} рублей`;
    }
    
}
$text_area.textContent = `Перейти к оплате заказа на сумму ${total_price} рублей`;


