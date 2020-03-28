const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('open', () => console.log('Mongo Connected.'))
  mongoose.connection.on('error', () => console.log('Mongo Failed.'))
  mongoose.Promise = global.Promise
}
