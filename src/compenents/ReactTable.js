import React from 'react';
import {ReactRequest} from './ReactRequest';

export class ReactTable extends ReactRequest {
    constructor(props) {
        super(props);

        Object.assign(this.state, {
            addControl: {
                visible: false,
            },

            edtControl: {
                visible: false,
            }
        });
    }

    tableConfig = {
        url: '',
        auto: false,
        delUrl: '',
        addUrl: '',
        editUrl: '',
        addFormElement: null,
        editFormElement: null,
        queryFormElement: null,
        tableListElement: null,
        headerColumnsElement: []
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
        if (this.tableConfig.addFormElement != null) {
            return React.createElement(this.tableConfig.addFormElement, {
                onRef: this.onRefAddForm,
                event: {endEvent: this.handleAddSucess.bind(this)},
                url: this.tableConfig.addUrl
            });
        }
    }

    getEditFormElement() {
        return   React.createElement(this.tableConfig.editFormElement, {
            onRef: this.onRefEditForm,
            event: {endEvent: this.handleAddSucess.bind(this)},
            url: this.tableConfig.editUrl
        });
    }

    getQueryFormElement(){
        return React.createElement(this.tableConfig.queryFormElement, {
            onRef: this.onRefQueryForm,
            event: {queryEvent: this.queryTableList.bind(this)},
        });
    }

    getTableListElement() {
        let colElement;
        colElement = [].concat(this.tableConfig.headerColumnsElement , this.getOperateColumsElement());

        return React.createElement(this.tableConfig.tableListElement, {
            onRef: this.onRefTableList,
            url: this.tableConfig.url,
            auto: this.tableConfig.auto,
            columns: colElement,
        }, null);
    }

    getOperateColumsElement() {
    }


    handleDeleteData(id) {
    }

    requestDeleteData(id) {
        console.log("requestDeleteData:" + id);
        let delParams = {id: id};
        super.requestDataExtendPost(this.tableConfig.delUrl, delParams);
    }

    processResponseData(data) {
        this.refreshTableList();
    }

    handleAddSucess = () => {
        this.refreshTableList();
    };

    handleEditData = (record) => {
        this.editFormObj.handleOpenShow(record);
    };
}