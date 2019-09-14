import ApiUrl from "../api/apiurl";
import {getResultSuccess} from "./mock_response";

export default {
    bootstrap: function (mock) {
        mock.onGet(ApiUrl.GET_COUNT).reply(()=> {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess({count: 99}, '请求成功')]);
                }, 5000);
            })
        });
    }
}