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
		    console.log(data);
		});
		
		elt.lastElementChild.lastElementChild.classList.toggle('active')
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
			    console.log(data);
			    window.location = 'http://localhost:3000/Basket'

			});
	}
	event.preventDefault()  
}
