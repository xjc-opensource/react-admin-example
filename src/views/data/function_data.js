import React from "react";
import Function_table from "./function_table";
import ApiUrl from "@/api/apiurl";

class FunctionData extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        funKey: ""
    }

    componentWillReceiveProps(nextProps) {
        let funKey = this.GlobalUtil.getQueryStringByName("action");
        console.log("componentWillReceiveProps funKey:", funKey);

        this.setState({
            funKey: funKey
        })
    }

    render() {
        return (
            <Function_table url={ApiUrl.DATA_FUN.SELECT} auto={false} funKey={this.state.funKey}>
            </Function_table>
        );
    }
}

export default FunctionData;