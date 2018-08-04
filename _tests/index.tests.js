'use strict';

require('app-module-path').addPath(`${__dirname}/../`);

//INIT EACH ENTITY
const initSessionTesting                = require('api/session/_tests/index.test.js')
// const initSignUpTesting                 = require('api/signup/_tests/index.test.js')
// const initUserTesting                   = require('api/user/_tests/index.test.js')


describe("INIT TESTING", function () {
    before(function () {
        console.log("------------ Running testing system -----------");
    });

    //initSignUpTesting();

    initSessionTesting();
    //initUserTesting();


    after(function () {
        console.log("----------- Finish testing ------------");
    });
});
