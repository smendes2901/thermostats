const express = require('express')
const passport = require('passport')
const router = express.Router()
const fs = require('fs')
const JSONStream = require('JSONStream')
const { epochToString, stringToEpoch } = require('../../utils/datetime')
const { upload } = require('../../utils/JSON')
const { insertAlerts } = require('../../utils/alerts')
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
router.post(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		try {
			const fileName = req.body.name
			const stream = fs.createReadStream('./data/' + fileName, {
				encoding: 'utf8'
			})
			const parser = JSONStream.parse('*')
			const record = {}
			const counter = {}

			stream.pipe(parser)

			parser.on('data', async obj => {
				const val = obj.val
				const ts = await epochToString(obj.ts)
				if (ts.startsWith('2015')) {
					if (Reflect.apply({}.hasOwnProperty, record, [ts])) {
						record[ts] += val
						counter[ts] += 1
					} else {
						record[ts] = val
						counter[ts] = 1
					}
				}
			})

			parser.on('close', async () => {
				const records = []
				for (const key in record) {
					if (Reflect.apply({}.hasOwnProperty, record, [key])) {
						const info = {}
						info.x = await stringToEpoch(key)
						info.y = record[key] / counter[key]
						records.push(info)
					}
				}
				return res.send(records)
			})
		} catch (err) {
			return res.status(400).send(err.message)
		}
	}
)

const uploadAndNotify = async (io, fileName, collectionName) => {
	const stream = fs.createReadStream('./data/' + fileName, {
		encoding: 'utf8'
	})
	const parser = JSONStream.parse('*')
	let records = []
	stream.pipe(parser)
	parser.on('data', async data => {
		records.push(data)
		if (records.length === 1000) {
			stream.pause()
			await upload(records, collectionName).then(() => {
				records = []
			})
			stream.resume()
		}
	})
	parser.on('close', async () => {
		//update the reamaining records to the database
		await upload(records, collectionName)
		let message = {
			message: fileName + ' Upload Successful',
			status: 'success',
			read: false
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
	})
}

//Upload json to mongo
router.post(
	'/upload',
	passport.authenticate('jwt', {
		session: false
	}),
	async (req, res) => {
		const io = req.app.get('socketio')
		const fileName = req.body.name
		const collectionName = fileName.split('.')[0]
		fs.exists('./data/' + fileName, (result) => {
			if (result === false) return res.status(400).send('File doesn\'t exist')
			uploadAndNotify(io, fileName, collectionName)
			return res.send('Upload has successfully started')
		})


	}
)

module.exports = router
