'use strict'

const Ru  = require('rutils/lib')
const B   = require('bluebird')

const ApiErr = require('./apiErr');


const mk = conf => {

    const interpretResponseFn = Ru.curry( (req, res, responsefnFromProm) => {

        const go = Ru.cond([
            [ Ru.is( Function ),   Ru.call ],
            [ Ru.T,                response => res.send( response )],
        ]);


        return go( responsefnFromProm )
    })


    const interpretResponse = Ru.curry( (req, res, responseFromProm) => {

        const go = Ru.cond([
            [ Ru.is( Function ),   Ru.compose(interpretResponseFn(req, res), Ru.call )],
            [ Ru.T,                () => res.send( Ru.objOf('data' ,responseFromProm) ) ],
        ]);

        return go( responseFromProm )
    })




    const sendResponseMidleware = (req, res, next) => {


        if( !Ru.isNil(req.response) ){

            return(
                req
                .response
                .then( interpretResponse(req, res) )
                .catch( interpretResponse(req, res) )
            )


            // return (
            //     req
            //     .response
            //     .then( response => res.send( interpretResponsePromise( response ) ) )
            //     .catch( response => res.send( interpretResponsePromise( response ) ) )
            // )
        }

    };




    const isNotFoundResponse = Ru.allPass([
        Ru.is( Function ),
        Ru.compose( Ru.isNil, Ru.call )
    ]);

    const isUnsupportedResponse = Ru.is( Error );



    const handleErrorsMidleware = (req, res, next) => {



        if( !Ru.isNil(req.response) ){
            req.response = (
                req
                .response
                .then( Ru.when( isNotFoundResponse, () => B.reject(ApiErr.of('RESOURCE_NOT_FOUND') ) ) )
                .catch( (err) => {

                    let apiErr = null;

                    if( isUnsupportedResponse(err) ){
                        console.log('UNSUPPORTED_ERROR err', err)
                        apiErr = ApiErr.of('UNSUPPORTED_ERROR');
                    }

                    else{
                        apiErr = err;
                    }

                    throw apiErr
                } )
                .catch( apiErr => {


                    let { httpCode } = apiErr;

                    console.log('httpCode', httpCode)

                    if( Ru.isNotNil( httpCode ) ){
                        res.status(httpCode)
                    }

                    throw apiErr
                } )
            )
        }

        return(
          B.resolve( req.response )
          .then( () => next() )
          .catch( () => next() )
        )
    };




    const releaseDbCONNs = (req, res, next) => {

        let {
            apiDbCONN,
            apiDbPool

        } = req;



        return (
              B
              .resolve(apiDbCONN)
              .then( Ru.unless( Ru.isNil , CONN => CONN.releaseEnh() ) )
              .then( apiDbCONNReleaseRes => {
                next()
              } )
            )
    };



    const applyMidlewares = app => {

        app.use( releaseDbCONNs )

        app.use( handleErrorsMidleware  )
        app.use( sendResponseMidleware  )



        return app
    }

    return applyMidlewares
}


module.exports = mk
