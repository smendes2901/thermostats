const { mongoTableURI } = require('../config/keys')
const mongoose = require('mongoose')

const upload = async (data, name) => {
	await mongoose.connect(
		mongoTableURI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		async (err, db) => {
			if (err) throw new Error(err)
			const collection = db.collection(name)
			await collection.insertMany(data)
		}
	)
}

module.exports = {
	upload
}
