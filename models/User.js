const mongoose = require('mongoose')
const {
	db
} = require('../config/mongo')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

module.exports = db.model('users', UserSchema)