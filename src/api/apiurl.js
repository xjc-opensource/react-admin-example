import {GlobalEnvParams} from '../core/envconfig';

let ApiUrl = {
    USER: {
        LOGIN: '/login/in',
        LOGOUT: '/login/out',
        LOGININFO: '/login/userInfo',
        MODIFY_PASSWORD: '/login/modpwassword',
        GET_COUNT: '/login/count',
    },
    DATA_FUN: {
        SELECT: '/datafunction/select',
        QUERY_FIELDS: '/datafunction/queryFields',
        QUERY_CMMIT: '/datafunction/queryCmmit',
        ADD_FIELDS: '/datafunction/addFields',
        ADD_CMMIT: '/datafunction/addCmmit',
        UPDATE_FIELDS: '/datafunction/updateFields',
        UPDATE_CMMIT: '/datafunction/updateCmmit',
        IMPORT_FIELDS: '/datafunction/importFields',
        IMPORT_CMMIT: '/datafunction/importCmmit',
        DELETE: '/datafunction/delete',
    },
};

if (GlobalEnvParams.MOCK_DATA) {
    if (GlobalEnvParams.MOCK_LOGIN) {
        Object.assign(ApiUrl.USER, {
            LOGIN: '/_mockjs/sys/login',
            LOGOUT: '/_mockjs/sys/logout',
            LOGININFO: '/_mockjs/sys/getLoginInfo',
            MODIFY_PASSWORD: '/_mockjs/sys/modpwassword',
            GET_COUNT: '/_mockjs/sys/count',
        })
    }

    Object.assign(ApiUrl.DATA_FUN, {
        /*SELECT: '/datafunction/select',
        QUERY_FIELDS: '/_mockjs/datafunction/queryFields',
        QUERY_CMMIT: '/datafunction/queryCmmit',
        ADD_FIELDS: '/datafunction/addFields',
        ADD_CMMIT: '/datafunction/addCmmit',
        UPDATE_FIELDS: '/datafunction/updateFields',
        UPDATE_CMMIT: '/datafunction/updateCmmit',
        IMPORT_FIELDS: '/datafunction/importFields',
        IMPORT_CMMIT: '/datafunction/importCmmit',*/
        //DELETE: '/_mockjs/datafunction/delete',
    })
}

export default ApiUrl;