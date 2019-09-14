import MockAdapter from "axios-mock-adapter";
import axios from "axios"
import mock_data from './mock_data';
import mock_login from './mock_login';
import mock_user_manager from './mock_user_manager';
import {GlobalEnvParams} from '../core/envconfig'

let mock = new MockAdapter(axios);

mock_data.bootstrap(mock);

if (GlobalEnvParams.MOCK_LOGIN) {
    mock_login.bootstrap(mock);
}

if (GlobalEnvParams.MOCK_DEMO_USER) {
    mock_user_manager.bootstrap(mock);
}