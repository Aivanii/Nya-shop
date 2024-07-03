const $rating_block = document.getElementsByClassName("rating")
for(let j = 0; j < $rating_block.length; j++){
    html = "";
    let rating = parseInt($rating_block[j].getAttribute('data-rating'));

    for(let i = 0; i < rating; i++){
        html += '<span>★</span>';
    }
    for(let i = 0; i < 5-rating; i++){
        html += "<span>☆</span>";
    }
    html += `<p style = "overflow: hidden; margin-bottom: 0rem;"> ${parseInt($rating_block[j].getAttribute('data-counts'))} </p>`;
    $rating_block[j].innerHTML = html;
}