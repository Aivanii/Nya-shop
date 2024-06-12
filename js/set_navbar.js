let html;
//then you will send here whether the user has logged into the account, bambaleyla
let is_user_logged = false;
html = `
<nav class="navbar navbar-expand-lg" id = "navbar">
    <div class="container">
    <a class="navbar-brand logo_a transform_scaler" id = "logo" href="index.html">
      <img id = "logo_img" style = "transition: .4s;">
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
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
        <li class="nav-item">
        `
if(is_user_logged == false){
    html  += `
          <button type="button" class="user-profile-login" data-bs-toggle="modal" data-bs-target="#logining_window">
            Войти
          </button>
        `
}
else {
    html  += `
    <a href = "user_page.html">
        {username}
    </a>
    `
}
html +=  `
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Корзина</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Избранное</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`
document.body.insertAdjacentHTML('beforebegin', html);

if(is_user_logged == false){
    html = `
    <!-- Modal Window -->
<div class="modal fade " id="logining_window" tabindex="-1" aria-labelledby="logining_window_Label" aria-hidden="true">
  <form class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style = "display: block;">
        <h1 class="modal-title fs-5" id="logining_window_Label">Введите данные пользователя</h1>
      </div>
      <div class="modal-body">
        <p>Введите вашу почту: </p>
        <input type="email" class="form-control" placeholder="Введите вашу почту" aria-label="Введите вашу почту" aria-describedby="basic-addon2">
        <br>
        <p>Введите ваш пароль: </p>
        <input type="password" class="form-control" placeholder="Введите ваш пароль" aria-label="Введите ваш пароль" aria-describedby="basic-addon2">
        <!--Here you entering error msg if data is wrong, bambaleyla-->
        <p id = "modal-error-text" style = "margin-top: 1rem;"> </p>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary transform_scaler" data-bs-dismiss="modal">Закрыть</button>
        <button type="submit" class="btn btn-secondary transform_scaler">Войти</button>
      </div>
    </div>
  </form>
</div>
    `
    document.body.insertAdjacentHTML('afterend', html);
}