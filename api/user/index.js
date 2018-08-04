'use strict'

const Ru = require('rutils/lib')
const B = require('bluebird')



const applyRoute = spec => router => {
  let {
    services,
    conf
  } = spec

  let {
    db
  } = services

 console.log('applyRoute-user');

  const getUserData = (req, res, next) => {

    req.response = (
        req
        .response
        .then( () => {

            let {tokenData, apiDbCONN} = req

            let myselfId = tokenData.userId

            return(
                db
                .getUserDataById( apiDbCONN, myselfId )
                .then( Ru.omit(['password']) )
            )
        } )
    )

    return(
        B.resolve( req.response )
        .then( () => next() )
        .catch( () => next() )
    );
  }

  router.get('/user', getUserData)

  return router
}



const applyRoutes = spec => Ru.pipe(
  applyRoute(spec)
)


module.exports = applyRoutes
