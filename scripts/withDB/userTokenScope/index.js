'use strict'
const Ru = require('rutils')

const mysql = require('mysql')

const {
    connectToApiV2Db
} = require('../dbDecorators')


let logInEndPts = [
    //******** BOARD BACKGROUND *******************
    [ 'LOGED_IN', '/boardBackground/:label', 'GET'],

    // *******  TOKENS ****************
    [ 'LOGED_IN', '/token', 'POST' ],
    [ 'LOGED_IN', '/token', 'DELETE' ],

    // ******* SESSION ****************
    [ 'LOGED_IN', '/session', 'POST' ],
    [ 'LOGED_IN', '/session/facebook', 'POST' ],
    [ 'LOGED_IN', '/session/guest_mode_session', 'GET' ],

    // ******* SIGNUP ****************
    [ 'LOGED_IN', '/signup', 'POST' ],
    [ 'LOGED_IN', '/signup/facebook', 'POST' ],

    // ******* USER ****************
    [ 'LOGED_IN', '/user', 'GET' ],
    [ 'LOGED_IN', '/user', 'PATCH' ],
    [ 'LOGED_IN', '/user/password', 'PUT' ],
    [ 'LOGED_IN', '/user/deactivate', 'POST' ],

    // ******* USER/BOARDS ****************
    [ 'LOGED_IN', '/user/boards/:id([0-9]+)', 'GET' ],
    [ 'LOGED_IN', '/user/boards/:id([0-9]+)', 'PATCH' ],
    [ 'LOGED_IN', '/user/boards/:id([0-9]+)/starred', 'PUT' ],
    [ 'LOGED_IN', '/user/boards/starred', 'GET' ],
    [ 'LOGED_IN', '/user/boards/:id([0-9]+)/starred', 'DELETE' ],
    [ 'LOGED_IN', '/user/boards/:id([0-9]+)/recentlyOpened', 'PUT' ],
    [ 'LOGED_IN', '/user/boards/recentlyOpened', 'GET' ],

    // ******* USER/FS/BOARDS ****************
    [ 'LOGED_IN', '/user/fs/boards', 'GET' ],
    [ 'LOGED_IN', '/user/fs/boards', 'POST' ],
    [ 'LOGED_IN', '/user/fs/boards/recentlyOpened', 'GET' ],
    [ 'LOGED_IN', '/user/fs/boards/starred', 'GET' ],
    [ 'LOGED_IN', '/user/fs/boards/:id([0-9]+)', 'GET' ],
    [ 'LOGED_IN', '/user/fs/boards/:id([0-9]+)', 'POST' ],
    [ 'LOGED_IN', '/user/fs/boards/:id([0-9]+)', 'PUT' ],
    [ 'LOGED_IN', '/user/fs/boards/:id([0-9]+)', 'DELETE' ],

    // ******* USER/FS/BOARDS/TRASH ****************
    [ 'LOGED_IN', '/user/fs/boards/trash', 'GET' ],
    [ 'LOGED_IN', '/user/fs/boards/trash/:id([0-9]+)', 'GET' ],
    [ 'LOGED_IN', '/user/fs/boards/trash/:id([0-9]+)', 'POST' ],
    [ 'LOGED_IN', '/user/fs/boards/trash', 'DELETE' ],
    [ 'LOGED_IN', '/user/fs/boards/trash/:id([0-9]+)', 'DELETE' ],

    // ******* USER/IMAGES ****************
    [ 'LOGED_IN', '/user/images', 'GET' ],
    [ 'LOGED_IN', '/user/images/:id', 'GET' ],
    [ 'LOGED_IN', '/user/images', 'POST' ],
    [ 'LOGED_IN', '/user/images/avatar', 'POST' ],
    [ 'LOGED_IN', '/user/images/cover', 'POST' ],
    [ 'LOGED_IN', '/user/images/boardBackground', 'POST' ],

    // ******* USER/QUICKLINKS ****************
    [ 'LOGED_IN', '/user/quickLinks', 'GET' ],
    [ 'LOGED_IN', '/user/quickLinks', 'DELETE' ],
    [ 'LOGED_IN', '/user/quickLinks/:id([0-9]+)', 'DELETE' ],
    [ 'LOGED_IN', '/user/quickLinks', 'POST' ],
    [ 'LOGED_IN', '/user/quickLinks', 'PUT' ],

    // ******* USER/PUBLIC/BOARDS ****************
    [ 'LOGED_IN', '/user/public/boards', 'GET' ],
    [ 'LOGED_IN', '/user/public/boards/:id([0-9]+)', 'DELETE' ],
    [ 'LOGED_IN', '/user/public/boards/:id([0-9]+)', 'PUT' ],

    // ******* USER/FEEDS/DISCOVER ****************
    [ 'LOGED_IN', '/user/feeds/discover', 'GET' ],

    // ******* USERS ****************
    [ 'LOGED_IN', '/users', 'GET' ],

    // ******* BOARDS ****************
    [ 'LOGED_IN', '/boards/:id([0-9]+)', 'GET' ],
    [ 'LOGED_IN', '/boards/:id([0-9]+)/publicUrl', 'GET' ],

    // ******* BOARDS ****************
    [ 'LOGED_IN', '/boards/reportTypes', 'GET' ],
    [ 'LOGED_IN', '/boards/:id([0-9]+)/report', 'POST' ],

    // ******* SEARCH AUTOCOMPLETE ****************
    [ 'LOGED_IN', '/searchAutoComplete', 'GET' ],

    // ****** POIS **************
    [ 'LOGED_IN', '/pois', 'GET' ],

    // ****** DEFAULT LINKS ******
    [ 'LOGED_IN', '/defaults/quickLinks', 'GET' ],

    // ******* COUNTRIES ********
    [ 'LOGED_IN', '/countries', 'GET' ],

    // ******* ADDAPS IMAGES ************
    [ 'LOGED_IN', '/addaps/lib/images', 'GET'],

    // ******* FAVICON ************
    [ 'LOGED_IN', '/favicon', 'GET'],

    // ******* FEEDBACK ************
    [ 'LOGED_IN', '/user/feedback', 'POST'],

    // ****** FORGOT PASSWORD
    [ 'LOGED_IN', '/forgotPassword', 'POST' ],

]

let guestEndPts = [
    //******** BOARD BACKGROUND *******************
    [ 'GUEST', '/boardBackground/:label', 'GET'],

    // ******* SESSION ****************
    [ 'GUEST', '/session', 'POST' ],
    [ 'GUEST', '/session/facebook', 'POST' ],
    [ 'GUEST', '/session/guest_mode_session', 'GET' ],

    // ******* SIGNUP ****************
    [ 'GUEST', '/signup', 'POST' ],
    [ 'GUEST', '/signup/facebook', 'POST' ],

    // ******* USER/FEEDS/DISCOVER ****************
    [ 'GUEST', '/user/feeds/discover', 'GET' ],

    // ******* USERS ****************
    [ 'GUEST', '/users', 'GET' ],

    // ******* BOARDS ****************
    [ 'GUEST', '/boards/:id([0-9]+)', 'GET' ],
    [ 'GUEST', '/boards/:id([0-9]+)/publicUrl', 'GET' ],

    // ******* BOARDS ****************
    [ 'GUEST', '/boards/reportTypes', 'GET' ],
    [ 'GUEST', '/boards/:id([0-9]+)/report', 'POST' ],

    // ******* SEARCH AUTOCOMPLETE ****************
    [ 'GUEST', '/searchAutoComplete', 'GET' ],

    // ****** POIS **************
    [ 'GUEST', '/pois', 'GET' ],

    // ****** DEFAULT LINKS ******
    [ 'GUEST', '/defaults/quickLinks', 'GET' ],

    // ******* COUNTRIES ********
    [ 'GUEST', '/countries', 'GET' ],

    // ******* FAVICON  ********
    [ 'GUEST', '/favicon', 'GET' ],

    // ******* FEEDBACK ************
    [ 'GUEST', '/user/feedback', 'POST'],

    // ******* ADDAPS IMAGES ************
    [ 'GUEST', '/addaps/lib/images', 'GET'],

    // ******* FORGOT PASSWORD
    [ 'GUEST', '/forgotPassword', 'POST' ],
]


const run = connectToApiV2Db((data, conf, context) => {

    let { CONN } = context

    let q = `
        INSERT IGNORE INTO
            api.users_grants_types(
                user_token_scope,
                url_pattern,
                http_method
            )
        VALUES
            ?
    `

    let qValues = [ data ]

    let sql = mysql.format( q, qValues )

    return (
        CONN
        .queryAsync(sql)
    )

})

run([...logInEndPts, ...guestEndPts])
.then( console.log )
.catch( console.log )
