import {FunctionBasetable} from "./FunctionBaseTable";
import Message from "../../core/message";

class FunctionTable extends FunctionBasetable {
    constructor(props) {
        super(props);
        this.setPostOperate();
        this.params.funKey = props.funKey;
    }

    params = {
        funKey: "",
    };

    requestFunctionData() {
        this.requestListData(this.params);
    }

    refreshTable = () => {
        this.requestFunctionData();
    }

    handeEditData = (record) => {
        let rowkey = this.reqData.rowKey;
        if (!this.GlobalUtil.stringEmptyOrNull(rowkey)) {
            let keyValue = record[rowkey];
            if ((this.props.event) && (this.props.event.editEvent)) {
                this.props.event.editEvent(keyValue);
            }
        } else {
            Message.showErrorMessage("rowkey is not define");
        }
    }

    handeDeleteData = (record) => {
        let rowkey = this.reqData.rowKey;
        if (!this.GlobalUtil.stringEmptyOrNull(rowkey)) {
            let keyValue = record[rowkey];
            if ((this.props.event) && (this.props.event.deleteEvent)) {
                this.props.event.deleteEvent(keyValue);
            }
        } else {
            Message.showErrorMessage("rowkey is not define");
        }
    };

    requestInitFunctionData(funKey) {
        if (!this.GlobalUtil.stringEmptyOrNull(funKey)) {
            this.params.funKey = funKey;
            this.setPageNum(1);
            this.requestListData(this.params);
        } else {
            Message.showErrorMessage("funKey is empty or null");
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("data funKey:", nextProps.funKey);
        if ((nextProps.funKey) && (nextProps.funKey.length > 0)) {
            this.requestInitFunctionData(nextProps.funKey);
        } else {
            this.requestInitFunctionData(this.props.funKey);
        }
    }
}

export default FunctionTable;