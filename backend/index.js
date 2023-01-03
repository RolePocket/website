const fs = require('fs')
const express = require('express')

const app = express()
const port = 3000

const httpSuccess = { code: 200, message: 'Success!' }
const httpBadRequest = { code: 400, message: 'Bad request.' }

const csvPath = './contacts.csv'
const csvHeader = 'nom;prenom;email'

function initCSV() {
	try {
		fs.statSync(csvPath)
	} catch (error) {
		fs.writeFileSync(csvPath, csvHeader)
	}
}

function addContact(contact) {
	const newLine = `${contact.nom};${contact.prenom};${contact.email}\n`
	fs.appendFileSync(csvPath, newLine)
}

initCSV()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
	res.send('pong!')
})

app.post('/contact', (req, res) => {
	addContact({
		nom: req.body.nom.toString(),
		prenom: req.body.prenom.toString(),
		email: req.body.email.toString()
	})
	res.send(httpSuccess)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})