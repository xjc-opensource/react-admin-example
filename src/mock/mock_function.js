import {getResultSuccess} from './mock_response';
import {_queryData,  _selectData} from './data/functionData';

export default {
    bootstrap(mock) {
        mock.onPost('/_mockjs/datafunction/queryFields').reply(config => {
            return new Promise((resolve) => {
                resolve([200, getResultSuccess(_queryData, "queryFields")]);
            });
        });

        mock.onPost('/_mockjs/datafunction/select').reply(config => {
            return new Promise((resolve) => {
                resolve([200, getResultSuccess(_selectData, "select")]);
            });
        });

        mock.onPost('/_mockjs/datafunction/delete').reply(config => {
            return new Promise((resolve) => {
                resolve([200, getResultSuccess({cmmitResult: {cmmitFlag:1}}, "")]);
            });
        });

    }
}