function getUserToken(){
    let user = sessionStorage.getItem('user');
    let userToken = "";
    if (user) {
        user = JSON.parse(user);
        userToken = user.tokenId || '';
    }
    return userToken;
}

function getUserData() {
    let user = sessionStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

function getUserDispalyName() {
    let userInfo = getUserData();
    if (userInfo) {
        if (userInfo.aliasname) {
            return userInfo.aliasname;
        } else {
            return userInfo.username;
        }
    } else {
        return "";
    }
}

function isAuthSession() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        return true;
    } else {
        return false;
    }
}

function getUserMenuList() {
    return JSON.parse(sessionStorage.getItem('menuList'));
}

function saveUserData(sessionData) {
    sessionStorage.setItem('user', JSON.stringify(sessionData));
}

function deleteUserSession() {
    sessionStorage.removeItem('user');
}

function setSystemInfo(systemCode, loginFlag) {
    let info = {
        systemCode: systemCode,
        loginFlag: loginFlag,
    };
    sessionStorage.setItem("config", JSON.stringify(info));
}

function getSystemInfo() {
    let info = JSON.parse(sessionStorage.getItem('config'));
    if (info == null) {
        info = {
            systemCode: '',
            loginFlag: '',
        }
    }
    return info;
}

export default(
    {
        getUserToken,
        getUserData,
        getUserMenuList,
        getUserDispalyName,
        saveUserData,
        deleteUserSession,
		isAuthSession,
        setSystemInfo,
        getSystemInfo,
    }
)