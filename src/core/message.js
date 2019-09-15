import { message } from 'antd';

function showErrorMessage(msg) {
    message.error(msg);
}

export default {
    showErrorMessage,
}