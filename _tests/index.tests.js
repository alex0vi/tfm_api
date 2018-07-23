'use strict';

require('app-module-path').addPath(`${__dirname}/../`);

//INIT EACH ENTITY
const initSessionTesting                = require('services/api/session/_tests/index.test.js')
const initSignUpTesting                 = require('services/api/signup/_tests/index.test.js')
const initUserTesting                   = require('services/api/user/_tests/index.test.js')
const initUsersTesting                  = require('services/api/users/_tests/index.test.js')
const initBoardsTesting                 = require('services/api/boards/_tests/index.test.js')
const initSearchAutoCompleteTesting     = require('services/api/searchAutoComplete/_tests/index.test.js')
const initTokenSystemTesting            = require('services/api/token/_tests/index.test.js')

describe("INIT TESTING", function () {
    before(function () {
        console.log("------------ Running testing system -----------");
    });

    //initSignUpTesting();

    initSessionTesting();
    initUserTesting();
    initUsersTesting();
    initBoardsTesting();
    initSearchAutoCompleteTesting();

    //initTokenSystemTesting();


    after(function () {
        console.log("----------- Finish testing ------------");
    });
});
