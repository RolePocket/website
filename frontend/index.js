const DOMelements = {
	form: document.querySelector('#form'),
	formEmail: document.querySelector('#email'),
	formName: document.querySelector('#prenom'),
	formLastname: document.querySelector('#nom'),
	formAllInputs: document.querySelectorAll('#form input'),
	formSubmit: document.querySelector('#form button')
}

function formHandler(event) {
	event.preventDefault()

	fetch('http://localhost:3000/contact', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			email: DOMelements.formEmail.value,
			prenom: DOMelements.formName.value,
			nom: DOMelements.formLastname.value
		})
	})
		.then(result => result.json())
		.then(() => {
			alert('Vous êtes maintenant inscrits à la newsletter, merci !')

		})
		.catch(result => {
			alert('Quelque chose semble s\'être mal passé...')
			console.error(result)
		})
}

function inputsHandler() {
	let disabled = false
	DOMelements.formAllInputs.forEach(input => {
		if (input.value === '') {
			disabled = true
		}
	})
	DOMelements.formSubmit.disabled = disabled
}


function clearForm() {
	DOMelements.formAllInputs.forEach(input => input.value = '')
	inputsHandler()
}

DOMelements.form.addEventListener('submit', formHandler)
DOMelements.form.addEventListener('input', inputsHandler)