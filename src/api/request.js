import Api from "./api";

export const RequestType = {
    POST: 1,
    GET: 2
};

export class Request {
    static createPostRequet(url) {
        let reqObj = new Request({});
        reqObj.setUrl(url);
        reqObj.setPostOperate();
        return reqObj;
    }

    source = null;
    setSource = (c) => {
        this.source = c;
    }

    reqConfig = {
        type: RequestType.GET,
        url: "",
        baseParam: {},
        loading: false,
    }

    setOperate = (operateType) => {
        this.reqConfig.type = operateType;
    }

    setUrl = (url) => {
        this.reqConfig.url = url;
    }

    setPostOperate = () => {
        this.setOperate(RequestType.POST);
    }

    setBaseParam = (param) => {
        if (param) {
            Object.assign(this.reqConfig.baseParam, param);
        }
    }

    setState(param) {
        Object.assign(this.state, param);
    }

    cancelReuqest() {
        if ((this.source)) {
            this.source.cancel('取消请求');
        }
    }

    requestData(params) {

        if (this.checkShowLoad() === true) {
            return;
        }
        this.showLoadStart();

        let reqParams = {};
        Object.assign(reqParams, this.reqConfig.baseParam);
        if (params) {
            Object.assign(reqParams, params);
        }

        let reqFun = Api.getUrl;
        if (this.reqConfig.type === RequestType.POST) {
            reqFun = Api.postUrl;
        }
        //console.log("xx", this.reqConfig.url, reqParams);
        reqFun(this.reqConfig.url, reqParams, this.setSource).then((res) => {
            console.log(res.data);
            this.showLoadEnd();
            this.processResponseData(res.data);

        }, (err) => {
            this.showLoadEnd();
            this.processResponseError(err);
        });
    }

    checkShowLoad() {
        return this.reqConfig.loading === true;
    }

    showLoadStart() {
        this.reqConfig.loading = true;
    }
    showLoadEnd() {
        this.reqConfig.loading = false;
    }

    processResponseData(data) {
        console.log("processResponseData:", data);
    }

    processResponseError(err) {
        console.log("processResponseError:", err);
    }
}