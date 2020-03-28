const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 22
  },
  password: {
    type: String
  },
  emailVerified: {
    default: false,
    required: true,
    type: Boolean
  }
})

module.exports = mongoose.model('user', UserSchema)
