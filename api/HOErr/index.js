'use strict';


const mkErr = require('./ErrFactory');

const Ru = require('rutils');


const getDefaultSpec = Ru.defaultObjTo({
    errors: {},
});


// const addKeyToErrors = Ru.mapObjIndexed( (v,k,obj) => Ru.assoc('errorCode',k,v) );


const toCanonicalSpec = Ru.pipe(
    getDefaultSpec
    // Ru.evolve({
    //     errors: addKeyToErrors
    // })
)



const of = spec => {

    spec = toCanonicalSpec( spec );

    let Err = mkErr( spec );

    return Err;
}



const HOErr = {
    of,
}



module.exports = HOErr
