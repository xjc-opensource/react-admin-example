import React from "react";
import {Modal, Spin} from "antd";

import {FunctionRequest} from "./function_request";

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
            this.requestDataExtendPost(this.props.url, reqParams);
        }
    }

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

    render() {
        return (
        <Modal
            title={'删除'}
            visible={this.state.showFlag}
            onCancel={this.handleCloseShow}
            footer={null}
        >
            <Spin spinning={this.state.loading} tip='数据删除中...'>

            </Spin>
        </Modal>
        );
    }
}