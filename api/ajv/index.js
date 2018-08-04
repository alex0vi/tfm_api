'use strict';

let Ajv = require('ajv');

let ajvSpec = {
    allErrors: true,
    jsonPointers: true,
    schemas: [
        //SESSION
        require('schemas/entities/session/definitions/post/entities/canonic/index.json'),
        require('schemas/entities/session/definitions/get/entities/guest/index.json'),
        require('schemas/entities/session/definitions/get/entities/guest/response.json'),
        require('schemas/entities/session/definitions/get/entities/canonic/index.json'),
        require('schemas/entities/session/definitions/post/entities/facebook/index.json'),
        //SIGNUP
        require('schemas/entities/signUp/definitions/post/entities/email/index.json'),
        require('schemas/entities/signUp/definitions/get/entities/canonic/index.json'),
        require('schemas/entities/signUp/definitions/post/entities/facebook/index.json'),
        // //USER
        // require('schemas/entities/user/entities/common/common.json'),
        require('schemas/entities/user/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/user/definitions/get/entities/public/index.json'),
        // require('schemas/entities/user/definitions/patch/entities/canonic/index.json'),
        // require('schemas/entities/user/definitions/put/entities/resetPassword/index.json'),
        // //ERROR
        require('schemas/entities/data/definitions/error.json'),
        require('schemas/entities/data/definitions/null.json'),

        // //TOKEN
        // require('schemas/entities/token/definitions/get/entities/refreshToken/index.json'),
        // require('schemas/entities/token/definitions/post/entities/refreshToken/index.json'),
        //
        // //FORGOT PASSWORD
        // require('schemas/entities/forgotPassword/definitions/post/index.json')
    ]
}

let ajv = new Ajv( ajvSpec )

module.exports = ajv
