const DOMelements = {
	form: document.querySelector('#form'),
	formEmail: document.querySelector('#email'),
	formName: document.querySelector('#prenom'),
	formLastname: document.querySelector('#nom')
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
}

DOMelements.form.addEventListener('submit', formHandler)