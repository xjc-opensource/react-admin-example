import CounterAction from '../counter/action-type';
import UserAction from './action-type';
import Api from '@/api/api';

export const get = (menuList) => {

    return dispatch  => {
      //  dispatch(setUserMenu(menuList));
        dispatch(setUserLoading(true));
        return Api.getUrl(Api.Url.USER.LOGININFO).then((res) => {
            dispatch(setUserLoading(false));
            if ((res) && (res.data)) {
                console.log("user data:", res.data);

                if (res.data.count) {
                    dispatch(setCount(res.data.count));
                }
                if (res.data.baseInfo) {

                }
                if (res.data.menuList) {
                    let menuList = [];
                    let parnetMenu = null;
                    let groupIndex = -1;

                    for(let index in res.data.menuList) {
                        const menuObj = res.data.menuList[index];
                        if (groupIndex !== menuObj.groupIndex) {
                            groupIndex = menuObj.groupIndex;
                            parnetMenu = {
                                key: '/fun_' + menuObj.groupIndex,
                                title: menuObj.groupName,
                                icon: 'laptop',
                                subs: []
                            }
                            menuList.push(parnetMenu);
                        }

                        let newMenu = {
                            key:  parnetMenu.key +   '/' + menuObj.code,
                            linkPath: '/common/data/' + menuObj.code,
                            title: menuObj.name,
                        }
                        parnetMenu.subs.push(newMenu);
                    }

                    console.log("menuList:", menuList);
                    if (menuList.length > 0) {
                        dispatch(addUserMenu(menuList));
                    }
                }
            }
            return res;
        }, (err) => {
            dispatch(setUserLoading(false));
            dispatch(setCount(0));
            return Promise.reject(err);
        });
    }
};

export const setCount = (count) => {
    return {type: CounterAction.SET, count: count}
};

export const setUserLoading = (loading) => {
    return {type: UserAction.SET_LOADING, loading: loading}
};

export const setUserMenu = (menuList) => {
    return {type: UserAction.SET_MENU, menuList: menuList}
};

export const addUserMenu = (menuList) => {
    return {type: UserAction.ADD_MENU, menuList: menuList}
};


