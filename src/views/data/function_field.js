import React from 'react';
import {Form, Input, Button, Modal, Spin, Select} from 'antd';
import {ReactForm} from "../../compenents/ReactForm";
import Api from "../../api/api";

export class FunctionReactBoxFormAntd extends ReactForm {
    constructor(props) {
        super(props);
        this.state.showFlag = false;
        this.state.haveField = false;
        this.state.comps = [];
        if (this.props.title) {
            this.boxConfig.title = this.props.title;
        }
        if (this.props.fieldListUrl) {
            this.fieldListUrl = this.props.fieldListUrl;
        }

        if (this.props.showStyleFlag) {
            this.showStyleFlag = this.props.showStyleFlag;
        }

        if (this.props.showDesc) {
            this.showDesc = this.props.showDesc;
        }
    }

    boxConfig = {
        title: '',
    };

    fieldListUrl = '';
    showStyleFlag = 1;
    showDesc = 'cmmit';
    showElement = null;

    getShowCmmitElement = ()=> {
        if (this.showStyleFlag === 0) {
            return this.showElement;
        }  if (this.showStyleFlag === 1) {
            return <Button type='inline' onClick={this.handleOpenShow}>{this.showDesc}</Button>;
        } else {
            return <Button type='link' onClick={this.handleOpenShow}>{this.showDesc}</Button>;
        }
    }

    handleOpenShow = (data) => {
        this.setState({showFlag: true, haveField: false, comps: []});
        this.requestFieldList();
    };

    requestFieldList = () => {
        let reqParams = {
            funKey: this.props.funKey,
        };
        this.setState({loading: true});
        Api.postUrl(this.fieldListUrl, reqParams).then(res => {
            this.setState({loading: false});
            if ((res.data) && (res.data.fieldListInfo)) {
                console.log("data:", res.data);
                this.setState({haveField:res.data.fieldListInfo.length > 0, comps: res.data.fieldListInfo});
            }
        }, () => {
            this.setState({loading: false});
        });
    }

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

            let reqParams = {
                funKey: this.props.funKey,
                fieldsList: fieldsValue,
            };
            console.log ("fieldsValue", fieldsValue);
            console.log(reqParams);

            this.requestDataExtendPost(this.props.url, reqParams);
            //
        });
    };

    handleEnd = () => {
        if ((this.props.event) && (this.props.event.endEvent)) {
            this.props.event.endEvent();
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
        const {comps, haveField} = this.state;
        const {getFieldDecorator} = this.props.form;

        let bootomElement = <Form.Item></Form.Item> ;
        if (haveField){
            bootomElement = <Form.Item
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
        }

        return (
            <span className="functionBotton">
                {this.getShowCmmitElement()}

                <Modal
                    title={boxConfig.title}
                    visible={this.state.showFlag}
                    onCancel={this.handleCloseShow}
                    footer={null}
                >
                    <Spin spinning={this.state.loading}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            {comps.map((comp, index) => {
                                return <Child key={index} data={comp} getFieldDecorator={getFieldDecorator}/>;
                            })}
                            {bootomElement}
                        </Form>
                    </Spin>
                </Modal>
            </span>
        );
    }
}

class Child extends React.Component {
    getLinkCompoent = (fieldObj) => {
        let linkSymbol = fieldObj.queryLinkName;
        let fieldLinkCode = fieldObj.fieldLinkCode;
       // linkSymbol = ">,<,=";
        if ((fieldLinkCode) && (fieldLinkCode.length>0)) {
            let linkAry = linkSymbol.split(",");
            if (linkAry.length <=0) {return ;}
            return this.props.getFieldDecorator(fieldLinkCode, {initialValue: linkAry[0]})(
                <Select style={{width: '20%'}}>
                    {linkAry.map((comp, index) => {
                        return <Select.Option value={comp}>{comp}</Select.Option>;
                    })}
                </Select>
            );
        }
    };


    getComponent = () => {
        let fieldObj = this.props.data;
        let {mustHaveValue, fieldCode,fieldDesc, dataValue, inputHint} = this.props.data;
        if (fieldObj.fieldType === 1) {
            return <Form.Item label={fieldDesc}>
                {this.getLinkCompoent(fieldObj)}
                {this.props.getFieldDecorator(fieldCode, {initialValue: dataValue,
                 /*   rules: [
                        {
                            required: mustHaveValue,
                            message: fieldDesc + "必填",
                        },
                    ]*/
                })(
                    <Input  style={{ width: '80%' }}
                        placeholder={inputHint}
                    />
                )}
            </Form.Item>;
        } else {
            return <Form.Item label={fieldDesc}>
                {this.getLinkCompoent(fieldObj)}
                {this.props.getFieldDecorator(fieldCode, {initialValue: dataValue,
                    /*   rules: [
                           {
                               required: mustHaveValue,
                               message: fieldDesc + "必填",
                           },
                       ]*/
                })(
                    <Input  style={{ width: '80%' }}
                            placeholder={inputHint}
                    />
                )}
            </Form.Item>;
        }
    }


    render() {
        return (<div>{this.getComponent()}</div>)
    }
}




