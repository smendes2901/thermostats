const mongoose = require('mongoose')
const { mongoURI } = require('./keys')

const db = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    db
}