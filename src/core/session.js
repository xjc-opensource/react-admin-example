function getSessionToken(){
    let user = sessionStorage.getItem('user');
    let userToken = "";
    if (user) {
        user = JSON.parse(user);
        userToken = user.token || '';
    }
    return userToken;
}

function getSessionData() {
    let user = sessionStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

function getSessionDispalyName() {
    let userInfo = getSessionData();
    if (userInfo.aliasname) {
        return userInfo.aliasname;
    } else {
        return userInfo.username;
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

function getSessionMenuList() {
    return JSON.parse(sessionStorage.getItem('menuList'));
}

function saveSession(sessionData) {
    sessionStorage.setItem('user', JSON.stringify(sessionData));
}

function deleteSession() {
    sessionStorage.removeItem('user');
}

export default(
    {
        getSessionToken,
        getSessionData,
        getSessionMenuList,
        getSessionDispalyName,
        isAuthSession,
        saveSession,
        deleteSession
    }
)