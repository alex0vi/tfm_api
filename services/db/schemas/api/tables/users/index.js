'use strict';

const Ru = require('rutils/lib');



const mk = (spec, db) => {

    let factories = [
        require('./users.js'),
    ]



    const go = Ru.pipe(
        Ru.map( mk => mk( spec, db  ) ),
        Ru.mergeAll
    );

    return go( factories )
}






module.exports = mk;
