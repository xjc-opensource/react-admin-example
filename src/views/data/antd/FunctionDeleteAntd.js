import {FunctionDelete} from "../FunctionDelete";
import {Modal, Spin} from "antd";
import React from "react";

export class FunctionDeleteAntd extends FunctionDelete {
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