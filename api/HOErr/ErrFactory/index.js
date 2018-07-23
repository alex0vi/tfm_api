'use strict';


const Ru = require('rutils');



const interpretSpecialKey = Ru.curry((value, payload) => {

    const go = Ru.cond([
        [ Ru.is( String ),     Ru.I ],
        [ Ru.is( Function ) ,  Ru.applyTo(payload) ],
        [ Ru.T,                d => { throw 'WRONG_VALUE_IN_ERRORS' } ],
    ]);

    return go( value )
});


const rawErrToErr = ( rawErr, payload ) => {

    let rawErrKVPairs = Ru.toPairs( rawErr );

    // const chaining = pair => {
    //
    //     let [ k, v ] = pair;
    //
    //     return Ru.startsWith('_',k) ? [ pair, [Ru.tail(k), interpretSpecialKey(v, payload)]] : [pair]
    // };

    const mapping = pair => {

        let [ k, v ] = pair;

        let newPair = Ru.startsWith('_',k) ? [Ru.tail(k), interpretSpecialKey(v, payload)] : pair;

        return newPair
    }

    let errKVPairs = Ru.map( mapping, rawErrKVPairs );

    let err = Ru.fromPairs( errKVPairs );

    err = Ru.assoc('payload', payload, err);

    return err;
}


const mkErr = spec => {

    let {
        errors,
        unsupportedError

    } = spec;


    let of = (errorCode, payload) => {

        if( !Ru.is( String, errorCode ) ){
            errorCode = unsupportedError;
        }

        let rawErr = errors[ errorCode ];

        if( Ru.isNil( rawErr ) ){
            throw 'WRONG_ERROR_CODE';
        }

        payload = Ru.defaultTo( {}, payload );

        let err = rawErrToErr( rawErr, payload );

        return err;
    }


    let Err = {
        of,
    };

    return Err;
}




module.exports = mkErr;
