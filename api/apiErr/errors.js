'use strict';

const Ru = require('rutils');

let initErrors = {

    //There is no refresh token that can validate it
    'ACCESS_TOKEN_EXPIRED_FOREVER': {
        _description    : 'Access token can no longer be refreshed',
        httpCode        : 400,
        code            : 'ACCESS_TOKEN_EXPIRED_FOREVER',
    },

    // Access token is not following the structure "<Bearer> <Token>"
    'ACCESS_TOKEN_MALFORMED': {
        _description    : 'Access token is malformed',
        httpCode        : 400,
        code            : 'ACCESS_TOKEN_MALFORMED',
    },

    // Refresh has already be used, expired or manually blacklist
    'REFRESH_TOKEN_REVOKED': {
        _description    : 'Refresh token has been revoked',
        httpCode        : 400,
        code            : 'REFRESH_TOKEN_REVOKED',
    },

    // JWT verification failed
    'ACCESS_TOKEN_INVALID': {
        _description    : 'Access token is not valid',
        httpCode        : 400,
        code            : 'ACCESS_TOKEN_INVALID',
    },

    'ACCESS_TOKEN_EXPIRED': {
        _description    : 'Access token has expired',
        httpCode        : 400,
        code            : 'ACCESS_TOKEN_EXPIRED',
    },

    'ACCESS_TOKEN_UNAUTHORIZED': {
        _description    : 'This token is not allowed to call this endpoint',
        httpCode        : 400,
        code            : 'ACCESS_TOKEN_UNAUTHORIZED',
    },

    // We can't detect what is wrong with the access token
    'ACCESS_TOKEN_UNKNOW_ERROR': {
        _description    : 'Something is wrong with your access token',
        httpCode        : 400,
        code            : 'ACCESS_TOKEN_UNKNOW_ERROR',
    },

    'INVALID_EMAIL_FORMAT': {
        _description    : 'The email is invalid',
        httpCode        : 400,
        code            : 'INVALID_EMAIL_FORMAT',
    },

    'EMAIL_DUPLICATE': {
        _description    : 'The email already exists',
        httpCode        : 404,
        code            : 'EMAIL_DUPLICATE',
    },

    'WRONG_PASSWORD' : {
        _description    : 'Check the password field',
        httpCode        : 404,
        code            : 'WRONG_PASSWORD',
    },

    'WRONG_AUTH_EMAIL' : {
        _description    : 'Check the email field',
        httpCode        : 404,
        code            : 'WRONG_AUTH_EMAIL',
    },

    'UNAUTHORIZED' : {
        _description    : 'You are unauthorized for this resource',
        httpCode        : 401,
        code            : 'UNAUTHORIZED',
    },

    'DELETED' : {
        _description    : 'This resource has been deleted',
        httpCode        : 401,
        code            : 'DELETED',
    },

    'WRONG_POST_ATTACHMENT' : {
        _description    : `You can't attach these elements`,
        httpCode        : 400,
        code            : 'WRONG_POST_ATTACHMENT',
    },

    'RESOURCE_NOT_FOUND' : {
        _description    : `The resource is not found`,
        httpCode        : 404,
        code            : 'RESOURCE_NOT_FOUND',
    },

    'ALREADY_FRIEND' : {
        _description    : `This user is already your friend`,
        httpCode        : 400,
        code            : 'ALREADY_FRIEND',
    },

    'CANNOT_ADD_FRIEND' : {
        _description    : `Can't add this user as friend`,
        httpCode        : 400,
        code            : 'CANNOT_ADD_FRIEND',
    },

    'IMAGE_FORMAT_UNSUPPORTED': {
        _description    : 'Image formats are not supported',
        httpCode        : 415,
        code            : 'IMAGE_FORMAT_UNSUPPORTED',
    },

    'IMAGE_TOO_LARGE': {
        _description    : 'The maximum image size is 2 MB',
        httpCode        : 400,
        code            : 'IMAGE_TOO_LARGE',
    },

    'CANNOT_FOLLOWER_YOURSELF': {
        _description    : 'users cannot follower themself',
        httpCode        : 401,
        code            : 'CANNOT_FOLLOWER_YOURSELF',
    },

    'PATCH_BOARD_WRONG_FORMAT': {
        _description    : 'state and contents should come in pairs, and with the same length',
        httpCode        : 404,
        code            : 'PATCH_BOARD_WRONG_FORMAT',
    },

    'USER_EMAIL_ALREADY_VERIFIED'    : {
        _description    : 'The user email is already verfified',
        httpCode        : 404,
        code            : 'USER_EMAIL_ALREADY_VERIFIED',
    },

    'VERIFICATION_TOKEN_DOES_NOT_EXIST'    : {
        _description    : 'This verification token does not exists in our system',
        httpCode        : 404,
        code            : 'VERIFICATION_TOKEN_DOES_NOT_EXIST',
    },

    'INVALID_TOKEN'    : {
        _description    : 'This token is invalid',
        httpCode        : 404,
        code            : 'INVALID_TOKEN',
    },

    'EMAIL_NOT_VERIFIED'    : {
        _description    : 'The email has not been verified yet',
        httpCode        : 404,
        code            : 'EMAIL_NOT_VERIFIED',
    },

    'CANNOT_RESEND_EMAIL'    : {
        _description    : 'Cannot resend email, first try to signup with all the credentials',
        httpCode        : 404,
        code            : 'CANNOT_RESEND_EMAIL',
    },

    'INVALID_ASPECT_RATIO'    : {
        _description    : 'The image aspect ratio is not correct',
        httpCode        : 412,
        code            : 'INVALID_ASPECT_RATIO',
    },

    'FB_CODE_USED'    : {
        _description    : 'This facebook authorization code has been used',
        httpCode        : 400,
        code            : 'FB_CODE_USED',
    },

    'FB_USER_NOT_RECOGNIZED'    : {
        _description    : 'This facebook user is not recognized',
        httpCode        : 404,
        code            : 'FB_USER_NOT_RECOGNIZED',
    },

    'WRONG_COUNTRY_CODE': {
        _description    : 'This country code is not supported',
        httpCode        : 404,
        code            : 'WRONG_COUNTRY_CODE',
    },

    'RESET_PASSWORD_TOKEN_DOES_NOT_EXIST'    : {
        _description    : 'This reset password token is invalid',
        httpCode        : 404,
        code            : 'RESET_PASSWORD_TOKEN_DOES_NOT_EXIST',
    },

    'INVALID_CODE'    : {
        _description    : ' The code is no longer valid ',
        httpCode        : 404,
        code            : 'INVALID_CODE',
    },

    'OLD_PASSWORD_INCORRECT'    : {
        _description    : ' The old password is not correct ',
        httpCode        : 404,
        code            : 'OLD_PASSWORD_INCORRECT',
    },

    'NEW_PASSWORD_INCORRECT'    : {
        _description    : ' The new password is not correct ',
        httpCode        : 404,
        code            : 'NEW_PASSWORD_INCORRECT',
    },

    'WRONG_CREDENTIALS' : {
        _description   : 'Check the email or password field',
        httpCode        : 400,
        code            : 'WRONG_CREDENTIALS',
    },

    'WRONG_USER_REPORT_TYPE' : {
        _description    : 'Check the <type> field',
        httpCode        : 404,
        code            : 'WRONG_USER_REPORT_TYPE',
    },

    'WRONG_BOARD_REPORT_TYPE' : {
        _description    : 'Check the <type> field',
        httpCode        : 404,
        code            : 'WRONG_BOARD_REPORT_TYPE',
    },

    'CANT_CREATE_GROUP_CHANNEL' : {
        _description    : `Can't create group channel, check your userId is in the users key`,
        httpCode        : 404,
        code            : 'CANT_CREATE_GROUP_CHANNEL',
    },

    'DUPLICATE_QUICK_LINK_URL' : {
        _description    : `Can't duplicate a quick link url`,
        httpCode        : 404,
        code            : 'DUPLICATE_QUICK_LINK_URL',
    },

    ONLY_LEFT_GROUP_CAN_BE_DELETED: {
        _description    : `Only a left group can be deleted`,
        httpCode        : 404,
        code            : 'ONLY_LEFT_GROUP_CAN_BE_DELETED',
    },

    ONLY_GROUP_CAN_BE_LEFT: {
        _description    : `Only a group channel can be left`,
        httpCode        : 404,
        code            : 'ONLY_GROUP_CAN_BE_LEFT',
    },

    CANT_SEND_MESSAGE_IN_BLOQUED_CHANNEL: {
        _description    : `Can't send a message in a bloqued channel`,
        httpCode        : 404,
        code            : 'CANT_SEND_MESSAGE_IN_BLOQUED_CHANNEL',
    },

    CANT_SEND_MESSAGE_IN_LEFT_CHANNEL: {
        _description    : `Can't send a message in a left channel`,
        httpCode        : 404,
        code            : 'CANT_SEND_MESSAGE_IN_LEFT_CHANNEL',
    },

    FORMAT_VALIDATION_ERROR: {
        _description    : `Some format validation error in the body or url request`,
        httpCode        : 400,
        code            : 'FORMAT_VALIDATION_ERROR',
    },

    CAN_ONLY_SET_STAR_ON_PERSONNAL_BOARD: {
        _description    : `The board is not owned by this user neither`,
        httpCode        : 404,
        code            : 'CAN_ONLY_SET_STAR_ON_PERSONNAL_BOARD',
    },

    'UNSUPPORTED_ERROR': {
        _description    : `Something went wrong`,
        httpCode        : 500,
        code            : 'UNSUPPORTED_ERROR',
    },

    'CANNOT_OPENED_FOLDER_IN_TRASH': {
        _description    : `Folder cannot be trash, you could restore if you want`,
        httpCode        : 404,
        code            : 'CANNOT_OPENED_FOLDER_IN_TRASH',
    },

    'CANNOT_MODIFY_BOARD_IN_TRASH': {
        _description    : `Board cannot be modified because it's in trash, restore first`,
        httpCode        : 404,
        code            : 'CANNOT_MODIFY_BOARD_IN_TRASH',
    },

    'UNACTIVE_ACCOUNT': {
        _description    : `Unactive account`,
        httpCode        : 404,
        code            : 'UNACTIVE_ACCOUNT',
    },

    'UNSURPPORTED_ACTION': {
        _description    : `This action is not supported`,
        httpCode        : 404,
        code            : 'UNSORPPORTED_ACTION',
    }
};

let rootUrl = 'https://develop.shardu.com/api/docs#errors/';


const addInfoField = Ru.chain(  Ru.assoc('info') ,Ru.compose( Ru.concat(rootUrl) ,Ru.prop('code') ) );

let errors = Ru.map( addInfoField, initErrors );


module.exports = errors;
