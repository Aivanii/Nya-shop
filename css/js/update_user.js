function update(elt){
	let id = elt.id;
	let text;
	if(elt.value){
		if(id == 'NicknameInput'){
			text = `nick=${elt.value}`
		}else if(id == 'NameInput'){
			text = `name=${elt.value}`
		}else if(id == 'SurnameInput'){
			text = `surname=${elt.value}`
		}else if(id == 'PhoneInput'){
    		let pattern = elt.pattern;
    		if (new RegExp('^' + pattern + '$').test(elt.value)) {
				text = `phone=${elt.value}`
			}
		}else if(id == 'floatingInput'){
			if (elt.value.includes('@')){
				text = `email=${elt.value}`	
			}
					
		}else{
			text = `age=${elt.value}`
		}
		if(text){
			let promise = fetch('/Basa_update', {
				method: 'post',
				body: text,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}).then((response) => {
			    return response.text();
			})
			.then((data) => {
			    console.log(data);
			});
		}
		
	}
}