function del_com(elt) {
    let value;
    if(elt.innerHTML[0] == 'И'){
        value = 'up'
    }else{
        value = 'del'
    }
    fetch('/Update_comment', {
        method: 'post',
        body: `id=${elt.id}&value=${value}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then((response) => {
        return response.text();
    })
    .then((data) => {
        console.log(elt.innerHTML[0])
        if(data == 'true'){
            window.location = 'http://localhost:3000/Orders';
        }else{
            window.location = 'http://localhost:3000/Comment';
        }
    });
}