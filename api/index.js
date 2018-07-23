'use strict';

const express                 = require('express')
const B                       = require('bluebird')
const Ru                      = require('rutils/lib')
const reactViews              = require('express-react-views')


const applyMidlewares         = conf => require('./midlewares.js')( conf )
const applyPostMidlewares     = conf => require('./postMidlewares.js')( conf )

// const applyForgotRoutes       = conf => require('./forgot')( conf )
const applyUserRoutes         = conf => require('./user')( conf )
const applySignupRoutes       = conf => require('./signup')( conf )
const applySessionRoutes      = conf => require('./session')( conf )



const applyChildrenRoutes = conf => Ru.pipe(
  // applyForgotRoutes(conf),
  applyUserRoutes(conf),
  applySignupRoutes(conf),
  applySessionRoutes(conf),
  Ru.I
)

const applyRoutes = conf => app  => {

  let newRouter = express.Router()

  let router = applyChildrenRoutes( conf )( newRouter )

  app.use('/api', router)

  return app
}


const verifyUser = conf => (req, res, next) => {
  let {
    auth,
    db
  } = conf
  // console.log('------------verifyUser------------------');

  req.response = (
    req
    .response
    .then( () => {

      let { query, body, params, apiDbCONN } = req;

      let {
        token,

      } = query;


      return (
        B.all([
          auth
          .verifyToken( token )
          .catch(  jsonWebTokenError => {

            // console.log('------------INVALID_TOKEN-verify------------------');
            let errorCode = 'INVALID_TOKEN';
            return B.reject( errorCode );
          })
          ,

          db
          .verificationTokenExists( apiDbCONN, token )
          .tap( Ru.whenF( () => {

            // console.log('------------INVALID_TOKEN-db-verification-----------------');
            let errorCode = 'INVALID_TOKEN';

            return B.reject( errorCode )
          } ) )
          ,
        ])
        .spread( (tokenObj, boolTrue ) => tokenObj )
        .then( tokenObj => {

          console.log('tokenObj-create', tokenObj);

          let {
            firstName,
            lastName,
            password,
            email

          } = tokenObj;


          let spec = {
            firstName,
            lastName,
            email,
            password
          };

          return(
            db
            .createUser( apiDbCONN, spec )
            .then( () => db.deleteEmailPendingVerifications( apiDbCONN, email ) )
            .then( () => {

              let spec = {
                firstName,
                lastName,
                email
              }

              console.log('------------PassAllForVerify------------- ')

              res.set({
                'Content-Security-Policy': 'sandbox'
              })
              const thunk = () => res.render( 'verify', spec );

              return Ru.K( thunk );
            } )
          )
        } )
        .catch(  err => {
          // console.log('------------MyError: ', err)

          if( err.code === 'ER_DUP_ENTRY' ){
            // console.log('------------EMAIL_DUPLICATE ERRROR-----------------');
            let errorCode = 'EMAIL_DUPLICATE';
            return B.reject( Ru.K( () => res.render( 'userAlreadyRegister', {} ) ) )
          }

          // console.log('------------unexistentTokenError-----------------');
          return B.reject( Ru.K( () => res.render( 'unexistentTokenError', {} ) ) )
        })
      )
    } )
  )

  return(
    B.resolve( req.response )
    .then( () => next() )
    .catch( () => next() )
  )
}


const getChangePasswordTemplate = conf => (req, res, next) => {

  let {
    auth,
    db
  } = conf

  req.response = (
    req
    .response
    .then( () => {

      let { query, params, apiDbCONN } = req

      let {
        token
      } = query

      let oldToken = token

      return (
        B.all([
          auth
          .verifyToken( token )
          .catch(  jsonWebTokenError => {
            return B.reject( Ru.K( () => res.render( 'unexistentTokenError', {} ) ) )
          })
          ,

          db
          .resetPasswordTokenExists( apiDbCONN, token )
          .tap( Ru.when( Ru.eq(false), () => {
            return B.reject( Ru.K( () => res.render( 'unexistentTokenError', {} ) ) )
          } ) )
          ,
        ])
        .spread( (tokenObj, boolTrue ) => tokenObj )
        .then( tokenObj => {
          let {
            firstName,
            lastName,
            avatar,
            email,
            id
          } = tokenObj

          return (
            db
            .getResetPasswordCodeByToken( apiDbCONN, token )
            .then( code => {
              console.log( 'fetchCode::: ', code )

              return(
                auth
                .signToken( {
                  userId: id,
                  code
                })
              )
            })
            .tap( token => {
              let spec = {
                userId: id,
                token: oldToken
              }

              return(
                db
                .invalidateResetPasswordToken(apiDbCONN, spec)
              )
            })
            .then( token => {

              let spec = {
                firstName,
                lastName,
                avatar,
                token
              }

              console.log( 'token::: ', token )

              return Ru.K( () => res.render( 'resetPassword', spec ) )
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


const applyViewsRoutes = conf => app => {

  let router = express.Router()

  router.get('/verify', verifyUser(conf)  )

  router.get( '/changePassword', getChangePasswordTemplate(conf) )


  app.use('/views', router)

  return app
}


const applyWebRoutes = app => {

  app.use(express.static(`${__dirname}/../web`))

  // app.set('assets', path.join(__dirname, 'assets'))

  app.get('/', function(request, response) {
      var options = {
          root: __dirname,
          headers: {
              'x-timestamp': Date.now(),
              'x-sent': true
          }
      }

      res.sendFile('web/index.html', options)

  })

  return app
}



const injectViewEngine = app => {
  // create an engine instance
  let engine = reactViews.createEngine({ beautify: true })

  // Set the engine
  app.engine('.jsx', engine);

  // Set the directory views
  app.set('views', 'views');

  // Set jsas the view engine
  app.set('view engine', 'jsx');

  return app

}



const init = spec => {

    let {
      services,
      conf
    } = spec


    let { port } = conf


    let {
      auth,
      db,
      bl,
      sendGrid
    } = services


    const newExpressApp = express()


    const processExpressApp = Ru.pipe(
      injectViewEngine,
      applyMidlewares(services),
      applyRoutes( { services, conf } ),
      applyViewsRoutes(services),
      applyWebRoutes,
      applyPostMidlewares(services)
    )


    const app = processExpressApp( newExpressApp );


    const cb = () => {

        app.listen( port, () => {

          console.log(`the server starts in port ${ port }`)

        })
    }

    return cb
}

module.exports = init
