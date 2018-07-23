'use strict'


const initServices = conf => {

    const mkBl              =      require('services/bl')
    const mkDb              =      require('services/db')
    const mkAuth            =      require('services/auth')

    const {
        dbConf,
        authConf,
    } = conf


    const bl =  mkBl()

    const auth = mkAuth( authConf )

    const db = mkDb( dbConf )

    return {
        bl,
        db,
        auth
    }
}

module.exports = initServices
