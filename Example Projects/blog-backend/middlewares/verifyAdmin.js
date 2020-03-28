const jwt = require('jsonwebtoken')

const User = require('../models/User')

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) res.send({ status: false, message: 'Failed to authenticate token.' })
      else {
        User.findOne({ username: decoded.username }, (err, user) => {
          if (err) res.send({ status: false, message: 'Failed to authenticate token.' })
          if (!user) res.send({ status: false, message: 'User not found.' })
          if (user.type) {
            req.decode = decoded
            next()
          } else {
            res.send({ status: false, message: 'User is not authenticated.' })
          }
        })
      }
    })
  } else {
    res.send({ status: false, message: 'No token provided.' })
  }
}
