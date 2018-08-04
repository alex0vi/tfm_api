'use strict';

const Ru = require('rutils');
const moment = require('moment');
const B = require('bluebird');
const fs = B.promisifyAll( require("fs") );
const ApiErr = require('../apiErr');
const ajv = require('../ajv');

const _idsStrToIdsNumber = Ru.pipe(
    Ru.split(','),
    Ru.map( Number )
)

const idsStrToIdsNumber = Ru.unless( Ru.isNil, _idsStrToIdsNumber );

const mkFormatValidation = schemaPath => {

    let schemaId = `/${schemaPath}`;

    const validateSchema = ajv.getSchema( schemaId );

    const handler = (req, res, next) => {

        req.response = (
            req
            .response
            .then( () => {

                let { tokenData, query, body, params, apiv2DbCONN } = req;

                let bodyIsValid = validateSchema( body );

                if( !bodyIsValid ){

                    let ajvErrors = validateSchema.errors;

                    let apiErr = ApiErr.of('FORMAT_VALIDATION_ERROR', { schemaErrors:ajvErrors } );
                    throw apiErr;
                }
            })
        )

        return(
            B.resolve( req.response )
            .then( () => next() )
            .catch( () => next() )
        )
    };

    return handler;
}

const mkCompileSchema = schemaPath => {

    let schemaId = `/${schemaPath}`

    const compileSchema = ajv.getSchema( schemaId )

    return compileSchema

}

const date2AccessTokenFormat = date => date.unix()

const getAccessTokenExpTime = () => moment().add( 15, 'm' ).utc()

const getAccessTokenExpTimeFormated = () => date2AccessTokenFormat( getAccessTokenExpTime() )


const date2RefreshTokenFormat = date => date.format()

const getRefreshTokenExpTime = () => moment().add( 6, 'M' ).utc()

const getRefreshTokenExpTimeFormated = () => date2RefreshTokenFormat( getRefreshTokenExpTime() )

module.exports = {
  idsStrToIdsNumber,
  mkFormatValidation,
  mkCompileSchema,

  date2AccessTokenFormat,
  getAccessTokenExpTime,
  getAccessTokenExpTimeFormated,

  date2RefreshTokenFormat,
  getRefreshTokenExpTime,
  getRefreshTokenExpTimeFormated
};
