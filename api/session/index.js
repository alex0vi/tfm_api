'use strict';


const Ru = require('rutils/lib')
const B = require('bluebird')




const applyRoute = spec => router => {
  let {
    services,
    conf
  } = spec

  let {
    auth,
    db,
    bl,
    emailer
  } = services

  let {
    rootViewsUrl
  } = conf

  const getSession = ( req, res, next ) => {

    req.response = (
      req
      .response
      .then( () => {

        let { body, apiDbCONN } = req

        let { email, password  } = body

        return (
          B.all([
            db
            .getUserByEmail( apiDbCONN, email )
            ,

            db
            .getLastEmailVerificationToken( apiDbCONN, email )
            ,
          ])
          .spread( (user, token) => {

            if ( Ru.isNil(user) ) {
              return (
                B
                .resolve(token)
                .then( Ru.when( Ru.isNil, () => B.reject('INVALID_EMAIL_OR_PASSWORD') ) )
                .then( auth.verifyToken )
                .then( tokenData => {

                    return (
                      auth
                      .compare( password , tokenData.password )
                      .then( samePwd => {

                          if ( !samePwd ) {
                            return B.reject('INVALID_EMAIL_OR_PASSWORD')
                          }

                          let verifyLink = `${rootViewsUrl}/verify?token=${token}`

                          let mailOptions = {
                            to: [ email ],
                            subject: 'Email not verify yet',
                            text: ` Hello ${ tokenData.firstName },
                              There has been an sign in attempt for Nation Pay platform using this account.
                              If this was you, please  click here to confirm your email address (${verifyLink})
                              If this was not you, don't worry and just ignore this email.
                            `,
                            textInHTML: bl.generateConfirmationWhenFailSignIn({
                              firstName: tokenData.firstName,
                              verifyLink: verifyLink
                            })
                          }

                          return (
                            emailer
                            .send(mailOptions)
                            .tap( x => console.log('x::: ', x))
                            .then( () => B.reject('EMAIL_NOT_VERIFIED') )
                          )
                      })
                    )
                })
              )
            }

            return user
          } )
          .then( user => {

            let hashedPassword = user.password
            let userId = user.id

            return (
              auth
              .compare( password , hashedPassword )
              .then( Ru.unless( Ru.I, falseValue => {

                let errorCode = 'INVALID_EMAIL_OR_PASSWORD'

                return B.reject(errorCode)
              }))
              .then( trueValue => {

                let userWithoutPassord = Ru.omit(['password'], user )

                let tokenObj = {
                  userId
                }

                return (
                  auth
                  .signToken( tokenObj )
                  .then( ( token ) => {

                    let response = {
                      data: {
                        initialData: {
                          user: userWithoutPassord
                        }
                      },
                      token
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

  router.post('/session', getSession )

  return router
}




const applyRoutes = spec => Ru.pipe(
  applyRoute(spec)
)


module.exports = applyRoutes
