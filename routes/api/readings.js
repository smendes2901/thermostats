const express = require('express')
const passport = require('passport')
const router = express.Router()
const fs = require('fs')
const JSONStream = require('JSONStream')
const {
    epochToString,
    stringToEpoch
} = require('../../utils/datetime')
const {
    read,
    upload
} = require('../../utils/JSON')
const {
    insertAlerts
} = require('../../utils/alerts')

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
    try {
        const stream = fs.createReadStream('./data/' + req.body.name, {
            encoding: 'utf8'
        })
        const parser = JSONStream.parse('*');
        const record = {}

        stream.pipe(parser);

        parser.on('data', async (obj) => {
            const val = obj.val
            const ts = await epochToString(obj.ts)
            if (ts.startsWith('2015')) {
                if (Reflect.apply({}.hasOwnProperty, record, [ts])) {
                    record[ts] += val
                } else {
                    record[ts] = val
                }
            }
        });

        parser.on('close', async () => {
            const records = []
            for (const key in record) {
                if (Reflect.apply({}.hasOwnProperty, record, [key])) {
                    const info = {}
                    info.x = await stringToEpoch(key)
                    info.y = record[key]
                    records.push(info)
                }
            }
            return res.send(records)
        })
    } catch (err) {
        return res.status(400).send(err)
    }

})

const uploadAndNotify = async (data, name, req) => {
    //get the attached socket listner instance
    const io = req.app.get('socketio')
    //create a message to be sent by the socket
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
        //update the alerts table once the upload fails/succeeds
        Alert.findById({
            _id: id
        }).then(msg => {
            //on successful update send the message via socket to client
            io.emit('test', {
                msg
            })
        }).catch(err => {
            //console.log error message
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
        //split file name based on '.' and extract the name to be used as collectionName
        const collectionName = req.body.name.split('.')[0]
        const readings = await read(req.body.name)
        //Upload json and notify user asynchronously
        uploadAndNotify(readings, collectionName, req)
        //Notify user on successful initiation of upload
        return res.status(200).send('Upload to mongo started')
    } catch (err) {
        return res.status(400).send(err.message)
    }
})

module.exports = router