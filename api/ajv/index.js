'use strict';

let Ajv = require('ajv');

let ajvSpec = {
    allErrors: true,
    jsonPointers: true,
    schemas: [
        //SESSION
        // require('schemas/entities/session/definitions/post/entities/canonic/index.json'),
        // require('schemas/entities/session/definitions/get/entities/guest/index.json'),
        // require('schemas/entities/session/definitions/get/entities/guest/response.json'),
        // require('schemas/entities/session/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/session/definitions/post/entities/facebook/index.json'),
        // //SIGNUP
        // require('schemas/entities/signUp/definitions/post/entities/email/index.json'),
        // require('schemas/entities/signUp/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/signUp/definitions/post/entities/facebook/index.json'),
        // //USER
        // require('schemas/entities/user/entities/common/common.json'),
        // require('schemas/entities/user/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/user/definitions/get/entities/public/index.json'),
        // require('schemas/entities/user/definitions/patch/entities/canonic/index.json'),
        // require('schemas/entities/user/definitions/put/entities/resetPassword/index.json'),
        // require('schemas/entities/user/entities/cubeDesigner/index.json'),
        // require('schemas/entities/user/definitions/post/entities/deactivate/index.json'),
        // require('schemas/entities/userImages/definitions/get/entities/byId/index.json'),
        // require('schemas/entities/userImages/definitions/get/entities/all/index.json'),
        // require('schemas/entities/userImages/definitions/get/entities/all/responseSingle.json'),
        // //BOARD_BACKGROUND
        // require('schemas/entities/boardBackground/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/boardBackground/entities/cssColor/index.json'),
        // require('schemas/entities/boardBackground/definitions/post/entities/canonic/index.json'),
        // //IMAGE
        // require('schemas/entities/image/definitions/get/entities/free/index.json'),
        // require('schemas/entities/image/definitions/get/entities/avatar/index.json'),
        // require('schemas/entities/image/definitions/get/entities/cover/index.json'),
        // require('schemas/entities/image/definitions/post/entities/avatar/index.json'),
        // require('schemas/entities/image/definitions/post/entities/cover/index.json'),
        // require('schemas/entities/image/definitions/get/entities/raw/index.json'),
        // //FILE SYSTEM
        // require('schemas/entities/fs/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/fs/definitions/post/entities/restore/index.json'),
        // require('schemas/entities/fs/definitions/put/entities/canonic/index.json'),
        // require('schemas/entities/fs/definitions/post/entities/canonic/index.json'),
        // require('schemas/entities/fs/definitions/post/entities/create/index.json'),
        // require('schemas/entities/fs/definitions/post/entities/create/response.json'),
        // require('schemas/entities/fs/definitions/post/entities/create/responseSingle.json'),
        // // require('schemas/entities/fs/entities/create/board.json'),
        // // require('schemas/entities/fs/entities/create/folder.json'),
        // require('schemas/entities/fs/definitions/post/entities/move/index.json'),
        // require('schemas/entities/fs/definitions/get/entities/root/index.json'),
        // require('schemas/entities/fs/definitions/post/entities/move/responseSingle.json'),
        // require('schemas/entities/fs/definitions/post/entities/copy/index.json'),
        // require('schemas/entities/fs/entities/commonCrud/index.json'),
        // // require('schemas/entities/fs/entities/folder/index.json'),
        // //BOARD
        // require('schemas/entities/board/definitios/get/entities/canonic/index.json'),
        // require('schemas/entities/board/definitios/get/entities/preview/index.json'),
        // require('schemas/entities/board/entities/common/index.json'),
        // require('schemas/entities/board/entities/commonCanonicPublic/index.json'),
        // require('schemas/entities/board/definitios/get/entities/fs/index.json'),
        // require('schemas/entities/board/definitios/get/entities/fs/response.json'),
        // require('schemas/entities/board/definitios/get/entities/fs/responseSingle.json'),
        // require('schemas/entities/board/definitios/get/entities/public/responseSingle.json'),
        // require('schemas/entities/board/definitios/get/entities/public/index.json'),
        // require('schemas/entities/board/definitios/get/entities/public/url/responseSingle.json'),
        // require('schemas/entities/board/definitios/patch/entities/canonic/index.json'),
        // require('schemas/entities/board/definitios/post/entities/canonic/index.json'),
        // //BoardReportTypes
        // require('schemas/entities/boardReportTypes/definitions/post/entities/canonic/index.json'),
        // require('schemas/entities/boardReportTypes/definitions/get/entities/canonic/responseSingle.json'),
        // require('schemas/entities/boardReportTypes/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/board/entities/state/index.json'),
        //
        // //CONTENT
        // require('schemas/entities/content/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/content/definitions/post/entities/canonic/index.json'),
        // require('schemas/entities/content/definitions/get/entities/web/index.json'),
        // require('schemas/entities/content/definitions/post/entities/web/index.json'),
        //
        // //contentsState
        // require('schemas/entities/contensState/definitions/post/entities/canonic/index.json'),
        // require('schemas/entities/contensState/definitions/get/entities/canonic/index.json'),
        // require('schemas/entities/contensState/definitions/get/entities/normal/index.json'),
        //
        // //QUICLINKS
        // require('schemas/entities/quickLinks/definitions/put/entities/canonic/index.json'),
        // require('schemas/entities/quickLinks/definitions/post/entities/canonic/index.json'),
        // require('schemas/entities/quickLinks/definitions/get/entities/canonic/responseSingle.json'),
        // require('schemas/entities/quickLinks/definitions/get/entities/canonic/index.json'),
        // //searchAutoComplete
        // require('schemas/entities/searchAutoComplete/definitions/get/canonic/index.json'),
        // require('schemas/entities/searchAutoComplete/definitions/get/canonic/responseSingle.json'),
        // //EMOTIONS
        // require('schemas/entities/emotions/definitions/get/entities/canonic/index.json'),
        // //UTILS
        // require('schemas/utilities/tel.json'),
        // //ERROR
        // require('schemas/entities/data/definitions/error.json'),
        // require('schemas/entities/data/definitions/null.json'),
        // // DISCOVER FEED
        // require('schemas/entities/discoverFeeds/definitions/get/entities/canonic/response.json'),
        //
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
