import MockAdapter from "axios-mock-adapter";
import axios from "axios"
import mock_login from './mock_login';
import mock_user_manager from './mock_user_manager';
import {GlobalEnvParams} from '../core/envconfig'


if (GlobalEnvParams.MOCK_DATA) {
    axios.defaults.baseURL = GlobalEnvParams.API_ROOT;
    let mock = new MockAdapter(axios, {delayResponse: 500});

    if (GlobalEnvParams.MOCK_LOGIN) {
        mock_login.bootstrap(mock);
    }

    if (GlobalEnvParams.MOCK_DEMO_USER) {
        mock_user_manager.bootstrap(mock);
    }

    mock.onAny().passThrough();
}
