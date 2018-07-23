'use strict';

require('app-module-path').addPath(`${__dirname}/../../..`);

const sendGridApi = require('../index.js')

const Ru = require('rutils/lib');
const B = require('bluebird');
const mysql = require('mysql');
const fs = B.promisifyAll( require("fs") );
const db = require('services/db');

const config = require('services/config');


const getAllUsers = Ru.curry( (CONN) => {


    let q = `
        SELECT
            u.id,
            u.firstname AS firstName,
            u.lastname AS lastName,
            u.country,
            u.language,
            u.email,
            u.birthdate,
            u.inserted_at AS insertedAt,
            u.updated_at AS updatedAt,
            u.description,
            u.friends,
            u.followers,
            u.following,

            (
                SELECT
                CASE
                        WHEN l.id IS NULL
                    THEN '[]'

                    ELSE CAST(
                        CONCAT(
                            '[',
                            GROUP_CONCAT('"',l.name,'"'),
                            ']'
                        )  AS JSON
                    )
                END

            ) AS labels

        FROM users u

        LEFT JOIN users_labels u_l
            ON u_l.user_id = u.id

        LEFT JOIN labels l
            ON l.id = u_l.label_id

        WHERE u.id != 1

        GROUP BY u.id
    `;


    let qValues = [];


    const go = Ru.pipe(
        Ru.evolve({
            labels: JSON.parse
        })
    )

    return(
        CONN
        .queryAsync( q, qValues )
        .then( Ru.map( go ) )
    )
} )





let users = require('./users.json');




const toSendGridUser = Ru.pipe(
    Ru.omit(['birthdate']),

    Ru.mapKeys( Ru.cond([
        [Ru.eq('insertedAt'),          Ru.K('created_at')       ],
        [Ru.eq('id'),                  Ru.K('addaps_id')       ],
        [Ru.T,                         Ru.I,                    ],
    ])),
    Ru.mapObjIndexed( Ru.cond([
        [(v, k, obj) => Ru.eq('labels', k) ,   (v, k, obj) =>  Ru.join(',', v )  ],
        [(v, k, obj) => Ru.eq('addaps_id', k) ,   (v, k, obj) =>  String( v )  ],
        [Ru.T,                         Ru.I,                    ],
    ])  ),

    Ru.snakeCaseKeys
)



// const insertSendGridUsers = users => {
//
//
//
// }




const main = () => {


    // return(
    //     getAllUsers()
    //     // .then( Ru.map( toSendGridUser ) )
    //     // .then( Ru.take(1) )
    //     // .tap( x => console.log('x',x) )
    //     // .then( sendGridUsers => sendGridApi.post('contactdb/recipients', sendGridUsers) )
    //     .then( res => console.log('res', res) )
    //     .catch( res => console.log('res', res) )
    // )

    // let body = [
    //     {
    //         email           : "emilio@addaps.com",
    //         first_name       : 'Emilio',
    //         last_name        : 'Soca',
    //         // created_at      : ''
    //         // updated_at      : ''
    //         addaps_id       : '20',
    //         description     : 'Emilio description',
    //         language        : 'en',
    //         country         : 'es'
    //     },
    //     {
    //         email           : "dani@addaps.com",
    //         first_name       : 'Dani',
    //         last_name        : 'Tiati',
    //         addaps_id       : '48',
    //         description     : 'Dani description',
    //         language        : 'en',
    //         country         : 'es'
    //     },
    // ]
    //
    //
    // sendGridApi
    // .post('contactdb/recipients', body )
    // .then( res => console.log('res', res) )
    // .catch( res => console.log('res', res) )





    let pool = db.getApiv2DbPool( config.db.apiv2 )

    return(
        pool
        .getConnectionEnh()
        .then( CONN => {



            return(
                getAllUsers( CONN )
                .then( Ru.map( toSendGridUser ) )
                // .then( Ru.length )
                // .then( Ru.take(10) )
                // .tap( x => console.log('x',x) )
                .then( sendGridUsers => sendGridApi.post('contactdb/recipients', sendGridUsers) )
                .then( res => console.log('res', JSON.stringify(res, null, 2)) )
                .catch( res => console.log('res', JSON.stringify(res, null, 2)) )
            )
        } )
    )
}

main()
