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
}

export default ApiUrl;