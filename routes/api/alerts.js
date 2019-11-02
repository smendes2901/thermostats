const express = require('express')
const router = express.Router()
const passport = require('passport')
const {featchAllUnreadAlerts, insertAlerts} = require('../../utils/alerts')

// Load readings model...
const Alert = require('../../models/Alert')

//Get all unread alerts
router.get(
	'/',
	passport.authenticate('jwt', {
		session: false,
	}),
	async (req, res) => {
		featchAllUnreadAlerts()
			.then(alerts => {
				return res.status(200).json(alerts)
			})
			.catch(() => {
				return res.status(400).send('Failed to fetch notifications')
			})
	}
)

//Insert new alerts and reveive id
router.post(
	'/',
	passport.authenticate('jwt', {
		session: false,
	}),
	async (req, res) => {
		insertAlerts(req.body)
			.then(id => {
				return res.status(200).send(id)
			})
			.catch(err => {
				return res.status(400).send(err.message)
			})
	}
)

//Update alerts based on _id array
router.post(
	'/update',
	passport.authenticate('jwt', {
		session: false,
	}),
	async (req, res) => {
		Alert.updateMany(
			{
				_id: {$in: req.body.idArray},
			},
			req.body.replace
		)
			.then(() => {
				res.status(200).send('Done')
			})
			.catch(err => {
				res.status(400).json(err.message)
			})
	}
)
module.exports = router
