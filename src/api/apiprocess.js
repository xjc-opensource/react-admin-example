import { message } from 'antd';
import { GlobalEnvParams } from '../core/envconfig';
import Session from '../core/session';

function getApiRoot() {
    return GlobalEnvParams.API_ROOT;
}

function showErrorMessage(msg) {
    message.error(msg);
}

function getResponseCodeString(code) {
    return code;
}

function getUserToken() {
    return Session.getSessionToken();
}

function processNoAuth(){
    Session.deleteSession();
}

export default {
    getApiRoot
    ,showErrorMessage
    ,getResponseCodeString
    ,processNoAuth
    ,getUserToken
}