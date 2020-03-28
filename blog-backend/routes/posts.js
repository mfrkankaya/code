const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.get('/', async (req, res, next) => {
  const { page, seed } = req.query
  const p = parseInt(page)
  const s = parseInt(seed)
  Post.find({}, (err, data) => {
    res.send(data)
  })
    .sort({ date: -1 })
    .skip(p * s)
    .limit(s)
})

router.get('/:postId', async (req, res, next) => {
  const { postId } = req.params
  try {
    const result = await Post.findById(postId)
    Post.findByIdAndUpdate(postId, { $inc: { views: 1 } }, (err, post) => {
      if (err) res.send({ status: false, message: err })
      if (!post) res.send({ status: false, message: 'Post not found.' })
      else res.send({ status: true, post })
    })
  } catch (error) {
    res.send({ status: false, message: 'Post not found.' })
  }
})

module.exports = router
