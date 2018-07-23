'use strict';


let HOErr = require('../HOErr');

let errors = require('./errors.js');

let unsupportedError = 'UNSUPPORTED_ERROR';


let spec = {
    errors,
    unsupportedError
}


let apiErr = HOErr.of( spec );

module.exports = apiErr
