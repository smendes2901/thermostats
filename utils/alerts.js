//Loading Alerts module
const Alert = require('../models/Alert')

const featchAllUnreadAlerts = async () => {
    try {
        const result = await Alert.find({ read: false })
        return result
    } catch (err) {
        throw err
    }

}

const insertAlerts = async (alertMessage) => {
    try {
        const result = await Alert.insertMany(alertMessage)
        return result[0]._id
    } catch (err) {
        throw err
    }
}

module.exports = {
    featchAllUnreadAlerts,
    insertAlerts
}