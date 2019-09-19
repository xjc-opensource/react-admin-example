import Action from './action-type';

let defaultState = {
    funKey: '',
    userInfo: {},
    menuList: [],
    loading: false,
}

export const userInfo = (state = defaultState, action = {}) => {
    switch (action.type) {
        case Action.SET:
            return {...state, ...{userInfo: action.userInfo}};
        case Action.SET_LOADING:
            return {...state, ...{loading: action.loading}};
        case Action.SET_MENU:
            return { ...state, ...{menuList: action.menuList}};
        case Action.ADD_MENU:
            return { ...state, ...{menuList: [...state.menuList].concat(action.menuList)}};
        default:
            return state;
    }
}





