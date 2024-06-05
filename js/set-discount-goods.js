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
        {type: 'href', value: '#'}
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
        {type: 'href', value: '#'}
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
        {type: 'href', value: '#'}
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
        {type: 'href', value: '#'}
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
        {type: 'href', value: '#'}
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
        {type: 'href', value: '#'}
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
        {type: 'href', value: '#'}
    ],
];

const $block = document.querySelector('#discounts-week-container');

for(let j = 0; j < model.length +1; j++) {
    create_card(Math.floor(Math.random() * 7));
}

function create_card(i){

    let html = `
        <div class="card goods-card transform_scaler">
        <a href = ${model[i][3].value}>
            <img src= ${model[i][0].value} class= "card-img-top" alt= ${model[i][3].value}>
        </a>
        <a href = "${model[i][3].value}" style="text-decoration: none;">
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
