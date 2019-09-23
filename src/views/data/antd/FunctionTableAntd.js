import FunctionTable from "../FunctionTable";
import {Button, Spin, Table} from "antd";
import React from "react";

export class FunctionTableAntd extends FunctionTable {

    onShowSizeChange(current, pageSize) {
        console.log({current: current, pageSize: pageSize});
        this.setPageNum(current);
        this.setPageSize(pageSize)
        this.requestFunctionData();
    }

    onCurrentChange(pageNumber) {
        this.setPageNum(pageNumber);
        this.requestFunctionData();
    }

    processCustomResultData(data) {
        let resultData = {};
        let FieldType = this.FieldType;
        if (data.fieldListInfo) {
            let columns = [];
            const textRender = (text, record, index) => <span>{text}</span>;
            const edtRender = (text, record, index) => <Button disabled={Boolean({text})===false} type="link" onClick={this.handeEditData.bind(this, record) }><u>编辑</u></Button>;
            const delRender = (text, record, index) => <Button disabled={Boolean({text})===false} type="link" onClick={this.handeDeleteData.bind(this, record)}><u>删除</u></Button>;


            for (let index in data.fieldListInfo) {
                const fieldsObj = data.fieldListInfo[index];

                if (fieldsObj.extendType === FieldType.ftKey) {
                    resultData.rowKey = fieldsObj.fieldViewName;
                } else {
                    let fieldDes = fieldsObj.fieldDesc;
                    let render = textRender;

                    if (fieldsObj.extendType === FieldType.ftChkDel) {
                        render = delRender;
                    }

                    if (fieldsObj.extendType === FieldType.ftChkEdt) {
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
                            onChange: this.onCurrentChange.bind(this),
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