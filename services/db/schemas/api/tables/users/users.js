'use strict'

const Ru    = require('rutils/lib')
const B     = require('bluebird')
const mysql = require('mysql')
const uuid  = require('uuid')

const unlessNil = Ru.unless( Ru.isNil )



const mk = (spec, db) => {

    let {

    } = spec


    const addResetPasswordToken = Ru.curry( ( CONN, spec ) => {
        let {
            userId,
            token,
            code
        } = spec

        let q = `
            INSERT IGNORE INTO user_change_password_pending (
                user_id,
                token,
                code
            )
            VALUES
                ?
        `

        let qValues = [ [ [ userId, token, code ] ] ]

        let sql = mysql.format( q, qValues )

        return (
            CONN
            .queryAsync(sql)
        )
    })

    const tokenExists = conf => Ru.curry( ( CONN, token ) => {
      let {
        table
      } = conf

      let q = `
        SELECT
          COUNT( * ) AS total
        FROM ${ table }
        WHERE
          token = ?
      `

      let qValues = [ token ]

      let sql = mysql.format( q, qValues )

      // console.log('sql::: ', sql)

      return (
        CONN
        .queryAsync(sql)
        .then( Ru.compose( Ru.flip(Ru.gt)(0), Ru.prop('total'), Ru.head ) )
      )
    })


    const resetPasswordTokenExists = tokenExists({
      table: 'user_change_password_pending'
    })



    const invalidateResetPasswordToken = Ru.curry( ( CONN, spec ) => {

        let {
            userId,
            token
        } = spec

        let q = `
            UPDATE user_change_password_pending
            SET
                token = NULL
            WHERE
                    user_id = ?
                AND token = ?
        `

        let qValues = [ userId, token ]

        let sql = mysql.format( q, qValues )

        return (
            CONN
            .queryAsync(sql)
        )
    })



    const updateField = field => Ru.curry( ( CONN, vals ) => {

        let [
            userId,
            fieldValue
        ] = vals

        let q = `
            UPDATE users
            SET
                ${ field } = ?
            WHERE
                id = ?
        `

        let qValues = [ fieldValue, userId ]

        let sql = mysql.format( q, qValues )

        // console.log('sql::: ', sql)

        return (
            CONN
            .queryAsync(sql)
        )
    })


    const updateUserPassword = updateField('password')


    const getField = config => Ru.curry( ( CONN, whereValue ) => {

        let {
            table,
            field,
            whereField
        } = config

        let q = `
            SELECT
                ${ field }
            FROM
                ${ table }
            WHERE
                ${ whereField } = ?
        `

        let qValues = [ whereValue ]

        let sql = mysql.format( q, qValues )

        return (
            CONN
            .queryAsync(sql)
            .then( Ru.o( Ru.prop(field), Ru.head ) )
        )
    })


    const getResetPasswordCodeByToken = getField( {
        table: 'user_change_password_pending',
        field: 'code',
        whereField: 'token'
    } )

    const getUserHashPassword = getField( {
        table: 'users',
        field: 'password',
        whereField: 'id'
    } )

    const getUserEmail = getField( {
        table: 'users',
        field: 'email',
        whereField: 'id'
    } )


    const isUserCodeValid = Ru.curry( ( CONN, spec ) => {

        let {
            userId,
            code
        } = spec

        let q = `
            SELECT
                COUNT( * ) AS total
            FROM user_change_password_pending
            WHERE
                    user_id = ?
                AND code = ?
        `

        let qValues = [ userId, code ]

        let sql = mysql.format( q, qValues )

        // console.log('sql::: ', sql)

        return (
            CONN
            .queryAsync(sql)
            .then( Ru.compose( Ru.flip(Ru.gt)(0), Ru.prop('total'), Ru.head ) )
        )
    })


    const deleteAllUserPendingResetPassword = Ru.curry( ( CONN, userId ) => {

        let q = `
            DELETE
            FROM user_change_password_pending
            WHERE
                user_id = ?
        `

        let qValues = [ userId ]

        let sql = mysql.format( q, qValues )

        return (
            CONN
            .queryAsync(sql)
        )
    })


    const getUsersDataById =  Ru.curry( ( CONN, ids ) => {

      if ( Ru.isEmpty(ids) || Ru.isNil(ids) ) {
        return B.resolve([])
      }

      let q = `
        SELECT
          id,
          firstname AS firstName,
          lastname AS lastName,
          email,
          password
        FROM
          users
        WHERE id IN (?)
      `

      let qValues = [ ids ]

      let sql = mysql.format( q, qValues )

      // console.log('sql:::getUsersDataById:::', sql);

      return(
        CONN
        .queryAsync(sql)
        // .tap( x => console.log('x::::', x) )
        .then( Ru.preserveOrderBy( Ru.prop('id'), ids ) )
        // .tap( x => console.log('y::::', x) )
        // .then( Ru.map( Ru.camelCaseKeys ) )
      )
    })

    const getUserDataById = Ru.curry( (CONN, id) => {

      if ( Ru.isNil(id) ) {
        return B.resolve(null)
      }

      return (
        getUsersDataById( CONN, [ id ] )
        .then( Ru.head )
      )
    })


    const insertUserPendingVerification = Ru.curry( ( CONN, spec ) => {
      let {
        email,
        token
      } = spec

      let q= `
        INSERT INTO users_pending_verification_token(
          email,
          token
        )
        VALUES
          ?
      `

      let qValues = [ [ [ email, token ] ]]

      let sql = mysql.format( q, qValues )

      return(
        CONN
        .queryAsync( sql )
        .then( Ru.K( token ))
      )

    })


    const verificationTokenExists = tokenExists({
      table: 'users_pending_verification_token'
    })

    const userEmailExists = Ru.curry( ( CONN, email ) => {
      let q = `
        SELECT
          COUNT( * ) AS total
        FROM users
        WHERE
          email = ?
      `

      let qValues = [ email ]

      let sql = mysql.format( q, qValues )

      // console.log('sql::: ', sql)

      return (
        CONN
        .queryAsync(sql)
        .then( Ru.compose( Ru.flip(Ru.gt)(0), Ru.prop('total'), Ru.head ) )
      )
    })



    const createUser = Ru.curry( ( CONN, spec ) => {
      let {
        firstName,
        lastName,
        email,
        password
      } = spec

      let q = `
          INSERT INTO users(
            firstname,
            lastname,
            email,
            password,
            ico_requirements_status
          )
          VALUES
            ?
      `

      let qValues = [ [ [ firstName, lastName, email, password, 'WORLD_NOT_VERIFY' ] ]]

      let sql = mysql.format( q, qValues )

      return (
        CONN
        .queryAsync( q, qValues )
        // .then( )
      )

    })


    const deleteEmailPendingVerifications = Ru.curry( ( CONN, email) => {
      let q = `
          DELETE
          FROM users_pending_verification_token
          WHERE
              email = ?
      `

      let qValues = [ email ]

      let sql = mysql.format( q, qValues )

      return (
          CONN
          .queryAsync(sql)
          .then( Ru.K(null) )
      )
    })


    const getUserByEmail = Ru.curry( ( CONN, email ) => {

      let q = `
        SELECT
          id
        FROM users
        WHERE
          email = ?
      `

      let qValues = [ email ]

      let sql = mysql.format( q, qValues )

      // console.log('sql:::getUserByEmail:::', sql);

      return(
        CONN
        .queryAsync( sql )
        .then( Ru.o( unlessNil( Ru.prop('id') ), Ru.head ) )
        .then( getUserDataById( CONN ) )
      )
    })


    const getLastEmailVerificationToken = Ru.curry( (CONN, email) => {
      let q = `
        SELECT
          token
        FROM
          users_pending_verification_token
        WHERE
          email = ?
        ORDER BY id DESC
        LIMIT 1 OFFSET 0
      `

      let qValues = [ email ]

      let sql = mysql.format( q, qValues )

      // console.log('sql:::getLastEmailVerificationToken:::', sql);


      return(
        CONN
        .queryAsync( sql )
        .then( Ru.o( unlessNil( Ru.prop('token') ), Ru.head ) )
      )
    })

    return {
      getLastEmailVerificationToken,
      getUserByEmail,
      deleteEmailPendingVerifications,
      createUser,
      userEmailExists,
      verificationTokenExists,
      insertUserPendingVerification,
      getUserDataById,
      getUsersDataById,


      deleteAllUserPendingResetPassword,
      isUserCodeValid,
      getUserHashPassword,
      getUserEmail,
      getResetPasswordCodeByToken,
      updateUserPassword,
      invalidateResetPasswordToken,
      resetPasswordTokenExists,
      addResetPasswordToken,
    }
}



// let s = [
//   {
//    id: 1,
//    firstName: 'Daniel',
//    lastName: 'Tiati',
//    email: 'dondanidang@gmail.com',
//    password: '$2a$10$A0Yzg8yqWhrqnCpHAClnQ.2Hie.GjDtyk2yWoIgWdU8mstGRqY1ue'},
//   {
//    id: 5,
//    firstName: 'Daniel',
//    lastName: 'Tiati',
//    email: 'dondanidang@gmail.com',
//    password: '$2a$10$A0Yzg8yqWhrqnCpHAClnQ.2Hie.GjDtyk2yWoIgWdU8mstGRqY1ue'},
//   {
//    id: 0,
//    firstName: 'Daniel',
//    lastName: 'Tiati',
//    email: 'dondanidang@gmail.com',
//    password: '$2a$10$A0Yzg8yqWhrqnCpHAClnQ.2Hie.GjDtyk2yWoIgWdU8mstGRqY1ue' }
//  ]
module.exports = mk
