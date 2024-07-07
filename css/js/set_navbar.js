let html;
let after = document.getElementById("begin");
html = `
<nav class="navbar navbar-expand-lg" id = "navbar">
  <div class="container">
  <a class="navbar-brand logo_a transform_scaler" id = "logo" href="/">
  <picture>
    <source srcset="img/nya_logo_small.svg" media="(max-width: 267px)">
    <img src = "img/nya_logo.svg" id = "logo_img" alt = "logo-button" style = "transition: .4s;">
  </picture>
  </a>
  <form class="d-flex input_finding" role="search">
    <input class="form-control me-2" placeholder="Поиск по сайту" type="search" aria-label="Поиск по сайту">
    <button class="btn btn-outline-success" type="submit" style = "
      margin-left: -50px;
      height: 36px;
      width: 36px;
      margin-top: auto;
      margin-bottom: auto;">
      <svg width="21" height="21" fill="none" xmlns="http://www.w3.org/2000/svg" style = "margin-top: -8px; margin-left: -3px;">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.828 4.75a6.078 6.078 0 100 12.156 6.078 6.078 0
              000-12.156zM3.25 10.828a7.578 7.578 0 1113.441 4.801l4.161
              4.162a.75.75 0 11-1.06 1.06l-4.162-4.16a7.578 7.578 0 01-12.38-5.862z"
              fill="#cecece">
        </path>
      </svg>
    </button>
  </form>
  <button class="navbar-toggler menu-button" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarScroll"
          aria-controls="navbarScroll" aria-expanded="false" aria-label="Переключатель навигации">
    <span class="navbar-toggler-icon" id = "navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse drop-menu" id="navbarScroll">
    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" id = 'ul'>
`
after.insertAdjacentHTML('beforebegin', html);
let ul = document.getElementById("ul");
ul.appendChild(after);


html =  `
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Корзина</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Избранное</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`
after.insertAdjacentHTML('afterend',html);



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
