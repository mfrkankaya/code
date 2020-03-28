const express = require('express')
const router = express.Router()
const decodeUser = require('../helpers/decodeUser')

const Like = require('../models/Like')
const Post = require('../models/Post')

router.post('/', async (req, res, next) => {
  const user = await decodeUser(req)
  const { postId } = req.body
  const { id: userId } = user

  const like = async () => {
    const likeObject = new Like({
      userId,
      postId
    })

    try {
      const data = await likeObject.save()
      await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } })
      res.send({ status: true, message: 'liked' })
    } catch (error) {
      res.send({ status: false, message: error })
    }
  }

  const unlike = async likeId => {
    try {
      await Like.findByIdAndRemove(likeId)
      await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } })
      res.send({ status: true, message: 'unliked' })
    } catch (error) {
      res.send({ status: false, message: 'An error occureds.' })
    }
  }

  Like.findOne({ postId, userId }, (err, data) => {
    if (err) res.send({ status: false, message: 'An error occured.' })
    else {
      if (data) unlike(data._id)
      else like()
    }
  })
})

module.exports = router
