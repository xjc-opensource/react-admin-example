import Message from '../core/message';
import { GlobalEnvParams } from '../core/envconfig';
import Session from '../core/session';

function getApiRoot() {
    if (GlobalEnvParams.MOCK_DATA) {
        return "";
    } else {
        return GlobalEnvParams.API_ROOT;
    }
}

function showErrorMessage(msg) {
    Message.error(msg);
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