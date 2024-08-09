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
        data['id'] = this.value
        console.log(data)
        fetch('/Reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
        })
        .then(res => res.json(
            window.location.href = 'http://localhost:3000/Basa'
        ))
        .catch(error => console.error('Ошибка:', error));
    }else{
        alert("Выберите оценку перед отправкой формы.");
    }
    event.preventDefault();  
};
