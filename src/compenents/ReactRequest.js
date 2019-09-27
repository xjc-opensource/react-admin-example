import React from "react";
import Api from "@/api/api";

export const RequestType = {
    POST: 1,
    GET: 2
};

export class ReactRequest extends React.Component {
    constructor(props) {
        super(props);

        if (props.url) {
            this.setUrl(props.url);
        }
    }

    state = {
        loading: false
    }

    reqConfig = {
        type: RequestType.GET,
        url: "",
        reqParams: {}
    };

    source = null;

    componentWillUnmount() {
        this.cancelRequest();
    }

    cancelRequest() {
        if ((this.source) && (this.state.loading)) {
            let msg = '组件卸载,取消请求';
            console.log(msg);
            this.source.cancel(msg);
        }
    }

    setSource = (c) => {
        this.source = c;
    }
    
    setUrl = (url) => {
        this.reqConfig.url = url;
    }

    setOperate = (operateType) => {
        this.reqConfig.type = operateType;
    }

    setPostOperate = () => {
        this.setOperate(RequestType.POST);
    }

    requestDataExtend(url, params, reqType) {
        if (this.checkShowLoad() === true) {
            return;
        }

        this.showLoadStart();

        let reqParams = {};
        if (params) {
            Object.assign(reqParams, params);
        }

        let reqFun = Api.getUrl;
        if (reqType === RequestType.POST) {
            reqFun = Api.postUrl;
        }

        Object.assign(this.reqConfig, {
            type: reqType,
            url: url,
            reqParams: reqParams
        })

        reqFun(url, reqParams, this.setSource).then((res) => {
            console.log(res.data);
            this.showLoadEnd();
            this.processResponseData(res.data);

        }, (err) => {
            this.showLoadEnd();
            this.processResponseError(err);
        });
    }

    requestRefresh() {
        this.requestDataExtend(this.reqConfig.url, this.reqConfig.reqParams, this.reqConfig.type);
    }

    requestDataExtendPost(url, params) {
        this.requestDataExtend(url, params, RequestType.POST);
    }

    requestDataExtendGet(url, params) {
        this.requestDataExtend(url, params, RequestType.GET);
    }

    requestData(params) {
        this.requestDataExtend(this.reqConfig.url, params, this.reqConfig.type);
    }

    checkShowLoad() {
        return true === this.state.loading;
    }

    showLoadStart() {
        this.setState({loading: true});
    }
    showLoadEnd() {
        this.setState({loading: false});
    }

    processResponseData(data) {
        console.log("processResponseData:", data);
    }

    processResponseError(err) {
        console.log("processResponseError:", err);
    }
}