'use strict';

const Ru = require('rutils')
const B = require('bluebird')

const mysql = require('mysql')


const mk = (spec, db) => {

    let {

    } = spec

    const createRefreshToken = Ru.curry( ( CONN, spec ) => {

        const getValues  = Ru.pipe(
            Ru.pick([ 'id', 'userId', 'expirationDate', 'userTokenScope', 'deviceAccountId' ]),
            Ru.values
        )

        let q = `
            INSERT INTO users_refresh_tokens(
                id,
                user_id,
                expiration_date,
                user_token_scope,
                device_account_id
            )
            VALUES (?)
        `


        let qValues = [ getValues( spec ) ]

        let sql = mysql.format( q, qValues )

        return(
            CONN
            .queryAsync( sql )
            .then( Ru.K( spec.id  ) )
        )
    } )

    const getTokenInfoById = Ru.curry( ( CONN, id ) => {

        let q = `
            SELECT
                rt.user_id AS userId,
                rt.expiration_date AS expirationDate,
                rt.user_token_scope  AS tokenScopeType,
                rt.device_account_id  AS deviceAccountId,
                rt.version
            FROM
                users_refresh_tokens rt

            WHERE rt.id = ?
        `;

        let qValues = [ id ]

        let sql = mysql.format( q, qValues );

        return(
            CONN
            .queryAsync( sql )
            .then( Ru.head )
        )
    } )

    const revokeRefreshTokens = Ru.curry( ( CONN, spec ) => {

        const invalidParams = Ru.all( Ru.isNil )

        let {
              userId,
              deviceAccountId,
              refreshToken
          } = spec

          console.log('spec - revokeRefreshTokens::: ', spec, invalidParams( [ userId, deviceAccountId, refreshToken ] ))

          if( invalidParams( [ userId, deviceAccountId, refreshToken ] ) ){
              return B.resolve(null)
          }

          let q = `
              DELETE
              FROM users_refresh_tokens
              WHERE
                ${
                    Ru.isNil( userId) ? 'TRUE' : 'user_id = ?'
                } AND
                ${
                    Ru.isNil( deviceAccountId ) ? 'TRUE' : 'device_account_id = ?'
                } AND
                ${
                    Ru.isNil( refreshToken ) ? 'TRUE' : 'id = ?'
                }
          `

          let qValues = []

          if ( Ru.isNotNil( userId ) ) {
              qValues = [ ...qValues, userId ]
          }

          if ( Ru.isNotNil( deviceAccountId ) ) {
              qValues = [ ...qValues, deviceAccountId ]
          }

          if ( Ru.isNotNil( refreshToken ) ) {
              qValues = [ ...qValues, refreshToken ]
          }

          let sql = mysql.format( q, qValues )

        //   console.log('sql-revokeRefreshTokens::: ', sql)

          return(
              CONN
              .queryAsync( sql )
              .then( Ru.K(null)  )
          )
     })


    const revokeOrphanRefreshTokens = Ru.curry( ( CONN, userId ) => {

          if( Ru.isNil( userId ) ){
              return B.resolve(null)
          }

          let q = `
              DELETE
              FROM users_refresh_tokens
              WHERE
                user_id = ? AND device_account_id IS NULL
          `

          let qValues = [ userId ]

          let sql = mysql.format( q, qValues )

          console.log('sql-revokeOrphanRefreshTokens::: ', sql)

          return(
              CONN
              .queryAsync( sql )
              .then( Ru.K(null)  )
          )
     })


    const getTokenGrants = Ru.curry( (CONN, type) => {

        let q = `
            SELECT
                ugt.url_pattern AS urlPattern,
                ugt.http_method AS httpMethod
            FROM
                users_grants_types ugt

            WHERE ugt.user_token_scope = ?
        `

        let qValues = [ type ]

        let sql = mysql.format( q, qValues )

        return(
            CONN
            .queryAsync( sql )
        )
    } )


    return {
        createRefreshToken,
        getTokenInfoById,
        revokeRefreshTokens,
        revokeOrphanRefreshTokens,
        getTokenGrants
    }

    // global function end
}

module.exports = mk
