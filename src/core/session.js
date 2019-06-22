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

function getSessionMenuList() {
    return JSON.parse(sessionStorage.getItem('menuList'));
}

function isAuthSession() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        return true;
    } else {
        return false;
    }
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
        isAuthSession,
        saveSession,
        deleteSession
    }
)