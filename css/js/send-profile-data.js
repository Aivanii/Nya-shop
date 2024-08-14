function buttoning() {
    const data = {
         
        "nickname": document.querySelector("#NicknameInput").value,
        "name": document.querySelector("#NameInput").value,
        "surname": document.querySelector("#SurnameInput").value,
        "phone": document.querySelector("#PhoneInput").value,
        "email": document.querySelector("#floatingInput").value,
        "birth-date": document.querySelector("#AgeInput").value
    }
    if(document.querySelector("#NameInput").value &&
    document.querySelector("#floatingInput").value){
        fetch('/Basa_update', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
        })
        .then(res => res.json(
           window.location.href = 'http://localhost:3000/Basa'
        ))
        .catch(error => console.error('Ошибка:', error));
        }
    else{
        alert("Введите верные данные");
    }
};
