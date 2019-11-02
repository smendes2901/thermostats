//Loading Alerts module
const Alert = require('../models/Alert')

const featchAllUnreadAlerts = async () => {
	const result = await Alert.find({
		read: false
	})
	return result
}

const insertAlerts = async (alertMessage) => {
	const result = await Alert.insertMany(alertMessage)
	return result[0]._id
}

module.exports = {
	featchAllUnreadAlerts,
	insertAlerts
}