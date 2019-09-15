const target = process.env.NODE_ENV;

let envParams = {
};

let initEnvParam = {
    ENV_TITLE: "unknown"
    ,API_ROOT: ""
    ,TEST_USERNAME: ""
    ,TEST_PASSWORD: ""
    ,TEST_CAPRCHA: ""
    ,DEMO_MENU: false
    ,MOCK_DATA: false
    ,MOCK_LOGIN: false
    ,MOCK_DEMO_USER: false
    ,DEMO_MQTT: false
    ,IS_BrowserRouter: false
};

if (target === 'development') {
    //开发
    envParams = {
        ENV_TITLE: "dev"
        ,API_ROOT: "http://127.0.0.1:6300/opensource-web910/api/v1"
        ,TEST_USERNAME: "admin"
        ,TEST_PASSWORD: "123456"
        ,TEST_CAPRCHA: "666666"
        ,DEMO_MENU: true
        ,MOCK_DATA: true
        ,MOCK_LOGIN: true
        ,MOCK_DEMO_USER: true
    }
} else if (target === 'test') {
    //测试
    envParams = {
        ENV_TITLE: "dev"
        ,API_ROOT: ""
    }
} else if (target === 'production') {
    //线上
    envParams = {
        ENV_TITLE: "prod"
        ,API_ROOT: ""
        ,TEST_USERNAME: ""
        ,TEST_PASSWORD: ""
        ,TEST_CAPRCHA: ""
        ,DEMO_MENU: false
        ,MOCK_DATA: false
        ,MOCK_LOGIN: false
        ,MOCK_DEMO_USER: false
    }
} else   if (target === 'debug') {
    //本地
    envParams = {
        ENV_TITLE: "debug"
        ,API_ROOT: ""
        ,TEST_USERNAME: "admin"
        ,TEST_PASSWORD: "123456"
        ,TEST_CAPRCHA: "666666"
        ,DEMO_MENU: true
        ,MOCK_DATA: true
        ,MOCK_LOGIN: true
        ,MOCK_DEMO_USER: true
    };
} else if (target === 'mock') {
    //mock
    envParams = {
        ENV_TITLE: "mock"
        ,API_ROOT: ""
        ,TEST_USERNAME: "admin"
        ,TEST_PASSWORD: "123456"
        ,TEST_CAPRCHA: "666666"
        ,DEMO_MENU: true
        ,MOCK_DATA: true
        ,MOCK_LOGIN: true
        ,MOCK_DEMO_USER: true
    }
}

export const GlobalEnvParams = Object.assign(initEnvParam, envParams);
