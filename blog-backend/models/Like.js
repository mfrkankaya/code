const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
  userId: { required: true, type: Schema.Types.ObjectId },
  postId: { required: true, type: Schema.Types.ObjectId }
})

module.exports = mongoose.model('like', LikeSchema)
