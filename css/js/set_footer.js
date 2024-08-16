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
        <li><span class = "a123" onclick="alert('На данный момент нашим магазином предусмотрена оплата только с использованием банковских карт.')">Способы оплаты</span></li>
        <li><span class = "a123" onclick="alert('На данный момент нашим магазином не предусмотрена доставка. Приносим свои извинения.')">Доставка</span></li>
    </ol>
</div>
<div>
    <h5>Поддержка</h5>
    <ol>
        <li><a href = "mailto:govnocoders@mail.ru">Помощь</a></li>
        <li><a href = "mailto:govnocoders@mail.ru">Обратная связь</a></li>
    </ol>
</div>
<div class = "contacts_container">
    <h5>Контакты</h5>
    <span>8 962 836-50-56 (Иван) круглосуточно</span>
    <br>
    <span><b>Нашли ошибку?</b> <a href = "mailto:govnocoders@mail.ru" color = "blue"
        style = "border-bottom: 1px dotted blue; color: blue;">Сообщить об ошибке</a>
    </span>
</div>
</div>
<br>
<p style = "margin-top: 1rem; text-align: center; width: 100%;
border-top: 1px solid #cecece75; padding-top: 1rem;">©2024 Компания Drunk Wizard Studio. Все права (не)защищены.</p>`;
$footer.insertAdjacentHTML('afterbegin', html);