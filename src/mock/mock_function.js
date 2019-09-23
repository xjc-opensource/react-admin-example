import {getResultSuccess} from './mock_response';

export default {
    bootstrap(mock) {
        let _data = {
            "fieldListInfo": [{
                "fieldName": "id",
                "fieldCode": "1001",
                "dataValue": "",
                "fieldDesc": "id",
                "fieldType": 1,
                "extendType": 1,
                "queryLinkName": ""
            },
                {
                    "fieldName": "name",
                    "fieldCode": "1002",
                    "dataValue": "",
                    "fieldDesc": "名称",
                    "fieldType": 1,
                    "extendType": 1,
                    "queryLinkName": ""
                },
                {
                    "fieldName": "content",
                    "fieldCode": "1003",
                    "dataValue": "",
                    "fieldDesc": "内容",
                    "fieldType": 1,
                    "extendType": 1,
                    "queryLinkName": ""
                }],
        }

        mock.onPost('/_mockjs/datafunction/queryFields').reply(config => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess(_data, "删除成功")]);
                }, 2000);
            });
        });

        mock.onPost('/_mockjs/datafunction/delete').reply(config => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([200, getResultSuccess({cmmitResult: {cmmitFlag:1}}, "删除成功")]);
                }, 2000);
            });
        });
    }
}