const model = [
    [
        {type: 'img', value: 'img/goods/Nahida-figure.png'},
        {type: 'price', value: [
            '16490',
            '17644',
            '-7%'
            ]
        },
        {type: 'title', value: 'Фигурка Нахида - Genshin Impact / Nahida - Genshin Impact'},
        {type: 'alt', value: "Фигурка Нахиды"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: false}
    ],

    [
        {type: 'img', value: 'img/goods/Miku-figure.png'},
        {type: 'price', value: [
                '7690',
                '76900',
                '-90%'
            ]
        },
        {type: 'title', value: 'Аниме фигурка "Хатсуне Мику Вокалоид", оригинальная, 13см - Figure Luminasta Hatsune Miku ~Live Stage~'},
        {type: 'alt', value: "Фигурка Мику"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: false}
    ],

    [
        {type: 'img', value: 'img/goods/Natsuki-figure.png'},
        {type: 'price', value: [
                '11653',
                '15537',
                '-25%'
            ]
        },
        {type: 'title', value: 'В наличии, 100% оригинальная литературная Клубная Коллекционная экшн-фигурка COB 2077 Natsuki Doki, 10 см, аниме Модели, игрушки'},
        {type: 'alt', value: "Фигурка Нацуки"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: false}
    ],

    [
        {type: 'img', value: 'img/goods/Izumi-t-shirt.png'},
        {type: 'price', value: [
                '1043',
                '990',
                '-5%'
            ]
        },
        {type: 'title', value: 'Футболка аниме Хоримия'},
        {type: 'alt', value: "Футболка аниме Хоримия"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: false}
    ],

    [
        {type: 'img', value: 'img/goods/Nahida-doll.png'},
        {type: 'price', value: [
                '99999',
                '78990',
                '-21%'
            ]
        },
        {type: 'title', value: 'Кукла нахиды'},
        {type: 'alt', value: "Кукла нахиды"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: false}
    ],

    [
        {type: 'img', value: 'img/goods/Natsuki-poster.png'},
        {type: 'price', value: [
                '254',
                '241',
                '-5%'
            ]
        },
        {type: 'title', value: 'Плакаты аниме постеры doki doki доки доки литературный клуб Нацуки'},
        {type: 'alt', value: "Плакат Нацуки"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: false}
    ],

    [
        {type: 'img', value: 'img/goods/Rem-figure.png'},
        {type: 'price', value: [
                '9999',
                '485',
                '+95%'
            ]
        },
        {type: 'title', value: 'Фигурка Re:Zero, Rem, Рем'},
        {type: 'alt', value: "Фигурка Re:Zero, Rem"},
        {type: 'href', value: '#'},
        {type: 'age_limit', value: true}
    ],
];

const $block = document.querySelector('#discounts-week-container');

let user_age = 15;
//here you will then transfer the user's
// age from the session/database, bambaleyla!

for(let j = 0; j < 6; j++) {
    create_card(Math.floor(Math.random() * 7));
}

function create_card(i){
    let html = `
        <div class="card goods-card transform_scaler">
    `
    if(model[i][5].value == true && user_age < 18){
        html+= `
        <a href = "age_checking.html">
            <img src= "img/goods/blur.jpg" class= "card-img-top" alt= ${model[i][3].value}>
            <div class = "adult_container">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill="#1d1d1d" d="M3.707 2.293a1 1 0 1 0-1.414 1.414L3.805 5.22c-1.065.748-1.956 1.847-2.7 3.334a1 1 0 1 0 1.79.894c.69-1.38 1.454-2.22 2.26-2.724l.096-.058.94.941a3 3 0 1 0 4.202 4.202l1.9 1.9a1 1 0 0 0 1.414-1.415zm3.942 6.77 1.288 1.288a1 1 0 1 1-1.288-1.288m.596-5.06 3.008 3.008c.656.517 1.28 1.29 1.852 2.436a1 1 0 0 0 1.79-.894c-.81-1.62-1.796-2.78-2.99-3.526-1.126-.704-2.362-.992-3.66-1.024"></path>
                </svg>
                <p class = "adult_text">Товар для взрослых!</p>
            </div>
        </a>
        <a href = "age_checking.html" style="text-decoration: none;">
        `
    }else{
        html += `
        <button class = "add-to-favorite" onclick = "this.lastElementChild.lastElementChild.classList.toggle('active')">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#181826" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278M7 5a4 4 0 0 0-4 4c0 3.552 2.218 6.296 4.621 8.22A21.5 21.5 0 0 0 12 19.91a21.6 21.6 0 0 0 4.377-2.69C18.78 15.294 21 12.551 21 9a4 4 0 0 0-4-4c-1.957 0-3.652 1.396-4.02 3.2a1 1 0 0 1-1.96 0C10.652 6.396 8.957 5 7 5" clip-rule="evenodd"></path>
                <path fill="white" fill-rule="evenodd" d="M12 22c-.285-.018-.512-.123-.764-.24l-.084-.038a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568q.3-.418.666-.78A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278m0-17.959A7.18 7.18 0 0 1 17 2a7 7 0 0 1 7 7c0 4.897-3.061 8.41-5.75 10.562a24.6 24.6 0 0 1-4.989 3.07c-.566.258-.92.368-1.261.368h-.032l-.033-.002c-.484-.032-.881-.218-1.12-.33l-.077-.036a24.5 24.5 0 0 1-4.991-3.07C3.056 17.408 0 13.895 0 9a7 7 0 0 1 7-7c1.918 0 3.701.776 5 2.041M3 9a4 4 0 0 1 4-4c1.957 0 3.652 1.396 4.02 3.2a1 1 0 0 0 1.96 0C13.348 6.396 15.043 5 17 5a4 4 0 0 1 4 4c0 3.552-2.22 6.295-4.625 8.22A21.6 21.6 0 0 1 12 19.91a21.5 21.5 0 0 1-4.377-2.69C5.217 15.295 3 12.551 3 9" clip-rule="evenodd"></path>
                <path class = "red-heart-icon" fill="#F8104B" fill-rule="evenodd" d="M12 22c-.316-.02-.56-.147-.848-.278a23.5 23.5 0 0 1-4.781-2.942C3.777 16.705 1 13.449 1 9a6 6 0 0 1 6-6 6.18 6.18 0 0 1 5 2.568A6.18 6.18 0 0 1 17 3a6 6 0 0 1 6 6c0 4.448-2.78 7.705-5.375 9.78a23.6 23.6 0 0 1-4.78 2.942c-.543.249-.732.278-.845.278" clip-rule="evenodd"></path>
            </svg>
        </button>
        <a href = ${model[i][4].value}>
            <img src= ${model[i][0].value} class= "card-img-top" alt= ${model[i][3].value}>
        </a>
        <a href = "${model[i][4].value}" style="text-decoration: none;">
        `
    }
    html += `
            <div class="card-body">
              <div class="card-container-price card-title">
                <p class="actual-price">${model[i][1].value[0]} ₽</p>
                <p class="crossed-price">${model[i][1].value[1]} ₽</p>
                <p class="discount-price">${model[i][1].value[2]} </p>
              </div>
              <p class="good-title">
                ${model[i][2].value}
              </p>
            </div>
        </a>
      </div>
    `
    $block.insertAdjacentHTML('beforeend', html);
}
