'use strict';

const Ru = require('rutils')

const B = require('bluebird')

const { assert } = require('chai')

const mkApi = require('@addaps/addaps_client_api')

const apiU = require('api/utils')

//VALIDATE SCHEMAS
const validateErrorSchema = apiU.mkCompileSchema('schemas/entities/data/definitions/error.json')

const validateSessionSchema = apiU.mkCompileSchema('schemas/entities/session/definitions/get/entities/canonic/index.json')

const validateGuestSessionSchema = apiU.mkCompileSchema('schemas/entities/session/definitions/get/entities/guest/index.json')

let token = null

let { rootUrl } = require('api/_tests/fixtures/config.json')

const getToken = () => B.resolve(token)

const setToken = t => {
    token = t;
    return B.resolve()
};

let api = mkApi( {
    getAccessToken: () => B.resolve( token ),
    setAccessToken: t => {
        token = t;
        return B.resolve()
    } ,
    domain: rootUrl
} )

let {
    WRONG_CREDENTIALS,
    RESOURCE_NOT_FOUND,
    UNSUPPORTED_ERROR
 }   = require('api/_tests/fixtures/errors.json')

let { emailCredentials, fbCredentials } = require('./fixtures/credentials.json')

let wrongCredentials = require('./fixtures/wrongCredentials.json')

let someId = "111111x"

const initSessionTesting = () => {

    //EMAIL SESSION
    describe( 'SESSION Email', () => {
        it('POST api/session Successful', done => {
            api
            .post( "session", emailCredentials )
            .then( data => {

                const isValid = validateSessionSchema(data)

                assert.isTrue(isValid, JSON.stringify(validateSessionSchema.errors, null, 1))
            })
            .then( done )
            .catch( done )
        })
        .timeout(3000)

        it('POST api/session WRONG_CREDENTIALS', done => {
            api
            .post( "session", wrongCredentials )
            .catch( err => {

                const isValid = validateErrorSchema(err)
                //ERROR NO NULL
                assert.notEqual(err, null)
                //VALIDATE ERROR SCHEMA
                assert.isTrue(isValid, JSON.stringify(validateErrorSchema.errors, null, 1))
                //CHECK ERROR CODE FOR THIS SPECIFIC CASE
                assert.equal(err.code, WRONG_CREDENTIALS)

                done()
            })
            .catch( done )
        })

        it('POST api/session/<something> RESOURCE_NOT_FOUND', done => {
            api
            .post( 'session/'+someId, emailCredentials )
            .catch( err => {

                const isValid = validateErrorSchema(err)
                //ERROR NO NULL
                assert.notEqual(err, null)
                //VALIDATE ERROR SCHEMA
                assert.isTrue(isValid, JSON.stringify(validateErrorSchema.errors, null, 1))
                //CHECK ERROR CODE FOR THIS SPECIFIC CASE
                assert.equal(err.code, RESOURCE_NOT_FOUND)

                done();
            })
            .catch( done );
        })
    })

    //SESSION FACEBOOK
    // describe( 'SESSION Facebook', () => {
    //     it('POST api/v2/session/facebook Successful', done => {
    //         api
    //         .post( "session/facebook", fbCredentials )
    //         .then( data => {
    //
    //             const isValid = validateSessionSchema(data)
    //
    //             assert.isTrue(isValid, JSON.stringify(validateSessionSchema.errors, null, 1))
    //         })
    //         .then( done )
    //         .catch( done )
    //     })
    //
    //     it('POST api/v2/session/facebook UNSUPPORTED_ERROR', done => {
    //         api
    //         .post( 'session/facebook', { "authToken": "lol", "clientId": "TESTING-DEVICE" } )
    //         .catch( err => {
    //
    //             const isValid = validateErrorSchema(err)
    //             //ERROR NO NULL
    //             assert.notEqual(err, null)
    //             //VALIDATE ERROR SCHEMA
    //             assert.isTrue(isValid, JSON.stringify(validateErrorSchema.errors, null, 1))
    //             //CHECK ERROR CODE FOR THIS SPECIFIC CASE
    //             assert.equal(err.code, UNSUPPORTED_ERROR)
    //
    //             done()
    //         })
    //         .catch( done )
    //     })
    //
    //     it('POST api/v2/session/facebook/<something> RESOURCE_NOT_FOUND', done => {
    //         api
    //         .post( 'session/facebook/'+someId, fbCredentials )
    //         .catch( err => {
    //
    //             const isValid = validateErrorSchema(err)
    //             //ERROR NO NULL
    //             assert.notEqual(err, null)
    //             //VALIDATE ERROR SCHEMA
    //             assert.isTrue(isValid, JSON.stringify(validateErrorSchema.errors, null, 1))
    //             //CHECK ERROR CODE FOR THIS SPECIFIC CASE
    //             assert.equal(err.code, RESOURCE_NOT_FOUND)
    //
    //             done()
    //         })
    //         .catch( done )
    //     })
    // })

    //SESSION GUESTMODE
    describe( 'SESSION Guest mode', () => {
        it('GET api/guest_mode_session Successful', done => {
            api
            .get( "guest_mode_session" )
            .then( data => {

                const isValid = validateGuestSessionSchema(data)

                assert.isTrue(isValid, JSON.stringify(validateGuestSessionSchema.errors, null, 1))
            })
            .then( done )
            .catch( done )
        })
    })
}

module.exports = initSessionTesting
