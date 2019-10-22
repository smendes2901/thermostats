const mongoose = require('mongoose')
const { mongoURI } = require('./keys')

const db = mongoose.createConnection(mongoURI)
const tableDb = db.useDb('tables')


module.exports = {
    db,
    tableDb
}