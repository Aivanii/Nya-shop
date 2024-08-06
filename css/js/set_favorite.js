function favorite(elt){
	let id = elt.id
	if(!elt.dataset.bsToggle){
		fetch(`/Favor`,{
			method: 'post',
			body: `id=${id}`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		.then((response) => {
		    return response.text();
		})
		.then((data) => {
		    data = JSON.parse(data)
		    let div = document.getElementById('a_favorite')
		    let span = document.getElementById('favorite')
		    if(!span){
		    	span = document.createElement('span');
			    span.classList.add('count_circle');
			    span.id = 'favorite';
			    if(data['some'] > 0){
			    	console.log(data['some'])
		    		span.textContent = data['some'];
		    		div.insertAdjacentElement('beforeend', span);

				}else{
					span.remove();	
				}		    
				
			}else{
				if(data['some'] > 0){
					span.innerHTML = data['some'];
				}else{
					span.remove();	
				}	
			}
		    
		    elt.lastElementChild.lastElementChild.classList.toggle('active')
		});	
	}
}
function basket(elt){
	let id = elt.id
	if(!elt.dataset.bsToggle){
		fetch(`/Goods`,{
				method: 'post',
				body: `id=${id}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			.then((response) => {
			    return response.text();
			})
			.then((data) => {
			    if(data != 'del'){
			    	window.location = 'http://localhost:3000/Basket';
			    }else{
			    	location.reload();
			    }
			});
	}
	event.preventDefault();  
}
