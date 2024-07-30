const $button = document.querySelector(".review_submit_button");
$button.onclick = function() {
    const data = {
        "rating": label.getAttribute('data-rate'),
    }
    if(data["rating"] != 0){
        const textareas = document.getElementsByClassName("review-textarea");
        const coms = ["dignities", "disadvantages", "comment"]
        for(let i = 0; i < textareas.length; i++){
            if(textareas[i].value){
                data[coms[i]] = textareas[i].value;
            }
        }
        fetch('/вставь потом сюда ссылку, б', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(error => console.error('Ошибка:', error));
    }else{
        alert("Выберите оценку перед отправкой формы.");
    }
    
};
