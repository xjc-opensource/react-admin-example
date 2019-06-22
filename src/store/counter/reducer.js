import Action from './action-type';

let defaultState = {
    count: 10
}

export const counter = (state = defaultState, action = {}) => {
    switch (action.type) {
        case Action.ADD:
            return {...state, ...{count: state.count + 1}};
        case Action.SUB:
            return {...state, ...{count: state.count - 1}};
        case Action.RESET:
            return {...state, ...defaultState};
        case Action.SET:
            return {...state, ...{count: action.count}};
        default:
            return state;
    }
}




