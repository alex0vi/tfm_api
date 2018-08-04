'use strict';

const Ru                = require('rutils/lib')

const B                 = require('bluebird')

const ApiErr            = require('../apiErr')

const apiU              = require('../utils')

const uuid              = require('uuid')

const applyRoute = spec => router => {
  let {
    services,
    conf
  } = spec

  let {
    auth,
    db,
    bl
  } = services

  let {
    rootViewsUrl
  } = conf

   console.log('applyRoute-session');

  const decodeClientId = code => {

      if ( !Ru.is( String, code ) ) {
          return {}
      }

      let [ encryptedStaticData, deviceAccountId ] = Ru.split( ':', code )

      let staticData = auth.decryptFromInternalEncryption( encryptedStaticData )

      try {
          var parsedStaticData = JSON.parse( staticData )
      } catch (e) {
          var parsedStaticData = null
      }

      let isParsedStaticDataAnObj = Ru.isPlainObj( parsedStaticData )

      if ( ( isParsedStaticDataAnObj && Ru.isEmpty( isParsedStaticDataAnObj ) ) || Ru.isNil( deviceAccountId ) ) {
          return {}
      }

      return {
          deviceType: parsedStaticData.deviceType,
          deviceAccountId
      }
  }



  const getTokenGrants = ( apiDbCONN, type ) => {

      return (
          db
          .getTokenGrants( apiDbCONN, type )
          .then( data => {

              let mpr = Ru.pipe(
                  Ru.pick(['urlPattern', 'httpMethod']),
                  Ru.values,
                  Ru.join('.')
              )

              return Ru.map( mpr, data )
          })
      )
  }

  const getSession = ( req, res, next ) => {

      req.response = (
          req
          .response
          .then( () => {

              let { query, body, params, apiDbCONN } = req

              let {
                  email,
                  password,
                  clientId,
              } = body

              let tokenScopeType = 'LOGED_IN'

              let hasExpirationDate = false

              let decodedClient = decodeClientId( clientId )

              if ( decodedClient.deviceType === 'MOBILE' ) {
                  hasExpirationDate = false
              }

              let spec = {
                  email,
                  password
              }

              if( !bl.validateEmail( email ) ){

                  let apiErr = ApiErr.of('INVALID_EMAIL_FORMAT', { email })
                  throw apiErr
              }

              return (

                  db
                  .getUserByEmail( apiDbCONN, email )

                  .then( user => {

                      let hashedPassword = user.password
                      let userId = user.id


                      if( Ru.isNil( hashedPassword ) ){

                          return B.reject( ApiErr.of('WRONG_CREDENTIALS') )
                      }

                      return (
                          B.all([
                              auth
                              .compare( password , hashedPassword )
                              .then( Ru.unless( Ru.identity, falseValue => {
                                  return B.reject( ApiErr.of('WRONG_CREDENTIALS') )
                              }))
                              ,

                              getTokenGrants(apiDbCONN, tokenScopeType)

                          ])
                          .spread( ( trueValue, scopes ) => {

                              let userWithoutPassord = Ru.omit(['password'], user )

                              let accessTokenExpTime = apiU.getAccessTokenExpTime()

                              let refreshTokenExpTime = apiU.getRefreshTokenExpTime()

                              let tokenObj = {
                                  userId,
                                  exp: apiU.date2AccessTokenFormat( accessTokenExpTime ),
                                  scopes
                              }


                              let expirationDate = hasExpirationDate ? apiU.date2RefreshTokenFormat( refreshTokenExpTime ) : null

                              let refreshTokenSpec = {
                                  id: uuid(),
                                  userId,
                                  expirationDate,
                                  userTokenScope  : tokenScopeType,
                                  deviceAccountId : decodedClient.deviceAccountId,
                              }

                              return (
                                  B
                                  .all([
                                      auth
                                      .signToken( tokenObj )
                                      ,

                                      B
                                      .resolve( Ru.isNil( clientId ) || Ru.isEmpty( decodedClient ) )
                                      .then( isClientIdMissing => {
                                          return (
                                              isClientIdMissing ?
                                                  db
                                                  .revokeOrphanRefreshTokens( apiDbCONN, userId ) :
                                                  B
                                                  .all([
                                                      db
                                                      .revokeRefreshTokens( apiDbCONN, { userId, deviceAccountId : decodedClient.deviceAccountId } )
                                                      ,
                                                      db
                                                      .revokeOrphanRefreshTokens( apiDbCONN, userId )
                                                  ])
                                          )
                                      })
                                      .then( () => {
                                          return (
                                              db
                                              .createRefreshToken( apiDbCONN, refreshTokenSpec )
                                              .then( refreshToken => {
                                                  return(
                                                      db
                                                      .getTokenInfoById( apiDbCONN, refreshToken )
                                                      .then( Ru.prop('version') )
                                                      .then( version => [ refreshToken, version ] )
                                                  )
                                              })
                                          )
                                      })
                                  ])
                                  .spread( ( accessToken, [ refreshToken, version ] ) => {

                                      let response = {
                                          data: {
                                              initialData: {
                                                  user: userWithoutPassord
                                              },
                                              accessToken,
                                              refreshToken,
                                              version
                                          }
                                      }

                                      return Ru.K( response )
                                  } )
                              )
                          } )

                      )

                  } )
              )
          } )
      )

      return(
          B.resolve( req.response )
          .then( () => next() )
          .catch( () => next() )
      )
  }


  const getSessionInGuestMode = (req, res, next) => {

      req.response = (
          req
          .response
          .then( () => {
              let { query, body, params, apiDbCONN } = req

              let tokenScopeType = 'GUEST'

              return (
                  getTokenGrants( apiDbCONN, tokenScopeType )
                  .then( scopes => {

                      let tokenObj = {
                          scopes: scopes
                      }

                      return(
                          auth
                          .signToken( tokenObj )
                          .then( accessToken => {

                              let response = {
                                  accessToken,
                                  refreshToken: null
                              }

                              return  response
                          })
                      )
                  })
              )
          })
      )

      return(
          B.resolve( req.response )
          .then( () => next() )
          .catch( () => next() )
      )
  }

  router.post('/session',
        apiU.mkFormatValidation('schemas/entities/session/definitions/post/entities/canonic/index.json'),
        getSession
  )

  router.get('/guest_mode_session', getSessionInGuestMode )

  return router
}




const applyRoutes = spec => Ru.pipe(
  applyRoute(spec)
)


module.exports = applyRoutes
