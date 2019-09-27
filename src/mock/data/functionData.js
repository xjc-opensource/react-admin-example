import Mock from "mockjs";


let pageInfo = {
    "pageNum": 1,
    "pageSize": 10,
    "size": 10,
    "total": 12,
    "pages": 2,
};

let selectList = [];
let _selectData = {
    dataList: selectList,
    pageInfo: pageInfo,
};

for (let i = 0; i < pageInfo.pageSize; i++) {
    let id = Mock.Random.guid();
    selectList.push(Mock.mock(
        {
            "_1003": Mock.mock('@county(true)'),
            "_1002": Mock.Random.cname(),
            "_S_3": Mock.Random.integer(0, 1),
            "_S_4": Mock.Random.integer(0, 1),
            "_S_1": i + 1,
            "_S_2": id,
            "_1001": id
        }
    ));
}

let _queryData = {
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
};

_selectData.fieldListInfo =
    [{
        "fieldName": "",
        "fieldCode": "S_1",
        "dataValue": null,
        "width": 70,
        "linkUrl": "",
        "fieldDesc": "#",
        "fieldViewName": "_S_1",
        "fieldType": 81,
        "extendType": 0,
        "visValue": 1
    },
        {
            "fieldName": "id",
            "fieldCode": "1001",
            "dataValue": null,
            "width": 120,
            "linkUrl": "",
            "fieldDesc": "id",
            "fieldViewName": "_1001",
            "fieldType": 2,
            "extendType": 1,
            "visValue": 1
        },
        {
            "fieldName": "name",
            "fieldCode": "1002",
            "dataValue": null,
            "width": 120,
            "linkUrl": "",
            "fieldDesc": "名称",
            "fieldViewName": "_1002",
            "fieldType": 1,
            "extendType": 1,
            "visValue": 1
        },
        {
            "fieldName": "content",
            "fieldCode": "1003",
            "dataValue": null,
            "width": 120,
            "linkUrl": "",
            "fieldDesc": "内容",
            "fieldViewName": "_1003",
            "fieldType": 1,
            "extendType": 1,
            "visValue": 1
        },
        {
            "fieldName": "id",
            "fieldCode": "S_4",
            "dataValue": null,
            "width": 70,
            "linkUrl": "",
            "fieldDesc": "",
            "fieldViewName": "_S_4",
            "fieldType": 2,
            "extendType": 72,
            "visValue": 1
        },
        {
            "fieldName": "(1)",
            "fieldCode": "S_2",
            "dataValue": null,
            "width": 65,
            "linkUrl": "",
            "fieldDesc": "编辑",
            "fieldViewName": "_S_2",
            "fieldType": 6,
            "extendType": 70,
            "visValue": 1
        },
        {
            "fieldName": "(1)",
            "fieldCode": "S_3",
            "dataValue": null,
            "width": 65,
            "linkUrl": "",
            "fieldDesc": "删除",
            "fieldViewName": "_S_3",
            "fieldType": 6,
            "extendType": 71,
            "visValue": 1
        }];


export {_queryData, _selectData};