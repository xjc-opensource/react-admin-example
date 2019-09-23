import {FunctionDelete} from "../FunctionDelete";
import React from "react";
import {Dialog, Loading} from "element-react";
import 'element-theme-default';

export class FunctionDeleteElement extends FunctionDelete {
    render() {
        return (
            <Dialog
                title="删除"
                size="tiny"
                visible={ this.state.showFlag }
                onCancel={ this.handleCloseShow }
            >
                <Dialog.Body>
                   {/* <Loading loading={this.state.loading} text='数据删除中...' />*/}
                    数据删除中...
                </Dialog.Body>
            </Dialog>
        )
    }
}