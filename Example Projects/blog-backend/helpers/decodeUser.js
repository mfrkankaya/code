const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = req =>
  new Promise(resolve => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) resolve(false)
        else {
          User.findOne({ username: decoded.username }, (err, user) => {
            if (err) resolve(false)
            if (!user) resolve(false)
            resolve({ username: decoded.username, id: user._id })
          })
        }
      })
    } else resolve(false)
  })
