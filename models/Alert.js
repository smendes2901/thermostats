const mongoose = require('mongoose')
const {
    db
} = require('../config/mongo')
const Schema = mongoose.Schema

const AlertSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,

    },
    read: {
        type: Boolean,
        default: false

    }
})

module.exports = db.model('alerts', AlertSchema)