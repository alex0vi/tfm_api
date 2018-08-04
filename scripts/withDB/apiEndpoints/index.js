'use strict'
const Ru = require('rutils')

const mysql = require('mysql')

const {
    connectToApiV2Db
} = require('../dbDecorators')


let endpoints = [
    // ******* SESSION ****************
    [ '/session', 'POST' ],
    [ '/session/facebook', 'POST' ],
    [ '/session/guest_mode_session', 'GET' ],

    // ******* SIGNUP ****************
    [ '/signup', 'POST' ],
    [ '/signup/facebook', 'POST' ],

    // ******* USER ****************
    [ '/user', 'GET' ],
    [ '/user', 'PATCH' ],
    [ '/user/password', 'PUT' ],
    [ '/user/deactivate', 'POST' ],

    // ******* USER/BOARDS ****************
    [ '/user/boards/:id([0-9]+)', 'GET' ],
    [ '/user/boards/:id([0-9]+)', 'PATCH' ],
    [ '/user/boards/:id([0-9]+)/starred', 'PUT' ],
    [ '/user/boards/starred', 'GET' ],
    [ '/user/boards/:id([0-9]+)/starred', 'DELETE' ],
    [ '/user/boards/:id([0-9]+)/recentlyOpened', 'PUT' ],
    [ '/user/boards/recentlyOpened', 'GET' ],

    // ******* USER/FS/BOARDS ****************
    [ '/user/fs/boards', 'GET' ],
    [ '/user/fs/boards', 'POST' ],
    [ '/user/fs/boards/recentlyOpened', 'GET' ],
    [ '/user/fs/boards/starred', 'GET' ],
    [ '/user/fs/boards/:id([0-9]+)', 'GET' ],
    [ '/user/fs/boards/:id([0-9]+)', 'POST' ],
    [ '/user/fs/boards/:id([0-9]+)', 'PUT' ],
    [ '/user/fs/boards/:id([0-9]+)', 'DELETE' ],

    // ******* USER/FS/BOARDS/TRASH ****************
    [ '/user/fs/boards/trash', 'GET' ],
    [ '/user/fs/boards/trash/:id([0-9]+)', 'GET' ],
    [ '/user/fs/boards/trash/:id([0-9]+)', 'POST' ],
    [ '/user/fs/boards/trash', 'DELETE' ],
    [ '/user/fs/boards/trash/:id([0-9]+)', 'DELETE' ],

    // ******* USER/IMAGES ****************
    [ '/user/images', 'GET' ],
    [ '/user/images/:id', 'GET' ],
    [ '/user/images', 'POST' ],
    [ '/user/images/avatar', 'POST' ],
    [ '/user/images/cover', 'POST' ],
    [ '/user/images/boardBackground', 'POST' ],

    // ******* USER/QUICKLINKS ****************
    [ '/user/quickLinks', 'GET' ],
    [ '/user/quickLinks', 'DELETE' ],
    [ '/user/quickLinks/:id([0-9]+)', 'DELETE' ],
    [ '/user/quickLinks', 'POST' ],
    [ '/user/quickLinks', 'PUT' ],

    // ******* USER/PUBLIC/BOARDS ****************
    [ '/user/public/boards', 'GET' ],
    [ '/user/public/boards/:id([0-9]+)', 'DELETE' ],
    [ '/user/public/boards/:id([0-9]+)', 'PUT' ],

    // ******* USER/FEEDS/DISCOVER ****************
    [ '/user/feeds/discover', 'GET' ],

    // ******* USERS ****************
    [ '/users', 'GET' ],

    //******** BOARD BACKGROUND *******************
    [ '/boardBackground/:label', 'GET'],

    // ******* BOARDS *****************************
    [ '/boards/:id([0-9]+)', 'GET' ],
    [ '/boards/:id([0-9]+)/publicUrl', 'GET' ],

    // ******* BOARDS *****************************
    [ '/boards/reportTypes', 'GET' ],
    [ '/boards/:id([0-9]+)/report', 'POST' ],

    // ******* SEARCH AUTOCOMPLETE ****************
    [ '/searchAutoComplete', 'GET' ],

    // *******  TOKENS ****************
    [ '/token', 'POST' ],
    [ '/token/:id', 'DELETE' ],

    // ****** POIS **************
    [ '/pois', 'GET' ],

    // ****** DEFAULT LINKS ******
    [ '/defaults/quickLinks', 'GET' ],

    // ******* COUNTRIES ********
    [ '/countries', 'GET' ],

    // ******* ADDAPS IMAGES ************
    [ '/addaps/lib/images', 'GET'],

    // ******* FAVICON ************
    [ '/favicon', 'GET'],

    // ******* FEEDBACK ************
    [ '/user/feedback', 'POST'],

    // ****** FORGOT PASSWORD
    [ '/forgotPassword', 'POST' ],
]


const run = connectToApiV2Db((endpoints, conf, context) => {

    let { CONN } = context

    let q = `
        INSERT IGNORE INTO
            api.api_endpoints(
                url_pattern,
                http_method
            )
        VALUES
            ?
    `

    let qValues = [ endpoints ]

    let sql = mysql.format( q, qValues )

    return (
        CONN
        .queryAsync(sql)
    )

})

run(endpoints)
.then( console.log )
.catch( console.log )
