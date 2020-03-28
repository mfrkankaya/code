const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const URL = 'http://localhost:3000'

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILER_ADRESS,
    pass: process.env.MAILER_PASSWORD
  }
})

const send = ({ to }) => {
  const token = jwt.sign({ email: to }, process.env.JWT_SECRET_KEY, {
    expiresIn: 1440
  })

  const mailOptions = {
    from: 'mfurkankayablog@gmail.com',
    to,
    subject: 'E-mail onaylama',
    text: `${URL}/confirm?token=${token}`
  }

  transporter.sendMail(mailOptions, () => null)
}

module.exports = {
  send
}
