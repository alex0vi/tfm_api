'use strict'

const Ru = require('rutils/lib')

const _ = require('lodash')


const specWithDefaults = Ru.defaultObjTo({

})


const mk = specParam => {

    let spec = specWithDefaults( specParam );

    let db = {}


    let factories = [
        require('./schemas/index.js'),
    ]


    const go = Ru.pipe(
        Ru.map( mk => mk( spec, db  ) ),
        Ru.mergeAll
    )


    db = _.merge( db, go( factories ) )

    return db
}


//
//
//
// const dbSpec = conf.db;
//
//
//
// const db = mk( dbSpec );
//


module.exports = mk
