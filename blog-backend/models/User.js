const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 22
  },
  password: {
    type: String,
    required: true
  },
  type: {
    required: true,
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('user', UserSchema)
