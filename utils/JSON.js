const fs = require('fs')
const {
    mongoTableURI
} = require('../config/keys')
const mongoose = require('mongoose')

const read = async (fileName) => {
    const file = fs.readFileSync('./data/' + fileName)
    const jsonParse = JSON.parse(file)
    return jsonParse
}

const upload = async (data, name) => {
    let toInsert = []
    await mongoose.connect(mongoTableURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        async (err, db) => {
            if (err) throw new Error(err)
            const collection = db.collection(name)
            for (let i = 0; i < data.length; i++) {
                toInsert.push(data[i])
                const isLastItem = i === data.length - 1
                if (i % 1000 === 0 || isLastItem) {
                    //insert every 1000 into the database
                    await collection.insertMany(toInsert)
                    toInsert = []
                }
            }
        })
}

module.exports = {
    read,
    upload
}