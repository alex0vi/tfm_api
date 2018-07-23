'use strict'

const mkEmailer = require('./index.js')

const stmpConf = require('../../config/smtp.json')

const emailer = mkEmailer( stmpConf )

emailer
.send({
  to: [ 'dondanidang@gmail.com' ],
  subject: 'You nail it',
  text: 'Hello daniel',
  textInHTML: '<b>Hello daniel</b>'
})
.then( x => console.log('Success::: ', x))
.catch( x => console.log('Error::: ', x))
