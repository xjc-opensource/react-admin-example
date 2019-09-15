import React from "react";
import DataTable from "./dataTable";
import ApiUrl from "@/api/apiurl";

class Data extends React.Component {
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
            <DataTable url={ApiUrl.DATA_SELECT} auto={false} funKey={this.state.funKey}>
            </DataTable>
        );
    }
}

export default Data;