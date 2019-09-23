import React from "react";
import {Button, Form, Modal, Spin} from "antd";
import {ReactForm} from "../ReactForm";

export class ReactBoxFormAntd extends ReactForm {
    constructor(props) {
        super(props);
        this.state.showFlag = false;
    }

    boxConfig = {
        title: ""
    };

    showElement = null;

    handleOpenShow = (data) => {
        this.setState({showFlag: true});
    };

    handleCloseShow = () => {
        super.cancelRequest();
        this.setState({showFlag: false});
        super.showLoadEnd();
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', fieldsValue);

            let param = this.getRequestParam(fieldsValue);
            console.log(param);

            this.requestDataExtendPost(this.props.url, param);
            //
        });
    };

    handleEnd = () => {
        this.props.event.endEvent();
    };

    processResponseData(data) {
        console.log("processResponseData:", data);
        this.handleEnd();
        this.setState({showFlag: false});
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 22},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 22},
                sm: {span: 16},
            },
        };

        const boxConfig = this.boxConfig;

        return (
            <span className="tableform">
                {this.showElement}
                <Modal
                    title={boxConfig.title}
                    visible={this.state.showFlag}
                    onCancel={this.handleCloseShow}
                    footer={null}
                >
                    <Spin spinning={this.state.loading}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            {this.itemContentElement()}
                            <Form.Item
                                wrapperCol={{
                                    xs: {span: 24, offset: 0},
                                    sm: {span: 16, offset: 8},
                                }}
                            >
                                <Button type="primary" onClick={this.handleSubmit}>
                                    提交
                                </Button>
                                <Button onClick={this.handleCloseShow}>
                                    关闭
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>
            </span>
        );
    }
}

export class ReactBoxAddFormAntd extends ReactBoxFormAntd {
    constructor(props) {
        super(props);
        this.boxConfig.title = "增加";
        this.showElement = <span className='tableform'><Form layout="inline"><Form.Item><Button
            onClick={this.handleOpenShow}>增加</Button></Form.Item></Form></span>;
    }
}

export class ReactBoxEditFormAntd extends ReactBoxFormAntd {
    constructor(props) {
        super(props);
        this.boxConfig.title = '修改';
        //this.showElement = <Button type='link' onClick={this.handleOpenShow}><u>修改</u></Button>;
    }
}

export class ReactBoxQueryFormAntd extends ReactBoxFormAntd {
    constructor(props) {
        super(props);
        this.boxConfig.title = '查询';
        this.showElement = <Button type='inline' onClick={this.handleOpenShow}>查询</Button>;
    }
}


export class ReactQueryFormAntd extends ReactForm {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', fieldsValue);
            let param = this.getRequestParam(fieldsValue);
            this.props.event.queryEvent(param);
        });
    };

    render() {
        return (
            <span className="tableform queryform">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {this.itemContentElement()}
                    <Form.Item>
                        <Button onClick={this.handleSubmit}>
                        查询
                        </Button>
                    </Form.Item>
                </Form>
            </span>
        );
    }
}