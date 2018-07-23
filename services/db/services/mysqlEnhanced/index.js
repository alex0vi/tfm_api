'use strict'

let mysql = require('mysql')

const Connection = require('mysql/lib/Connection')
const Pool = require('mysql/lib/Pool')
const B = require('bluebird')

B.promisifyAll([ Connection, Pool ])


const Ru = require('rutils/lib')


const createPoolEnh = (...params) => {


    let pool = mysql.createPool( ...params )


    pool.on('release', CONN => {

        console.log('Connection %d released', CONN.threadId)
    })



    pool.on('acquire', CONN => {

        console.log('Connection %d acquired', CONN.threadId)
    })


    pool.on('connection', CONN => {

        console.log('Connection %d connection', CONN.threadId)
    })


    pool.on('enqueue', CONN => {

        console.log('Waiting for available connection slot')
    })



    const getConnectionEnh = (...params) => {


        return(
            pool
            .getConnectionAsync( ...params )
            .then( CONN => {

                let inTransaction;
                let nestedDeep;

                const _setInitialState = () => {
                    inTransaction = false;
                    nestedDeep = 0;
                }


                _setInitialState();


                const _addTransactionToState = () => {
                    nestedDeep = nestedDeep + 1;
                    inTransaction = true;
                }


                const _removeTransactionFromState = () => {
                    nestedDeep = nestedDeep - 1;
                }



                const _handleError = err => {

                    const go = Ru.pipe(
                        Ru.when(  () => inTransaction, () => CONN.queryAsync('ROLLBACK') ),
                        Ru.K( _setInitialState )
                    )

                    return (
                        B
                        .resolve( null )
                        .tap(  go  )
                        .then(  () => {throw err}  )
                    )
                }


                const beginTransactionEnh = () => {

                    return(
                        B
                        .resolve()
                        .then( Ru.when( () => !inTransaction, () => CONN.queryAsync('START TRANSACTION') ) )
                        .tap( _addTransactionToState )

                    )
                };


                const commitTransactionEnh = () => {


                    _removeTransactionFromState()

                    const commit = () => {

                        return (
                            CONN
                            .queryAsync('COMMIT')
                            .tap( () => inTransaction = false )
                        )
                    }

                    return(
                        B
                        .resolve()
                        .then( Ru.when( () => nestedDeep === 0, commit ) )
                    )
                }



                const releaseEnh = () => {


                    CONN.release();
                    _setInitialState();

                     return B.resolve()
                }



                const transaction = fn => {

                    return(
                        beginTransactionEnhanced()
                        .then( () => fn() )
                        .tap( commitTransactionEnh )
                        .catch( _handleError )
                    );
                }



                // CONN.queryEnhanced                   = queryEnhanced
                // CONN.beginTransactionEnhanced        = beginTransactionEnhanced
                // CONN.commitTransactionEnhanced       = commitTransactionEnhanced
                CONN.releaseEnh                         = releaseEnh
                CONN.transaction                        = transaction
                // CONN.queryEnhanced = CONN.queryAsync;


                return CONN
            } )
        )
    }


    pool.getConnectionEnh = getConnectionEnh

    return pool
}


mysql.createPoolEnh = createPoolEnh


module.exports = mysql
