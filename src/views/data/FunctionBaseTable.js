import {FunctionRequest} from "./FunctionRequest";

export class FunctionBasetable extends FunctionRequest {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            dataList: [],
            columns: [],
            total: 0,
            current: 1,
            pageSize: 10,
        });
    }

    reqData = {
        reqParams: {
            pageNum: 1,
            pageSize: 10,
        },
        rowKey: null
    };

    componentWillMount() {
        this.setState({
            dataList: [],
            columns: [],
            total: 0,
            current: 1,
            pageSize: 10,
        });
    }

    setPageNum(pageNum) {
        this.reqData.reqParams.pageNum = pageNum;
    }

    setPageSize(pageSize) {
        this.reqData.reqParams.pageSize = pageSize;
    }

    requestListPageData(pageNum, pageSize, queryParam) {
        if (pageNum) {
            this.setPageNum(pageNum);
        }
        if (pageSize) {
            this.reqData.reqParams.pageSize = pageSize;
        }
        this.requestListData(queryParam);
    }

    requestQueryData(queryParam) {
        this.requestListData(queryParam);
    }

    requestListData(params) {
        this.reqData.rowKey = null;
        let queryParam = Object.assign({}, this.reqData.reqParams);
        if (params) {
            Object.assign(queryParam, params);
        }

        console.log("params:", queryParam);

        this.requestData(queryParam);
    }

    processResponseData(data) {
        super.processResponseData(data);
        let resultData = this.processCustomResultData(data);
        let setData = {};
        if (resultData.list) {
            setData.dataList = resultData.list;
        }
        if (resultData.columns) {
            setData.columns = resultData.columns;
        }
        if (resultData.total) {
            setData.total = resultData.total;
        }
        if (resultData.pageSize) {
            setData.pageSize = resultData.pageSize;
        }
        if (resultData.pageNum) {
            setData.current = resultData.pageNum;
        }

        if (resultData.rowKey) {
            this.reqData.rowKey = resultData.rowKey;
        }

        this.setState(setData);
    }

    processCustomResultData(data) {
        return data;
    }
}