'use strict';

const sendGridApi = require('../index.js')


let email       = 'emilin1993@yahoo.es';
// let email       = 'web-s6bhw@mail-tester.com';
let firstName   = 'Emilin';
let lastName    = 'Herrera';

let token       = 'token';
// let link        = 'link';


let from = {
    "email" : sendGridApi.FROM_EMAIL,
    "name"  : sendGridApi.FROM_NAME
};

let fullName = `${firstName} ${lastName}`;

let verifyLink = `https://www.wikipedia.org/`;

let personalizations = [
  {
    "to": [
      {
        "email": email,
        "name": fullName
      }
    ],
    "substitutions": {
        "[%email%]": email,
        "[%firstName%]": firstName,
        "[%lastName%]": lastName,
        "[%verifyLink%]": verifyLink,
    }
  }
]

let body = {
    templateId: sendGridApi.EMAIL_VERIFICATION_TEMPLATE_ID,
    from,
    personalizations
};


sendGridApi
.post('mail/send',  body )
.then( res => console.log('res', res) )
.catch( res => console.log('res', res) )
