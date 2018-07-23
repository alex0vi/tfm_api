'use strict'

require('app-module-path').addPath(__dirname)

const {
  apiConf,
  dbConf,
  //sendGridConf,
  authConf,
 // smtpConf
} = require('config')


const mkApi       = require('api')

const initServices  = require('services')


// console.log('apiConf::: ', apiConf)
// console.log('dbConf::: ', dbConf)
const initApi = mkApi( {
  conf: apiConf,
  services: initServices({
    dbConf,
    //sendGridConf,
    authConf,
    //smtpConf
  })
} )

initApi()
