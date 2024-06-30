function delet(elt){
	let ids = elt.id
	let promise = fetch('/Basket', {
		method: 'post',
		body: `id=${ids}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
};