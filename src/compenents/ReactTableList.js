import {ReactRequest} from './ReactRequest';

export class ReactTableList extends ReactRequest {
    constructor(props) {
        super(props);
        this.auto = props.auto;

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
            page: 1,
            pageSize: 10,
        },
        delUrl: '',
        rowKey: 'id'
    };

    requestListPageData(page, pageSize){
        if (page) {
            this.reqData.reqParams.page = page;
        }
        if (pageSize) {
            this.reqData.reqParams.pageSize = pageSize;
        }
        this.requestListData();
    }

    requestQueryData(queryParam) {
        this.reqData.reqParams.page = 1;
        this.requestListData(queryParam);
    }

    requestListData(params) {
        let queryParam = Object.assign({}, this.reqData.reqParams);
        if (params) {
            Object.assign(queryParam, params);
        }

        this.requestData(queryParam);
    }

    processResponseData(data) {
        super.processResponseData(data);
        this.setState({total: data.total, dataList: data.list, current: data.page});
    }

    componentDidMount() {
        if (this.auto === true) {
            this.requestListData();
        }
        if (this.props.onRef) {
            this.props.onRef(this);
       }
    }
}