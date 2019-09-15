import {DatePicker, Form, Input} from "antd";
import ReactTableAntd from "@/compenents/ReactTable_antd";
import React from "react";
import {ReactBoxAddFormAntd, ReactBoxEditFormAntd, ReactQueryFormAntd} from "@/compenents/ReactForm_antd";

@Form.create()
class DemoTableAddForm extends ReactBoxAddFormAntd {
    getRequestParam(fieldsValue) {
        return {
            name: fieldsValue.name
        };
    }

    itemContentElement =()=> {
        const {getFieldDecorator} = this.props.form;
        const config = {
            rules: [{type: 'object', false: true, message: 'Please select time!'}],
        };

        return (
            <span>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {initialValue: 'demo'})(<Input/>)}
                </Form.Item>
                <Form.Item label="Addr">
                    {getFieldDecorator('addr', {})(<Input/>)}
                </Form.Item>
                <Form.Item label="Age">
                    {getFieldDecorator('age', {})(<Input/>)}
                </Form.Item>
                <Form.Item label="Birth">
                    {getFieldDecorator('birth', config)(<DatePicker/>)}
                </Form.Item>
                <Form.Item label="Sex">
                    {getFieldDecorator('sex', {})(<Input/>)}
                </Form.Item>
            </span>
        );
    };
}

@Form.create()
class DemoTableEditForm extends ReactBoxEditFormAntd {
    getRequestParam(fieldsValue) {
        return {
            name: fieldsValue.name
        };
    }

    itemContentElement =()=> {
        const {getFieldDecorator} = this.props.form;
        const config = {
            rules: [{type: 'object', false: true, message: 'Please select time!'}],
        };

        return (
            <span>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {initialValue: 'demo'})(<Input/>)}
                </Form.Item>
                <Form.Item label="Addr">
                    {getFieldDecorator('addr', {})(<Input/>)}
                </Form.Item>
                <Form.Item label="Age">
                    {getFieldDecorator('age', {})(<Input/>)}
                </Form.Item>
                <Form.Item label="Birth">
                    {getFieldDecorator('birth', config)(<DatePicker/>)}
                </Form.Item>
                <Form.Item label="Sex">
                    {getFieldDecorator('sex', {})(<Input/>)}
                </Form.Item>

            </span>
        );
    };
}


@Form.create()
class DemoTableQueryForm extends ReactQueryFormAntd {
    getRequestParam(fieldsValue) {
        return {
            name: fieldsValue.name
        };
    }

    itemContentElement =()=> {
        const {getFieldDecorator} = this.props.form;

        return (
            <span>
                <Form.Item label="name">
                    {getFieldDecorator('name', {
                        initialValue: '',
                    })(
                        <Input
                            placeholder="姓名" allowClear={true}
                        />,
                    )}
                </Form.Item>
            </span>
        );
    };
}


class DemoTable extends ReactTableAntd {
    constructor(props) {
        super(props);

        Object.assign(this.tableConfig, {
            url: '/user/listpage',
            auto: true,
            delUrl: '/user/delete',
            addUrl: '/user/add',
            editUrl: 'user/edit',
            addFormElement: DemoTableAddForm,
            editFormElement: DemoTableEditForm,
            queryFormElement: DemoTableQueryForm,
            headerColumnsElement: this.getHeaderColumnsElement(),
        });
    }

    getHeaderColumnsElement() {
        return [
            {
                title: '序号',
                width: 80,
                key: 'id',
                render: (text, record, index) => ` ${index + 1}`
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Addr',
                dataIndex: 'addr',
                key: 'addr',
            },
            {
                title: 'Birth',
                dataIndex: 'birth',
                key: 'birth',
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',
            },
        ];
    }
}

export default DemoTable;
