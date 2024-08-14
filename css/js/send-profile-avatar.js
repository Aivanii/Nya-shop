const $img_span = document.querySelector(".submit-file-button");
$img_span.addEventListener('change', function (event){
    const form = document.getElementById('Form');
    form.submit();
});
