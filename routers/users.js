const express = require('express')

const router = express.Router()

const userList = {
	12: {
		id: 12,
		username: 'vamos',
		password: 'rafa',
	},
}

router.post('/signup', (req, res) => {
	res.send('registro')
})

router.post('/signin', (req, res) => {
	res.send('login')
})

module.exports = router
