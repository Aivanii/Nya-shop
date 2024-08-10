const $img_span = document.querySelector(".submit-file-button");
$img_span.addEventListener('change', function (event){
    const files = event.target.files;
    if (files.length > 0) {
        const data = {
            "img": files[0]
        }
        //настрой тут ссылки
        //fetch('/Reviews', {
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
        //    body: JSON.stringify(data),
        //})
        //.then(res => res.json(
        //    window.location.href = 'http://localhost:3000/Basa'
        //))
        //.catch(error => console.error('Ошибка:', error));
    }
});