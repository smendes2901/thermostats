const fs = require('fs')
const { mongoTableURI } = require('../config/keys')
const mongoose = require('mongoose')

const read = async (fileName) => {
    try {
        const file = fs.readFileSync('./data/' + fileName)
        jsonParse = JSON.parse(file)
        return (jsonParse)
    } catch (err) {
        throw err
    }
}

const upload = async (data, name) => {
    try {
        let toInsert = []
        await mongoose.connect(mongoTableURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            async (err, db) => {
                if (err) return res.status(400).json(err)
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
    } catch (err) {
        throw err
    }
}

module.exports = {
    read,
    upload
}