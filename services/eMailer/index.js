'use strict'

const C = require('config/constants.json')

const nodemailer = require('nodemailer')

const B = require('bluebird')

const Ru = require('rutils/lib')

const mk = conf => {

  let {
    hostname,
    username,
    password,
    port
  } = conf

  let transporter = nodemailer.createTransport(
    {
      host: hostname,
      port,
      secure: port === 465 ? true : false,
      auth: {
        user: username,
        pass: password
      }
    },
    {
      from: C.CONTACT_EMAIL
    }
  )

  const send = spec => new B((resolve, reject) => {
    let {
      to,
      subject,
      text,
      textInHTML,
      attachments
    } = spec

    let mailOptions = {
      to: Ru.join(',', to),
      subject,
      text,
      html: textInHTML,
      attachments
    }

    return transporter.sendMail( mailOptions, ( err, info ) => {
      if ( err ) {
        return reject(err)
      }

      resolve(info)
    })

  })

  return {
    send
  }

}


module.exports = mk
