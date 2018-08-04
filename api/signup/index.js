'use strict';

const Ru                = require('rutils/lib')

const B                 = require('bluebird')

const ApiErr            = require('../apiErr')

const apiU              = require('../utils')

const applyResendRoutes = require('./resend')

const uuid              = require('uuid')


const applyRoute = spec => router => {

  let {
    services,
    conf
  } = spec

  let {
    auth,
    bl,
    db,
    emailer
  } = services

  let {
    rootViewsUrl
  } = conf

  console.log('applyRoute-signup');

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

  const signupUser = ( req, res, next ) => {

      req.response = (
          req
          .response
          .then( () => {

              let { query, body, params, apiDbCONN } = req

              let {
                  email,
                  password,
                  firstName,
                  lastName,
                  clientId

              } = body

              let tokenScopeType = 'LOGED_IN'

              let hasExpirationDate = false

              let decodedClient = decodeClientId( clientId )

              if ( decodedClient.deviceType === 'MOBILE' ) {
                  hasExpirationDate = false
              }

              return (
                  auth
                  .hash( password )
                  .then( hashedPassword =>  {

                      if( !bl.validateEmail( email ) ){

                          let apiErr = ApiErr.of('INVALID_EMAIL_FORMAT')
                          throw apiErr;
                      }


                      let spec = {
                          email,
                          hashedPassword,
                          firstName,
                          lastName
                      }

                      return (
                          db
                          .createUser( apiDbCONN, spec )
                      )
                  })
                  .then( userId => {
                      return(
                          B
                          .all([
                              db
                              .getUserDataById( apiDbCONN, userId )
                              ,

                              getTokenGrants( apiDbCONN, tokenScopeType )
                          ])
                      )
                  })
                  .spread( ( user, scopes ) => {

                      let userId = user.id

                      let userWithoutPassord = Ru.omit(['password'], user )

                      let tokenObj = {
                          userId,
                          exp: apiU.getAccessTokenExpTimeFormated(),
                          scopes
                      }

                      let expirationDate = hasExpirationDate ? apiU.getRefreshTokenExpTimeFormated(): null

                      let refreshTokenSpec = {
                          id: uuid(),
                          userId,
                          expirationDate,
                          userTokenScope  : tokenScopeType,
                          deviceAccountId : decodedClient.deviceAccountId,
                      }

                      return (
                          B.all([
                              auth
                              .signToken( tokenObj )
                              ,

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
                          })
                      )
                  })
                  .catch(  err => {

                      if( err.code === 'ER_DUP_ENTRY' ){

                          let apiErr = ApiErr.of('EMAIL_DUPLICATE')
                          throw apiErr
                      }

                      throw err
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




    router.post('/signup',
        apiU.mkFormatValidation('schemas/entities/signUp/definitions/post/entities/email/index.json'),
        signupUser
    )

    return router
}




const applyChildrenRoutes = spec => Ru.pipe(
    applyResendRoutes(spec)
);



const applyRoutes = spec => Ru.pipe(
  applyChildrenRoutes(spec),
  applyRoute(spec)
);


module.exports = applyRoutes
