const validator = require('validator')
const isEmpty = require('./is-empty')

const validateLoginInput = async data => {
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''

	if (validator.isEmpty(data.email)) {
		throw new Error('Email can not be left blank')
	} else if (!validator.isEmail(data.email)) {
		throw new Error('Email is invalid')
	} else if (validator.isEmpty(data.password)) {
		throw new Error('Password is required')
	} else {
		return true
	}
}

module.exports = {
	validateLoginInput,
}
