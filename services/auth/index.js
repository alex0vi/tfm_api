'use strict';


const B = require('bluebird');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const mk = conf => {

  let {
    saltRounds,
    tokenSecret
  } = conf


  const hash = password => {

    return new B(  (resolve, reject) => {

      bcrypt.hash( password, saltRounds, (err, hashedPassword) => {

        return err ? reject( err ) : resolve( hashedPassword )
      })
    })
  }


  const compare = ( password, hashedPassword ) => {

    return new B(  (resolve, reject) => {

      bcrypt.compare( password, hashedPassword, (err, token) => err ? reject(err) : resolve(token) )
    } )
  }

  const signToken = obj => new B( (resolve, reject) => {

    jwt.sign( obj, tokenSecret, null, (err, token) => err ? reject(err) : resolve(token)  )
  })


  const verifyToken = token => new B(  (resolve, reject) => {


    jwt.verify( token, tokenSecret, (err, decoded) => err ? reject(err) : resolve(decoded) )
  })

  return {
    hash,
    compare,

    signToken,
    verifyToken
  }
}

module.exports = mk
