const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../config/keys')

//Load Input Validation...
const {
	validateRegisterInput
} = require('../../validator/register')
const {
	validateLoginInput
} = require('../../validator/login')

// Load user model...
const User = require('../../models/User')

router.post('/register', (req, res) => {
	//Validate received user data
	validateRegisterInput(req.body).then(() => {
		//check if user email is present in system
		User.findOne({
			email: req.body.email
		}).then(user => {
			if (user) {
				//return text if user exists
				return res.status(400).json('A user with this email already exists')
			} else {
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
				})
				//hash password for security before storage
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err
						newUser.password = hash
						// On successful hashing add user info to database
						newUser
							.save()
							.then(() => {
								return res.status(200).send('sucess')
							})
							.catch(err => {
								return res.status(400).json(err.message)
							})
					})
				})
			}
		}).catch(err => {
			return res.status(400).json(err.message)
		})
	}).catch(err => {
		return res.status(400).json(err.message)
	})

})

router.post('/login', (req, res) => {
	//validate request data 
	validateLoginInput(req.body).then(() => {

		const email = req.body.email
		const password = req.body.password
		//Lookup user email in system
		User.findOne({
			email
		}).then(user => {
			if (!user) {
				return res.status(401).json('email not found')
			}
			//check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					//User matched.....
					const payload = {
						id: user.id,
						name: user.name,
					}
					//Verify JWT
					jwt.sign(
						payload,
						key.secretOrKey, {
							expiresIn: 3600
						},
						(err, token) => {
							//On successful verification send bearer token to client
							res.json({
								success: true,
								token: 'Bearer  ' + token,
							})
						}
					)
				} else {
					return res.status(401).json('password is incorrect')
				}
			}).catch(err => {
				return res.status(401).json(err.message)
			})
		})
	}).catch(err => {
		return res.status(401).json(err.message)
	})
})

module.exports = router