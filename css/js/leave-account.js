function spaning() {
    fetch('/Basaleave', {
       method: 'POST',
       headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(res => res.json(
       window.location.href = 'http://localhost:3000/Basa'
    ))
    .catch(error => console.error('Ошибка:', error));
};