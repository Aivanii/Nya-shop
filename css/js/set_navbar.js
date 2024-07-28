html = "";

html = `
    <!-- Modal Window -->
<div class="modal fade " id="logining_window" tabindex="-1" aria-labelledby="logining_window_Label" aria-hidden="true">
  <form class="modal-dialog" onsubmit="sub(event)">
    <div class="modal-content">
      <div class="modal-header" style = "display: block;">
        <h1 class="modal-title fs-5" id="logining_window_Label">Введите данные пользователя</h1>
      </div>
      <div class="modal-body">
        <p>Введите вашу почту: </p>
        <input type="email" class="form-control" placeholder="Введите вашу почту" aria-label="Введите вашу почту" aria-describedby="basic-addon2" id = "email" required>
        <br>
        <p>Введите ваш пароль: </p>
        <input type="password" class="form-control" placeholder="Введите ваш пароль" aria-label="Введите ваш пароль" aria-describedby="basic-addon2" id = "password" required>
        <p id = "modal-error-text" style = "margin-top: 1rem;" ></p>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary transform_scaler" data-bs-dismiss="modal">Закрыть</button>
        <button id = 'error' type="submit" class="btn btn-secondary transform_scaler">Войти</button>
      </div>
    </div>
  </form>
</div>
    `
document.body.insertAdjacentHTML('afterend', html);


let button = document.querySelector('#error');
function sub(event) {
  
  let mail = document.getElementById('email').value;
  let pass = document.getElementById('password').value;
  if (event.target.checkValidity()) {
    fetch('/Log',{
      method: 'post',
      body: `email=${mail}&password=${pass}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(
      response => {
        return response.text();
      }
    ).then((data) => {
        if(data === 'false'){ 
          document.getElementById('modal-error-text').textContent = "неверные данные";
             
        }else{  
          document.getElementById('modal-error-text').textContent = 'успешно';
          window.location = 'http://localhost:3000/Basa'
        }

        
        
      
    });
  }
  event.preventDefault()  
};
