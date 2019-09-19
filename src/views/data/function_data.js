import React from "react";
import FunctionTable from "./function_table";
import ApiUrl from "@/api/apiurl";
import {Button, Form} from "antd";
import {FunctionReactBoxFormAntd} from "./function_field";

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
    };

    onRefQueryForm = (ref) => {
        this.relationRef.queryFormObj = ref;
    }

    onRefTableListQuery = (ref) => {
        this.relationRef.tableListObj = ref;
    }

    refreshTable = () => {
        this.relationRef.tableListObj.refreshTable();
    }

    componentDidMount() {
        this.setFunKey();
    }

    componentWillReceiveProps(nextProps) {
        this.setFunKey();
    }

    setFunKey() {
        let funKey = this.GlobalUtil.getQueryStringByName("action");
        console.log("componentWillReceiveProps funKey:", funKey);
        this.setState({
            funKey: funKey
        });
    }

    render() {
        return (
            <div>
                <div className="functionBotton">
                    <Button type='inline' onClick={this.refreshTable}>刷新</Button>

                    <FunctionFieldListAntd url={ApiUrl.DATA_FUN.QUERY_CMMIT}
                                           fieldListUrl={ApiUrl.DATA_FUN.QUERY_FIELDS}
                                           title="查询" showDesc="查询" funKey={this.state.funKey}
                                           onRef={this.onRefQueryForm}
                                           event={{endEvent: this.refreshTable}}></FunctionFieldListAntd>

                    <FunctionFieldListAntd url={ApiUrl.DATA_FUN.ADD_CMMIT} fieldListUrl={ApiUrl.DATA_FUN.ADD_FIELDS}
                                           title="增加" showDesc="增加"
                                           funKey={this.state.funKey}></FunctionFieldListAntd>

                    <FunctionFieldListAntd url={ApiUrl.DATA_FUN.UPDATE_CMMIT}
                                           fieldListUrl={ApiUrl.DATA_FUN.UPDATE_FIELDS}
                                           title="编辑" showDesc="编辑"
                                           funKey={this.state.funKey}></FunctionFieldListAntd>

                </div>

                <FunctionTable url={ApiUrl.DATA_FUN.SELECT} auto={false} funKey={this.state.funKey}
                               onRef={this.onRefTableListQuery}>
                </FunctionTable>
            </div>
        );
    }
}

export default FunctionData;