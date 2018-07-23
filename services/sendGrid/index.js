'use strict'

const Ru = require('rutils/lib')

const mkApi = require('./services/rest-api-js-client');

const snakeCaseKeysIfObj = Ru.pipe(
    Ru.cond([
        [ Ru.isPlainObj,                    Ru.snakeCaseKeys    ],
        [ Ru.T,                             Ru.I                ]
    ])
)

const mk = conf => {

  const api = mkApi({
    defaultSpec: {
      fetchSpec: {
        headers: {
          'Authorization': `Bearer ${conf.Key}`
        }
      }
    },
    rootUrl: conf.apiUrl,
    version: conf.version,
    versionUrl: n => `v${n}`,
    logger: true,
    xfInput: snakeCaseKeysIfObj
  })

  return Ru.mergeAll([
    api,
    conf.constants
  ])
}


module.exports = mk
