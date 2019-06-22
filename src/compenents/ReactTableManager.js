import React from 'react';
import {ReactTable_antd} from './ReactTable_antd';
import {Button, Divider, Modal, Spin} from 'antd';
import {ReactRequest} from './ReactRequest';

export class ReactTableManager extends ReactRequest {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            addControl: {
                visible: false,
                confirmLoading: false,
                content: null
            },

            edtControl: {
                visible: false,
                confirmLoading: false,
                content: null
            }
        });
    }

    reqData = {
        url: '',
        auto: false,
        delUrl: '',
        addUrl: '',
        editUrl: '',
        addFormElement: null,
        editFormElement: null,
        queryFormElement: null,
    };


    onRefTableList = (ref) => {
        this.tableListObj = ref;
    };

    onRefQueryForm = (ref) => {
        this.queryFormObj = ref;
    };

    onRefEditForm = (ref) => {
        this.editFormObj = ref;
    };

    onRefAddForm = (ref) => {
        this.addFormObj = ref;
    };

    queryTableList(queryParam) {
        this.tableListObj.requestQueryData(queryParam);
    }

    refreshTableList() {
        this.tableListObj.requestRefresh();
    }

    getAddFormElement() {
        if (this.reqData.addFormElement != null) {
           return React.createElement(this.reqData.addFormElement, {
                onRef: this.onRefAddForm,
                event: {endEvent: this.handleAddSucess.bind(this)},
                url: this.reqData.addUrl
            });
        }
    }

    getEditFormElement() {
        return   React.createElement(this.reqData.editFormElement, {
            onRef: this.onRefEditForm,
            event: {endEvent: this.handleAddSucess.bind(this)},
            url: this.reqData.editUrl
        });
    }

    getQueryFormElement(){
        return React.createElement(this.reqData.queryFormElement, {
            onRef: this.onRefQueryForm,
            event: {queryEvent: this.queryTableList.bind(this)},
        });
    }

    getHeaderColumns() {
    }

    handleDeleteData(id) {
        Modal.confirm({
            title: '',
            content: '确认要删除数据',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.requestDeleteData(id);
            }
        });
    }

    requestDeleteData(id) {
        console.log("requestDeleteData:" + id);
        let delParams = {id: id};

        super.requestDataExtendPost(this.reqData.delUrl, delParams);
    }

    processResponseData(data) {
        this.refreshTableList();
    }

    handleAddSucess = () => {
        this.refreshTableList();
    };

    handleEditData = record => {
        this.editFormObj.handleOpenShow();
    };

    getOperateEletemet() {
        return ([{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="link" onClick={this.handleEditData.bind(this, record)}><u>编辑</u></Button>
                    <Divider type="vertical"/>
                    <Button type="link" onClick={this.handleDeleteData.bind(this, record.id)}><u>删除</u></Button>
                </div>
            ),
        }]);
    }

    render() {
        let colElement = [].concat(this.getHeaderColumns(), this.getOperateEletemet());
        return (
            <div>
                <Spin spinning={this.state.loading}>

                    <div className="tableQueryPanel">
                        {this.getAddFormElement()}
                        {this.getEditFormElement()}
                        {this.getQueryFormElement()}
                    </div>
                    <ReactTable_antd onRef={this.onRefTableList} url={this.reqData.url} auto={this.reqData.auto}
                                     columns={colElement}>
                    </ReactTable_antd>
                </Spin>
            </div>
        );
    }
}

export default ReactTableManager;