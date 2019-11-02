const Validator = require('validator')
const isEmpty = require('./is-empty.js')

const validateRegisterInput = async (data) => {

	data.name = !isEmpty(data.name) ? data.name : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	if (!Validator.isLength(data.name, {
		min: 2,
		max: 30
	})) {
		throw new Error('Name must be between 2 and 30 characters')
	} else if (Validator.isEmpty(data.name)) {
		throw new Error('Name field is required')
	} else if (Validator.isEmpty(data.email)) {
		throw new Error('Email field is required')
	} else if (!Validator.isEmail(data.email)) {
		throw new Error('Email is invalid')
	} else if (Validator.isEmpty(data.password)) {
		throw new Error('Password field is required')
	} else if (!Validator.isLength(data.password, {
		min: 6,
		max: 30
	})) {
		throw new Error('Password must be at least 6 characters')
	} else if (Validator.isEmpty(data.password2)) {
		throw new Error('Confirm Password field is required')
	} else if (!Validator.equals(data.password, data.password2)) {
		throw new Error('Passwords must match')
	} else {
		return true
	}
}

module.exports = {
	validateRegisterInput
}