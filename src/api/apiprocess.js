import { GlobalEnvParams } from '../core/envconfig';
import Session from '../core/session';
import { message } from 'antd';

function getApiRoot() {
    if (GlobalEnvParams.MOCK_DATA) {
        return "";
    } else {
        return GlobalEnvParams.API_ROOT;
    }
}

function showErrorMessage(msg) {
    console.log("showErrorMessage: ", msg);
    //这里暂不能调用引用文件的代码，否则会出错.
    message.error(msg);
}

function getResponseCodeString(code) {
    return code;
}

function processNoAuth(){
    Session.deleteUserSession();
    window.location.reload();
}

function getDefaultHeader(config) {
    config.headers['x-access-token'] = Session.getUserToken();
    config.headers['x-access-type'] = 'web';
    config.headers['x-access-systemcode'] = Session.getSystemInfo().systemCode ;
    config.headers['x-access-loginflag'] = Session.getSystemInfo().loginFlag;
    return config;
}

function processDefaultAxios(axios) {
    //响应时间
    axios.defaults.timeout = 60 * 1000;
    //配置请求头
    //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    //配置接口地址
    //axios.defaults.baseURL = "http://xxxx";
}

export default {
    getApiRoot
    ,showErrorMessage
    ,getResponseCodeString
    ,getDefaultHeader
    ,processNoAuth
    ,processDefaultAxios
}

