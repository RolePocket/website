const fs = require('fs')
const express = require('express')
const cors = require('cors')

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
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/ping', (req, res) => {
	res.json('pong!')
})

app.post('/contact', (req, res, next) => {
	try {
		addContact({
			nom: req.body.nom.toString(),
			prenom: req.body.prenom.toString(),
			email: req.body.email.toString()
		})
	} catch (error) {
		console.log('Cannot parse req.body')
		res.json(httpBadRequest)
		return
	}
	res.json(httpSuccess)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})