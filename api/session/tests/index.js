'use strict';

const Ru = require('rutils/lib');

const B = require('bluebird');

const mkApi = require('@addaps/addaps_client_api');

const jsc = require('jsverify');

let token = null;


const getToken = () => B.resolve(token);

const setToken = t => {
    token = t;
    return B.resolve()
};

let domain = 'htpp://localhost:4000';

let apiSpec = {
    getToken,
    setToken,

    domain
}

let api = mkApi( apiSpec );




describe( 'session resource test', () => {

    let endpoint = 'session';

    describe( 'POST /session', done => {

        let credentials = {
            email       : 'emilio@addaps.com',
            password    : "987"
        }

        return (
            api
            .post( credentials )
            .then( data => {


                jsc.assertForall(jsc.integer, jsc.integer, (a, b) => a + b === b + a)
            } )
            .then( done )
        )

    } )

})
