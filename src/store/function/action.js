import Api from '../../api/api';
import FunctionActionType from './action-type';

export const selectData = (funKey, pageNum, pageSize) => {
    return dispatch  => {
        dispatch(setFunctionSelectLoading(funKey, true));
        return Api.getUrl(Api.Url.DATA_FUN.SELECT).then((res) => {
            dispatch(setFunctionSelectLoading(funKey, false));
            if ((res) && (res.data)) {
                console.log("data:", res.data);
            }
            return res;
        }, (err) => {
            dispatch(setFunctionSelectLoading(funKey, false));
            return Promise.reject(err);
        });
    }
};

export const setFunctionSelectLoading = (funKey, loading) => {
    return {type: FunctionActionType.SET_LOADING, data: {funkey:funKey, loading: loading}}
};



