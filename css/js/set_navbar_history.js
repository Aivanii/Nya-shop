const $input = document.querySelector(".input_finding");
const $input_obj = document.querySelector("#input_obj");
document.documentElement.style.setProperty('--actual-history-container-size', `${$input_obj.offsetWidth}px`);
const $search_button = document.querySelector("#search_button");
let is_just_called = false;

let requests = [];
get_info_from_cookie();

function get_info_from_cookie(){
    let requests_str = "";
    console.log(`cookie: ${document.cookie}`)
    console.log(`requests: ${requests}`)
    requests = [];
    if(document.cookie.includes("  ") != false ){
    
        requests_str = document.cookie.slice(document.cookie.indexOf("researchs=[")+11, document.cookie.indexOf("]", document.cookie.indexOf("researchs=[")))
        
        while (requests_str.includes("  ")) {
            requests.push(requests_str.slice(0, requests_str.indexOf("  ")));
            requests_str = requests_str.slice(requests_str.indexOf("  ") + 2);
        }
    }
    
    if(requests.length > 5){requests.length = 5;}
    
}

function delete_history(index, delete_all){
    if(delete_all == false){
        let requests_str = "";
        for(let i = 0; i < requests.length; i++){
            if(i != index){
                requests_str += `${requests[i]}  `;
            }
        }
        requests_str = requests_str.slice(0, -2);
        document.cookie = `researchs=[${requests_str}  ]`;
    }else{
        document.cookie = `researchs=[]`;
    }
    get_info_from_cookie();
    document.querySelector("#histrory_container").remove(); 
    make_history()
}

function make_history(){
    let $nav_block = `<div class = "histrory_container his-item" id = "histrory_container"> <ol>`;
    $nav_block += `<li class = "his-item transform_scaler">
                    <span class = "his-item" style = "color: white">История поиска</span>  
                    <span class = "his-item" id = "history_span" 
                    onclick = "delete_history(0, true)">Удалить историю</span>
                </li>`  
    for(let i = 0; i < requests.length; i++){
        $nav_block += `
        <li class = "his-item transform_scaler">
            <span class = "his-item">${requests[i]}</span>  
            <span  class = "his-item" onclick = "delete_history(${i}, false)">×</span>
        </li>
        `
    }

    $nav_block += `</ol> </div>`;
    is_just_called = true;
    $input.insertAdjacentHTML('beforeend', $nav_block);
}

function make_new_request(){
    let input_value = $input_obj.value.trim();
    $input_obj.value = "";
    if(!requests.includes(input_value) && requests.length < 5){
        requests.unshift(input_value);
        document.cookie = `researchs=[${requests.join("  ")}  ]`;
        document.querySelector("#histrory_container").remove(); 
        get_info_from_cookie();
        make_history()
    }
}

$search_button.addEventListener("click", (event) => {
    make_new_request();
});
window.addEventListener("click", (event) => {
    if(!event.target.classList.contains("his-item")){
        if(document.querySelector("#histrory_container")){
            document.querySelector("#histrory_container").remove(); 
        }
    }
});
$input_obj.addEventListener("focus", () => {
    make_history();
});
window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--actual-history-container-size', `${$input_obj.offsetWidth}px`);
});