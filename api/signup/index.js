'use strict';

const Ru = require('rutils/lib')
const B = require('bluebird')


const applyResendRoutes = require('./resend')




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


  const signupUser = ( req, res, next ) => {

      req.response = (
          req
          .response
          .then( () => {

              let { query, body, params, apiv2DbCONN } = req

              let {
                  email,
                  password,
                  firstName,
                  lastName,
                  clientId

              } = body

              let tokenScopeType = 'LOGED_IN'

              let hasExpirationDate = true

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
                          .createUser( apiv2DbCONN, spec )
                      )
                  })
                  .then( userId => {

                      return(
                          B
                          .all([
                              db
                              .getUserById( apiv2DbCONN, userId )
                              ,

                              getTokenGrants( apiv2DbCONN, tokenScopeType )
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
                              .createRefreshToken( apiv2DbCONN, refreshTokenSpec )
                              .then( refreshToken => {
                                  return(
                                      db
                                      .getTokenInfoById( apiv2DbCONN, refreshToken )
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




    router.post('/signup', signupUser)

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
