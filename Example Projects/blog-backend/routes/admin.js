const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

router.post('/post', async (req, res, next)=> {
  const { title, subtitle, content } = req.body
  const post = new Post({
    title,
    subtitle,
    content
  })

  try {
    const data = await post.save()
    res.send({ status: true, data })
  } catch (error) {
    res.send({ status: false, message: error })
  }
})

module.exports = router
