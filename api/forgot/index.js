'use strict'
const Ru = require('rutils/lib')

const B = require('bluebird')

const uuidV1 = require('uuid/v1')


const applyRoute = spec => router => {
  let {
    services,
    conf
  } = spec

  let {
    bl,
    db,
    sendGrid,
    auth
  }  = services

  let {
    rootViewsUrl
  } = conf

  const sendResetUrl = (req, res, next) => {

    console.log('req.params::: ', req.params)

    req.response = (
      req
      .response
      .then( () => {

        let { query, body, apiDbCONN} = req;

        let { email } = body


        if( !bl.validateEmail( email ) ){
          let errorCode = 'INVALID_EMAIL_FORMAT';
          return B.reject(errorCode)
        }


        const addResetPasswordToken = user => {
          let fields = [
            'firstName',
            'lastName',
            'email',
            'avatar',
            'id'
          ]

          let userFields = Ru.pick(fields, user)

          let code = uuidV1()

          return (
            auth
            .signToken( userFields )
            .tap( token => {

              let spec = {
                token,
                code,
                userId: user.id
              }

              return (
                db
                .addResetPasswordToken( apiDbCONN, spec )
              )
            })
            .then( token => Ru.assoc( 'token', token, user ) )
          )
        }


        const sendAddapsInvitationMailToUser = email => {
          let from = {
            "email" : sendGrid.FROM_EMAIL,
            "name"  : sendGrid.FROM_NAME
          }

          let personalizations = [
            {
              "to": [
                {
                  "email": email
                }
              ],
              "substitutions": {
                "[%email%]": email
              }
            }
          ]

          let body = {
            templateId: sendGrid.EMAIL_INVALID_RESET_PASSWORD_TEMPLATE_ID,
            from,
            personalizations
          };


          return (
            sendGrid
            .post('mail/send',  body )
            .then(Ru.K(null))
          )
        }



        const sendPasswordResetContinuationMail = user => {
          // console.log( 'user:::', user )

          let {
            firstName,
            lastName,
            email,
            token
          } = user

          let from = {
            "email" : sendGrid.FROM_EMAIL,
            "name"  : sendGrid.FROM_NAME
          };

          let fullName = `${firstName} ${lastName}`;

          let resetPasswordLink = `${rootViewsUrl}/changePassword?token=${token}`

          let personalizations = [
            {
              "to": [
                {
                  "email": email,
                  "name": fullName
                }
              ],
              "substitutions": {
                "[%email%]": email,
                "[%firstName%]": firstName,
                "[%lastName%]": lastName,
                "[%resetPasswordLink%]": resetPasswordLink
              }
            }
          ]


          let body = {
            templateId: sendGrid.EMAIL_VALID_RESET_PASSWORD_TEMPLATE_ID,
            from,
            personalizations
          }

          // console.log('personalizations::: ', body)

          return (
            sendGrid
            .post('mail/send',  body )
            .then(Ru.K(null))
          )
        }



        const sendEmail = Ru.cond([
          [ Ru.isNil, Ru.o( sendAddapsInvitationMailToUser, Ru.K(email) )      ],
          [ Ru.T,     sendPasswordResetContinuationMail   ]
        ])



        return (
          db
          .getUserByEmail( apiDbCONN, { email } )
          .then( Ru.unless( Ru.isNil, addResetPasswordToken ))
          .then( sendEmail )
        )
      })
    )

    return(
      B.resolve( req.response )
      .then( () => next() )
      .catch( () => next() )
    )
  }

  router.post( '/forgotPassword', sendResetUrl )

  return router

}



const applyRoutes = conf =>  Ru.pipe(
    applyRoute(conf)
)


module.exports = applyRoutes
