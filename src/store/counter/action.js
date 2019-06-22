import Action from './action-type';
import Api from '@/api/api';

export const get = () => {
    return dispatch => {
        return Api.getUrl(Api.Url.GET_LOGININFO).then((res) => {
            dispatch(set(res.data.count));
            return res;
        }, (err) => {
            dispatch(set(0));
            return Promise.reject(err);
        });
    }
};

export const set = (count) => {
    return {type: Action.SET, count: count}
};

export const add = () => {
    return {type: Action.ADD};
};

export const sub = () => {
    return {type: Action.SUB}
};

export const reset = () => {
    return {type: Action.RESET}
};

export const addAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 2000);
    }
};


