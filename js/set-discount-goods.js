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
                '-25'
            ]
        },
        {type: 'title', value: 'В наличии, 100% оригинальная литературная Клубная Коллекционная экшн-фигурка COB 2077 Natsuki Doki, 10 см, аниме Модели, игрушки'},
        {type: 'alt', value: "Фигурка Нацуки"},
        {type: 'href', value: '#'}
    ],

    [
        {type: 'img', value: 'img/goods/Tail.png'},
        {type: 'price', value: [
                '482',
                '492',
                '-3%'
            ]
        },
        {type: 'title', value: 'Анальная пробка с хвостом для подготовки к анальному сексу, для неё и для него, размер S, Вибропуля в подарок'},
        {type: 'alt', value: "Анальная пробка с хвостом"},
        {type: 'href', value: '#'}
    ]
];

const $block = document.querySelector('#discounts-week-container');
for(let i = 0; i < model.length; i++) {
    create_card(i);
}
for(let i = 0; i < model.length; i++) {
    create_card(i);
}

function create_card(i){

    let html = `
        <div class="card goods-card">
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