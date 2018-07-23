
'use strict'
const Ru  = require('rutils/lib')
const B   = require('bluebird')



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

  const resendEmailVerification = (req, res, next) => {

    req.response = (
      req
      .response
      .then( () => {


        let { params, apiDbCONN } = req

        let { email } = params

        if( !bl.validateEmail( email ) ){

          let codeError = 'INVALID_EMAIL_FORMAT';

          return B.reject( codeError )
        }

        return(
          db
          .getLastEmailVerificationToken( apiDbCONN, email )
          .then( Ru.when( Ru.isNil, () => {

            let errorCode = 'CANNOT_RESEND_EMAIL';

            return B.reject(errorCode)
          } ) )
          .then( token => {


            return(
              auth
              .verifyToken( token )
              .then( tokenObj => {

                console.log('tokenObj', tokenObj)

                let {
                  // password,
                  email,
                  firstName,
                  lastName,

                } = tokenObj;


                let verifyLink = `${rootViewsUrl}/verify?token=${token}`

                let mailOptions = {
                  to: [ email ],
                  subject: 'Verify your email',
                  text: ` Hello ${ firstName },
                          You're just one click away from confirming your registration, please take a moment to make sure we’ve got your email address right.
                          click here to confirm your email address (${verifyLink})
                        `,
                  textInHTML: bl.generateConfirmationEmail({
                    firstName,
                    verifyLink
                  })
                }

                return (
                  emailer
                  .send(mailOptions)
                )
              })
            )

          } )
          .then( Ru.K(null) )
        )

      })
    )

    return(
      B.resolve( req.response )
      .then( () => next() )
      .catch( () => next() )
    )
  };


  router.put( '/signup/resend/:email', resendEmailVerification );

  return router
}


const applyRoutes = spec => Ru.pipe(
  applyRoute(spec)
)

module.exports = applyRoutes
