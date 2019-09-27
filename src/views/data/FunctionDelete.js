import {FunctionRequest} from "./FunctionRequest";

export class FunctionDelete extends FunctionRequest {
    constructor(props) {
        super(props);
        this.state.showFlag = false;
    }

    keyValue = null;

    handleCloseShow = () => {
        super.cancelRequest();
        this.keyValue = null;
        this.setState({showFlag: false});
        super.showLoadEnd();
    };

    handleEnd = () => {
        if ((this.props.event) && (this.props.event.endEvent)) {
            this.keyValue = null;
            this.props.event.endEvent();
        }
    };

    handleDeleteData = (keyValue) => {
        if (keyValue != null) {
            this.keyValue = keyValue;
            this.setState({showFlag: true});

            let reqParams = {
                funKey: this.props.funKey,
                id: this.keyValue,
            };

            console.log(reqParams);
            console.log(this.props.url);
            this.requestDataExtendPost(this.props.url, reqParams);
        }
    };

    processResponseData(data) {
        console.log("processResponseData:", data);
        if (data.cmmitResult) {
            if (data.cmmitResult.cmmitFlag === 1) {
                this.handleEnd();
                this.setState({showFlag: false});
            } else {
                let fieldMsg = "";
                if (data.cmmitResult.fieldErrorResult) {
                    let fieldErrorResult = data.cmmitResult.fieldErrorResult[0];
                    fieldMsg = "{0}-{1}-{2}".format(fieldErrorResult.error, fieldErrorResult.fieldCode, fieldErrorResult.fieldDesc);
                }
                alert("error:" + data.cmmitResult.cmmitFlag + ":" + fieldMsg);
            }
        }
    }
}