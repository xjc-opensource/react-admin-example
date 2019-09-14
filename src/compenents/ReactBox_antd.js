import React from "react";
import {Modal} from "antd";

export class ReactBoxAntd extends React.Component {
    handleAddShow = () => {
        const {data} = this.props;
        data.visible = true;
        data.confirmLoading = false;
        this.setState({});
    }

    handleAddOk = () => {
        const {data} = this.props;
        data.visible = true;
        data.confirmLoading = true;
        this.setState({});

        setTimeout(() => {
            data.visible = false;
            data.confirmLoading = true;
            this.setState({});
        }, 2000);
    };

    handleAddCancel = () => {
        console.log('Clicked cancel button');
        const {data} = this.props;
        data.visible = false;
        data.confirmLoading = false;
        this.setState({});
    };

    render() {
        const {data} = this.props;
        let dataElement = <div/>;
        if (data.content != null) {
            dataElement = data.content;
        }
        return (
            <Modal
                title="Title"
                visible={data.visible}
                onOk={this.handleAddOk}
                confirmLoading={data.confirmLoading}
                onCancel={this.handleAddCancel}
                footer= {null}
            >{dataElement}
            </Modal>
        )
    }
}
