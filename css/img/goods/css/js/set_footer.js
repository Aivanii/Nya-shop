html = ""
const $footer = document.querySelector("#footer");
html += `<div class = "footer_container">
<div>
    <h5>Компания</h5>
    <ol>
        <li><a href = "#">О Компании</a></li>
        <li><a href = "#">Вакансии</a></li>
        <li><a href = "#">Политика конфиденциальности</a></li>
    </ol>
</div>
<div>
    <h5>Покупателям</h5>
    <ol>
        <li><a href = "#">Как оформить заказ</a></li>
        <li><a href = "#">Способы оплаты</a></li>
        <li><a href = "#">Доставка</a></li>
    </ol>
</div>
<div>
    <h5>Поддержка</h5>
    <ol>
        <li><a href = "#">Помощь</a></li>
        <li><a href = "#">Обратная связь</a></li>
    </ol>
</div>
<div class = "contacts_container">
    <h5>Контакты</h5>
    <span>8-800-555-35-35 (круглосуточно)</span>
    <br>
    <span><b>Нашли ошибку?</b> <a href = "#" color = "blue"
        style = "border-bottom: 1px dotted blue; color: blue;">Сообщить об ошибке</a>
    </span>
</div>
</div>
<br>
<p style = "margin-top: 1rem; text-align: center; width: 100%;
border-top: 1px solid #cecece75; padding-top: 1rem;">©2024 Компания Drunk Wizard Studio. Все права (не)защищены.</p>`;
$footer.insertAdjacentHTML('afterbegin', html);