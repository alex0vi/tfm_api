'use strict'

const apiConf       = require('config/api.json')
const dbConf        = require('config/db.json')
const authConf      = require('config/auth.json')
const Ru            = require('rutils/lib')

const isProd = process.env.NODE_ENV && (
      Ru.toLower(process.env.NODE_ENV) === 'prod'
  ||  Ru.toLower(process.env.NODE_ENV) === 'production'
)


// console.log('process.env.NODE_ENV:::', process.env.NODE_ENV);



module.exports = {
  apiConf :   isProd ? apiConf.production  : apiConf.development,
  dbConf  :   isProd ? dbConf.production   : dbConf.development,
  authConf: authConf,
}
