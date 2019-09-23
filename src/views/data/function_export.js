import React from "react";
import {Button, Modal, Spin} from "antd";

import {FunctionRequest} from "./function_request";

export class FunctionExport extends FunctionRequest {
    constructor(props) {
        super(props);
        this.state.showFlag = false;
    }

    handleCloseShow = () => {
        super.cancelRequest();
        this.setState({showFlag: false});
        super.showLoadEnd();
    };

    handleEnd = () => {
        if ((this.props.event) && (this.props.event.endEvent)) {
            this.props.event.endEvent();
        }
    };

    handleExportData = () => {
        this.setState({showFlag: true});

        let reqParams = {
            funKey: this.props.funKey,
        };

        console.log(reqParams);
        this.requestDataExtendPost(this.props.url, reqParams);
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
            <span className="functionBotton">
            <Button type='inline' onClick={this.handleExportData}>导出</Button>
            <Modal
                title={'导出'}
                visible={this.state.showFlag}
                onCancel={this.handleCloseShow}
                footer={null}
            >
                <Spin spinning={this.state.loading} tip='数据导出中...'>

                </Spin>
            </Modal>
                </span>
        );
    }
}