'use strict';

const Ru = require('rutils');

const mysql = require('mysql');

const Connection = require('mysql/lib/Connection');
const Pool = require('mysql/lib/Pool');
const Bluebird = require('bluebird');

Bluebird.promisifyAll([ Connection, Pool ]);




let timers = {}


const startTimer = (key) => {
  timers[key] = process.hrtime();
}

const stopTimer = (key) => {
  let execTime = process.hrtime(timers[key]);
  console.info('\x1b[33m%s\x1b[0m ', 'Execution Time of ' + key,  execTime[0] + 's', execTime[1]/1000000 + 'ms');
}

const dbApiV2Conf  = {
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password: 'root',
    database: 'api',
    encoding: 'utf8',
    timezone: 'UTC',
    connectionLimit: 250,
    acquireTimeout: 100000
}



const makeConnectToDb = conf => {


    let { host, user, password, database, connectionLimit, queueLimit } = conf;

    let pool =  mysql.createPool({
        host,
        user,
        password,
        database,
        connectionLimit,
        queueLimit
    }) ;

    pool.on('acquire', function (connection) {
      console.log('Connection %d acquired', connection.threadId);
    });

    pool.on('connection', function (connection) {
      console.log('new connection');
      // connection.query('SET SESSION auto_increment_increment=1')
    });

    pool.on('enqueue', function () {
      console.log('Waiting for available connection slot');
    });

    pool.on('release', function (connection) {
      console.log('Connection %d released', connection.threadId);
    });



    /**
    * Connect to Database and execute queries
    * @param  spec  JSON
    * @param  dSpec ?
    * @param  context ?
    *
    * @return execute query and release connection
    */
    const connectToDb = fn => ( spec, dSpec, context = {} ) => {

        return (
            pool
            .getConnectionAsync()
            .then( CONN => {

                let newContext = Ru.assoc( 'CONN', CONN, context  );

                startTimer('db/query' + CONN.threadId);


                return(
                    fn(spec, dSpec, newContext)
                    .tap( () => {
                      stopTimer('db/query' + CONN.threadId);
                      return CONN.release();
                    })
                )
            } )
        )

    }

    return connectToDb;
};






const connectToApiV2Db = makeConnectToDb( dbApiV2Conf )

module.exports = {
  connectToApiV2Db,
}
