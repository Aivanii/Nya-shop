function favorite(elt){
	let id = elt.id
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
