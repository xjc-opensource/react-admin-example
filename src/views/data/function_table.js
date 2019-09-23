import React from "react";
import {Button, Spin, Table} from "antd";
import {FunctionBasetable} from "./function_basetable";
import {Field_Type} from "./field_constants";

class FunctionTable extends FunctionBasetable {
    constructor(props) {
        super(props);
        this.setPostOperate();
        this.params.funKey = props.funKey;
    }

    params = {
        funKey: "",
    };

    onShowSizeChange(current, pageSize) {
        console.log({current: current, pageSize: pageSize});
        this.requestListPageData(current, pageSize, this.params);
    }

    onChange(pageNumber) {
        console.log('Page: ', pageNumber);
        this.setPageNum(pageNumber);
        this.requestListData(this.params);
    }

    refreshTable = () => {
        this.requestListData(this.params);
    }

    handeEditData = (record) => {
        let rowkey = this.reqData.rowKey;
        if (!this.GlobalUtil.stringEmptyOrNull(rowkey)) {
            let keyValue = record[rowkey];
            if ((this.props.event) && (this.props.event.editEvent)) {
                this.props.event.editEvent(keyValue);
            }
        } else {
            alert("key is not define");
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
            alert("key is not define");
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("data funKey:", nextProps.funKey);
        if ((nextProps.funKey) && (nextProps.funKey.length > 0)) {
            this.params.funKey = nextProps.funKey;
            this.setPageNum(1);
            this.requestListData(this.params);
        } else {
            this.params.funKey = this.props.funKey;
            this.setPageNum(1);
            this.requestListData(this.params);
        }
    }


    processCustomResultData(data) {
        let resultData = {};

        if (data.fieldListInfo) {
            let columns = [];
            const textRender = (text, record, index) => <span>{text}</span>;
            const edtRender = (text, record, index) => <Button disabled={Boolean({text})===false} type="link" onClick={this.handeEditData.bind(this, record) }><u>编辑</u></Button>;
            const delRender = (text, record, index) => <Button disabled={Boolean({text})===false} type="link" onClick={this.handeDeleteData.bind(this, record)}><u>删除</u></Button>;


            for (let index in data.fieldListInfo) {
                const fieldsObj = data.fieldListInfo[index];

                if (fieldsObj.extendType === Field_Type.ftKey) {
                    resultData.rowKey = fieldsObj.fieldViewName;
                } else {
                    let fieldDes = fieldsObj.fieldDesc;
                    let render = textRender;

                    if (fieldsObj.extendType === Field_Type.ftChkDel) {
                        render = delRender;
                    }

                    if (fieldsObj.extendType === Field_Type.ftChkEdt) {
                        render = edtRender;
                    }
                    let columnsItem = {
                        title: fieldDes,
                        dataIndex: fieldsObj.fieldViewName,
                        width: fieldsObj.width,
                    };
                    columnsItem.render = render;
                    columns.push(columnsItem);
                }
            }
            resultData.columns = columns;
        }
        if (data.dataList) {
            resultData.list = data.dataList;
        }

        if (data.pageInfo) {
            resultData.total = data.pageInfo.total;
            resultData.pageNum = data.pageInfo.pageNum;
            resultData.pageSize = data.pageInfo.pageSize;
        }
        return resultData;
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    render() {
        return (
            <div>
                <Spin spinning={this.state.loading} tip='数据加载中...'>
                    <Table
                        className={"functionTable"}
                        columns={this.state.columns}
                        dataSource={this.state.dataList}
                        rowKey={this.reqData.rowKey}
                        size={'small'}
                        scroll={{y: 500}}
                        useFixedHeader = {true}
                        pagination={{
                            pageSizeOptions: ['10', '20', '30'],
                            showSizeChanger: true,
                            onChange: this.onChange.bind(this),
                            onShowSizeChange: this.onShowSizeChange.bind(this),
                            current: this.state.current,
                            total: this.state.total,
                            pageSize: this.state.pageSize,
                        }}>
                    </Table>
                </Spin>
            </div>
        );
    }
}

export default FunctionTable;