'use strict'

const Ru = require('rutils/lib');
const B = require('bluebird');
const mysqlEnh = require('services/db/services/mysqlEnhanced/index.js');





const mk = (spec, db) => {

    let {
        host,
        // port: 3306,
        user,
        password,
        database,
        encoding,
        timezone,
        connectionLimit,
        acquireTimeout,

    } = spec



    let _pool = null;

    // const _poolToConnThreadIds = Ru.pipe(
    //     Ru.prop('_allConnections'),
    //     Ru.map( Ru.prop('threadId') )
    // )

    const getApiDbPool = () => {



        // console.log('_pool', _pool )


        if( _pool ){

            // let {
            //     _acquiringConnections,
            //     _allConnections,
            //     _freeConnections,
            //     _connectionQueue,
            //
            // } = _pool;
            //
            // // console.log('_acquiringConnections', _acquiringConnections)
            // // console.log('_allConnections', _allConnections)
            // // console.log('_freeConnections', _freeConnections)
            return _pool;
        }


        let pool = mysqlEnh.createPoolEnh({
            host,
            user,
            password,
            database,
            encoding,
            timezone,
            connectionLimit,
            acquireTimeout,
        })

        _pool = pool;

        return _pool
    }


    getApiDbPool();

    return {
        getApiDbPool,

    }

    // global function end
}


module.exports = mk;
