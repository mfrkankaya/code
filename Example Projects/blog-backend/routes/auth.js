const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/register', (req, res, next) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  const { username, password } = req.body
  if (!username || !password) res.send({ status: false, message: 'empty fields' })
  else {
    if (!passwordRegex.test(password)) res.send({ status: false, message: 'password/bad-format' })
    else {
      User.findOne({ username }, (err, user) => {
        if (err) res.send({ status: false, message: 'error occured' })
        if (user) res.send({ status: false, message: 'username already exists' })
        else {
          bcrypt.hash(password, 10).then(async hash => {
            const user = new User({
              username,
              password: hash
            })

            try {
              const data = await user.save()
              const payload = { username }
              const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
              res.send({ status: true, token })
            } catch (error) {
              res.send({ status: false, message: error })
            }
          })
        }
      })
    }
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) res.send({ status: false, message: 'empty fields' })
  else {
    User.findOne({ username }, (err, user) => {
      if (err) res.send({ status: false, message: err })
      if (!user) res.send({ status: false, message: 'user not found' })
      else {
        bcrypt.compare(password, user.password).then(result => {
          if (!result) res.send({ status: false, message: 'password is wrong' })
          else {
            const payload = { username: user.username }
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
            res.send({ status: true, token })
          }
        })
      }
    })
  }
})

module.exports = router
