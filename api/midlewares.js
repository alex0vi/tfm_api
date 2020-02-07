'use strict';


const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const Ru = require('rutils/lib');

const morgan = require('morgan');
const cors = require('./cors.js')
const B = require('bluebird');


const favicon   = require('serve-favicon')
const ApiErr = require('./apiErr')

const pathToRegex = require('path-to-regexp')

// const db = require('services/db')


const mk = conf => {
  let {
    auth,
    db
  } = conf



  const someSignupRequest     = ( url, m ) => Ru.startsWith('/api/signup', url);

  const someSessionRequest    = ( url, m ) => Ru.startsWith('/api/session', url)

  const isGetSessionInGuestMode = ( url, m ) => url ==='/api/guest_mode_session' && m === 'GET';

  const isGenerateToken = ( url, m ) => Ru.startsWith('/api/token', url) && m === 'POST'

  const isDocs = ( url, m ) => Ru.startsWith('/api/docs', url);


  const noTokenNeeded = Ru.anyPass([
      someSessionRequest,
      someSignupRequest,
      isGetSessionInGuestMode,
      isGenerateToken,
      isDocs

  ])


  let possibleKeys = ['userId', 'sub'];


  //Just until the php old api lives
  const getUserId = Ru.pipe(
      Ru.props( possibleKeys ),
      Ru.reject( Ru.isNil ),
      Ru.head,
      Number
  );


  const processToken = token => {
      return (
          auth
          .verifyToken( token )
          .then( tokenObj => {

              let userId = tokenObj.userId || tokenObj.Addaps.userId;

              let tokenData = Ru.assoc('userId', userId, tokenObj );

              return tokenData
          } )
      )
  }


  const decodeTokenWhenValid = token => {
      return (
          auth
          .verifyToken( token )
          .then( tokenObj => {

              let userId = tokenObj.userId || ( tokenObj.Addaps && tokenObj.Addaps.userId )

              let tokenData = Ru.assoc('userId', userId, tokenObj )

              return tokenData
          } )
      )
  }

  const isAuththorized = Ru.curry( ( endpointData, scopes ) => {

      let {
          url,
          httpMethod
      } = endpointData


      const isRequestedUrl = urlPattern => Ru.isNotNil( pathToRegex( `/api${ urlPattern }` ).exec( url ) )

      for( let s of scopes) {

          let sColl = Ru.split('.', s)

          let sUrlPattern = Ru.join( '.', Ru.init( sColl ) )

          let sHttpMethod = Ru.last( sColl )

          if ( httpMethod === sHttpMethod &&  isRequestedUrl( sUrlPattern ) ) {
              return true
          }
      }

      return false
  })


  const getUrlPath = Ru.pipe(
      Ru.split('?'),
      Ru.head
  )

  const tokenMiddleware = ( req, res, next ) => {

      let { url, method:httpMethod } = req

      if ( noTokenNeeded( url, httpMethod ) ) {
          return next()
      }


      let authorization = Ru.defaultTo( '', req.get( 'Authorization' ) )

      if ( !Ru.startsWith( 'Bearer ', authorization ) ) {

          console.log(ApiErr.of);
          return res.send( ApiErr.of( 'ACCESS_TOKEN_MALFORMED' ) )
      }


      let token = Ru.last( Ru.split( ' ', authorization ) )

      return (
          decodeTokenWhenValid( token )
          .then( tokenData => {
              let { scopes } = tokenData

              let s = {
                  url: getUrlPath(url),
                  httpMethod
              }

              if ( !isAuththorized( s , scopes ) ) {
                  return B.reject({ name: 'ACCESS_TOKEN_UNAUTHORIZED' })
              }

              req.tokenData = tokenData

              req.token = token

              next()

          })
          .catch( err => {

              console.log('***************err*********************', err )

              let apiErr = ApiErr.of( 'ACCESS_TOKEN_UNKNOW_ERROR' )

              // UNAUTHORIZED error
              if ( err.name === 'ACCESS_TOKEN_UNAUTHORIZED') {
                  apiErr = ApiErr.of( 'ACCESS_TOKEN_UNAUTHORIZED' )
              }

              // TIMESTAMP error
              if ( err.name === 'TokenExpiredError') {
                  apiErr = ApiErr.of( 'ACCESS_TOKEN_EXPIRED' )
              }

              // INVALID error
              if ( err.name === 'JsonWebTokenError') {
                  apiErr = ApiErr.of( 'ACCESS_TOKEN_INVALID' )
              }

              let { httpCode } = apiErr

              res.status( httpCode )

              let response = { data: apiErr }

              res.send( response )
          } )
      )
  }



  const initResponseMiddleware = (req, res, next) => {

      req.response = B.resolve( Ru.K( null ) );
      next()
  }


  const url = require('url');



  const toUrlList = str => {


      let h = Ru.head( str );
      let l = Ru.last( str );

      if( h === '[' && l === ']' ){

          let midleStr = String(Ru.tail( Ru.init( str ) ));

          let strArr = Ru.split(',', midleStr );

          return Ru.reject(Ru.isEmpty, strArr)
      }

      return null;
  }


  const toUrlBool = Ru.cond([
      [ Ru.eq('true'),             Ru.K( true )  ],
      [ Ru.eq(''),                 Ru.K( true ) ],
      [ Ru.eq('false'),            Ru.K( false ) ],
      [ Ru.T,                      Ru.K( null )  ],
  ])


  const parseQsValues = v => {


      let vUrlList = toUrlList( v );

      if( Ru.is( Array, vUrlList )  ){
          return vUrlList
      }

      let vUrlBool = toUrlBool( v );

      if( Ru.is( Boolean, vUrlBool )  ){
          return vUrlBool
      }

      let vNum = Number( v );

      if( !isNaN( vNum ) ){
          return vNum
      }

      let vStr = String( v );

      if( Ru.is( String , vStr ) ){
          return vStr
      }

      return v
  }


  const parseObjValues = Ru.o( JSON.parse, decodeURIComponent )

  const parseQs = Ru.cond([
      [ Ru.o( Ru.startsWith( '_' ), Ru.prop( 'key' ) )    , Ru.o( parseObjValues, Ru.prop( 'val' ) ) ],
      [ Ru.T                                              , Ru.o( parseQsValues, Ru.prop( 'val' ) ) ]
  ])

  const customQsParser = (req, res, next) => {

      const mpr = ( val, key ) => parseQs({ val, key })

      req.query = Ru.mapObjIndexed(mpr, req.query );

      next()
  }



  const injectDbPools = ( req, res, next ) => {

   req.apiDbPool = db.getApiDbPool()

   next()
 }








  const noDbConnNeeded = Ru.anyPass([
      isDocs
  ]);



  const injectDbCONNs = ( req, res, next ) => {

      let {
        apiDbPool

      } = req

      let { url, method } = req;

      if( noDbConnNeeded(url, method) ){

          return(
              B
              .resolve()
              .then( () => next() )
          )
      }




    return (
      apiDbPool
      .getConnectionEnh()
      .then( apiDbCONN => {

        req.apiDbCONN     = apiDbCONN

        next()
      })
    )

  }

  const logRequest = (req, res, next) => {

      let { url, method, tokenData } = req

      let userId = tokenData && tokenData.userId

      console.log(method, url)
      console.log('userId: ', userId)
      console.log('----')

      next()
  }


  const applyMiddlewares = app => {

      app.use( initResponseMiddleware )
      app.use( tokenMiddleware )

      app.use( logRequest )

     // app.use( customQsParser )

      app.use( injectDbPools )
      app.use( injectDbCONNs )

      // app.use( dbConnMiddleware )

      app.use('/api/docs', express.static( 'documentation/build' ) )

      app.use( morgan('combined') )
      app.use(bodyParser.json())
      app.use(bodyParser.text({type: 'text/plain', limit: '1000mb' }))

      app.all("*", cors);

      return app
  }

  return applyMiddlewares

}






module.exports = mk
