import React from "react";

//import {FunctionTableAntd as FunctionTable} from "./antd/FunctionTableAntd";
//import {FunctionDeleteAntd as FunctionDelete} from "./antd/FunctionDeleteAntd";
 import {FunctionTableElement as FunctionTable} from "./element/FunctionTableElement";
import {FunctionDeleteElement as FunctionDelete} from "./element/FunctionDeleteElement";
import ApiUrl from "../../api/apiurl";
import {Button, Form, Modal} from "antd";
import {FunctionReactBoxFormAntd} from "./FunctionField";

import {FunctionExport} from "./FunctionExport";

@Form.create()
class FunctionFieldListAntd extends FunctionReactBoxFormAntd {
}

class FunctionData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funKey: ''
        }
    }

    relationRef = {
        tableListObj: null,
        queryFormObj: null,
        addFormObj: null,
        updateFormObj: null,
        deleteObj: null,
        exportObj: null,
        importObj: null,
    };

    onRefQueryForm = (ref) => {
        this.relationRef.queryFormObj = ref;
    };

    onRefAddForm = (ref) => {
        this.relationRef.addFormObj = ref;
    };

    onRefUpdateForm = (ref) => {
        this.relationRef.updateFormObj = ref;
    };

    onRefTableListQuery = (ref) => {
        this.relationRef.tableListObj = ref;
    };

    onRefDelete = (ref) => {
        this.relationRef.deleteObj = ref;
    };

    onRefExport = (ref) => {
        this.relationRef.exportObj = ref;
    };

    onRefImport = (ref) => {
        this.relationRef.importObj = ref;
    };

    refreshTable = () => {
        this.relationRef.tableListObj.refreshTable();
    };

    handleEditData = (id) => {
        console.log("xx", this.relationRef.updateFormObj);
        this.relationRef.updateFormObj.handleEditData(id);
    };

    handleDeleteData = (id) => {
        Modal.confirm({
            title: '',
            content: '确认要删除数据',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.relationRef.deleteObj.handleDeleteData(id);
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id) {
            this.setFunKey(nextProps.match.params.id);
        } else {
            this.setFunKey(this.props.match.params.id);
        }
    }



    componentDidMount() {
        this.setFunKey(this.props.match.params.id);
    }

    setFunKey(id) {
       // let funKey = this.GlobalUtil.getQueryStringByName("action");
        if (!this.GlobalUtil.stringEmptyOrNull(id)) {
            let funKey = id;
            console.log("set funKey:", funKey);
            this.setState({
                funKey: funKey
            });
        }
    }

    render() {
        return (
            <div>
                <div className="functionBotton">
                    <Button type='inline' onClick={this.refreshTable}>刷新</Button>

                    <FunctionExport url={ApiUrl.DATA_FUN.EXPORT}
                                    funKey={this.state.funKey}
                                    onRef={this.onRefExport}
                        /* event={{endEvent: this.refreshTable}}*/
                    ></FunctionExport>

                    <FunctionFieldListAntd url={ApiUrl.DATA_FUN.QUERY_CMMIT}
                                           fieldListUrl={ApiUrl.DATA_FUN.QUERY_FIELDS}
                                           title="查询" showDesc="查询" funKey={this.state.funKey}
                                           onRef={this.onRefQueryForm}
                                           event={{endEvent: this.refreshTable}}
                    ></FunctionFieldListAntd>

                    <FunctionFieldListAntd url={ApiUrl.DATA_FUN.ADD_CMMIT} fieldListUrl={ApiUrl.DATA_FUN.ADD_FIELDS}
                                           title="增加" showDesc="增加"
                                           funKey={this.state.funKey}
                                           onRef={this.onRefAddForm}
                                           event={{endEvent: this.refreshTable}}
                    ></FunctionFieldListAntd>

                    <FunctionFieldListAntd url={ApiUrl.DATA_FUN.UPDATE_CMMIT}
                                           fieldListUrl={ApiUrl.DATA_FUN.UPDATE_FIELDS}
                                           title="编辑" showDesc="编辑"
                                           funKey={this.state.funKey}
                                           enableId={true}
                                           showStyleFlag={0}
                                           onRef={this.onRefUpdateForm}
                                           event={{endEvent: this.refreshTable}}
                    ></FunctionFieldListAntd>

                </div>

                <FunctionTable url={ApiUrl.DATA_FUN.SELECT} funKey={this.state.funKey}
                               onRef={this.onRefTableListQuery}
                               event={{
                                        editEvent: this.handleEditData,
                                        deleteEvent: this.handleDeleteData,
                                    }}
                ></FunctionTable>

                <FunctionDelete url={ApiUrl.DATA_FUN.DELETE}
                                funKey={this.state.funKey}
                                onRef={this.onRefDelete}
                                event={{endEvent: this.refreshTable}}
                ></FunctionDelete>

            </div>
        );
    }
}

export default FunctionData;