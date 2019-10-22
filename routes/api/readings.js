const express = require('express')
const passport = require('passport')
const router = express.Router()
const fs = require('fs')
const { epochToString, stringToEpoch } = require('../../utils/datetime')
const reduceByDate = require('../../utils/reduceByDate')
const { read, upload } = require('../../utils/JSON')
const { insertAlerts } = require('../../utils/alerts')

// Load alert model...
const Alert = require('../../models/Alert')

//get file list from folder
router.get('/', async (req, res) => {
    const testFolder = './data/'
    fs.readdir(testFolder, (err, files) => {
        if (err) res.status(400).json(err.message)
        res.send(files)
    })
})

//get selected json
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    read(req.body.name).then(records => {
        const refinedRecords = records.map(record => ({ val: record.val, ts: epochToString(record.ts) }))
            .sort((prev, curr) => prev.ts - curr.ts)
            .filter(record => record.ts.startsWith('2015'))
            .reduce((acc, curr) => reduceByDate(acc, curr), [])
            .map(record => ({ val: (record.val / record.count), ts: stringToEpoch(record.ts) }))
            .map(record => ({
                x: record.ts,
                y: record.val
            }))
        return res.status(200).send(refinedRecords)
    }).catch(err => {

        return res.status(400).json(err.message)
    })
})

const uploadAndNotify = async (data, name, req) => {
    const io = req.app.get('socketio')
    let message = {}
    try {
        await upload(data, name)
        message = {
            message: name + ' Upload SuccessFul',
            status: 'success'
        }
    } catch (err) {
        message = {
            message: err.message,
            status: 'error'
        }

    }
    insertAlerts(message).then(id => {
        Alert.findById({ _id: id }).then(msg => {
            io.emit('test', { msg })
        }).catch(err => {
            console.log(err.message)
        })
    }).catch(err => {
        console.log(err.message)
    })


}


//Upload json to mongo
router.post('/upload', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        const collectionName = req.body.name.split('.')[0]
        readings = await read(req.body.name)
        uploadAndNotify(readings, collectionName, req)
        return res.status(200).send('Upload to mongo started')
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
})

module.exports = router