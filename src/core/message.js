import { message } from 'antd';

function showErrorMessage(msg) {
    message.error(msg);
}

let loadingMessage = null;
function showLoadingMessage(msg) {
    if (loadingMessage == null) {
        loadingMessage = message.loading(msg, 0);
        return true;
    } else {
        return false;
    }
}

function closeLoadingMessage() {
   if (loadingMessage) {
       setTimeout(loadingMessage, 10);
       loadingMessage = null;
    }
    //message.destroy();
}

export default {
    showErrorMessage,
    showLoadingMessage,
    closeLoadingMessage,
}