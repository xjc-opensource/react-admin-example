import {RESP_CODE} from '../api/responecode.js';

export function getResultSuccess(data, msg) {
    let result = {};
    result.code = RESP_CODE.SUCCESS;
    result.data = data;
    result.message = msg;
    return result;
}

export function getResultError(msg) {
    let result = {};
    result.code = RESP_CODE.ERROR;
    result.message = msg;
    return result;
}