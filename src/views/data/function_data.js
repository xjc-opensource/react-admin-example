import React from "react";
import FunctionTable from "./function_table";
import ApiUrl from "@/api/apiurl";

class FunctionData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            funKey: ''
        }
    }

    componentDidMount() {
        this.requestData();
    }
    componentWillReceiveProps(nextProps) {
        this.requestData();
    }

    requestData () {
        let funKey = this.GlobalUtil.getQueryStringByName("action");
        console.log("componentWillReceiveProps funKey:", funKey);

        this.setState({
            funKey: funKey
        });
    }

    render() {
        return (
            <FunctionTable url={ApiUrl.DATA_FUN.SELECT} auto={false} funKey={this.state.funKey}>
            </FunctionTable>
        );
    }
}

export default FunctionData;