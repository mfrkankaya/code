require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verificationMail = require('./helpers/verificationMail')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* ------------------------------------ - ----------------------------------- */

/* ------------------------------ DB CONNECTION ----------------------------- */
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('open', () => console.log('Mongo Connected.'))
mongoose.connection.on('error', () => console.log('Mongo Failed.'))
mongoose.Promise = global.Promise

/* -------------------------------- DB MODELS ------------------------------- */
const User = require('./models/User')

/* ------------------------------ USER REGISTER ----------------------------- */
app.post('/register', function(req, res, next) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  const { username, password, email } = req.body
  if (!validator.isEmail(email)) res.send({ status: false, message: 'email/bad-format' })
  if (!passwordRegex.test(password)) res.send({ status: false, message: 'password/bad-format' })

  bcrypt.hash(password, 10).then(hash => {
    const user = new User({
      username,
      password: hash,
      email
    })

    const promise = user.save()
    promise
      .then(data => {
        verificationMail.send({ to: email })
        res.send({ status: true, data })
      })
      .catch(err => res.send({ status: false, message: err }))
  })
})

/* ------------------------------- USER LOGIN ------------------------------- */
app.post('/login', (req, res) => {
  const { username, password, email } = req.body
  const identifier = username || email

  User.findOne({ [username ? 'username' : 'email']: identifier }, (err, user) => {
    if (err) res.send({ status: false, message: err })
    if (!user) res.send({ status: false, message: 'user not found' })
    bcrypt.compare(password, user.password).then(result => {
      if (!result) res.send({ status: false, message: 'password is wrong' })
      if (!user.emailVerified) res.send({ status: false, message: 'email is not verified' })
      const payload = { username: user.username }
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 720 })
      res.send({ status: true, token })
    })
  })
})

app.get('/confirm', (req, res) => {
  const { token } = req.query
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) res.send({ status: false, message: 'Failed to authenticate token.' })
      if (decoded.email) {
        User.findOneAndUpdate({ email: decoded.email }, { emailVerified: true }).then(user =>
          res.send('Email adresiniz onaylandı.')
        )
      }
    })
  } else res.send({ status: false, message: 'No token provided.' })
})

app.listen(3000, () => console.log('Server is on.'))
