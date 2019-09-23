import React from "react";
import FunctionTable from "../FunctionTable";
import {Button, Table, Loading, Pagination} from "element-react";
import 'element-theme-default';


export class FunctionTableElement extends FunctionTable {
    totalWidth = 0;
    getTextRender = (row, column, index) => {
        let value = row[column.prop]
        return <span className={'nowraptext'} style={{width: (column.width - 10) + 'px'}}>{value}</span>;
    };

    getUpdateRender = (row, column, index) => {
        let value = row[column.prop]
        let isDisabled = Boolean(parseInt(value)) === false;
        //console.log(value, " xx ", isDisabled);
        return <Button disabled={isDisabled}
                       size="small"
                       type="text"
                       onClick={this.handeEditData.bind(this, row) }
        ><u>编辑</u></Button>;
    };

    getDeleteRender = (row, column, index) => {
        let value = row[column.prop];
        let isDisabled = Boolean(parseInt(value)) === false;

        //console.log(value, "-xx", isDisabled);
        return <Button disabled={isDisabled}
                       size="small"
                       type="text"
                       onClick={this.handeDeleteData.bind(this, row) }
        ><u>删除</u></Button>;
    };

    processCustomResultData(data) {
        let resultData = {};
        let FieldType = this.FieldType;
        this.totalWidth = 0;
        if (data.fieldListInfo) {
            let columns = [];


            for (let index in data.fieldListInfo) {
                const fieldsObj = data.fieldListInfo[index];

                if (fieldsObj.extendType === FieldType.ftKey) {
                    resultData.rowKey = fieldsObj.fieldViewName;
                } else {
                    let fieldDes = fieldsObj.fieldDesc;
                    let render = this.getTextRender;
                    let columnsItem = {
                        label: fieldDes,
                        prop: fieldsObj.fieldViewName,
                        width: fieldsObj.width,
                        sortable: true,
                    };

                    if (fieldsObj.extendType === FieldType.ftChkDel) {
                        render = this.getDeleteRender;
                        columnsItem.sortable = false;
                       // columnsItem.fixed = 'right';
                    }

                    if (fieldsObj.extendType === FieldType.ftChkEdt) {
                        render = this.getUpdateRender;
                        columnsItem.sortable = false;
                      //  columnsItem.fixed = 'right';
                    }

                    this.totalWidth += columnsItem.width + 1;
                    columnsItem.render = render;
                    columns.push(columnsItem);
                }
            }

            columns.unshift(
                {
                    type: 'selection',
                });
            this.totalWidth += 44;
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

    getTableStyle() {
        return {width: (this.totalWidth) + 'px', marginTop: 20};
    }

    onShowSizeChange(pageSize) {
        this.setPageSize(pageSize)
        this.requestFunctionData();
    }

    onCurrentChange(pageNumber) {
        this.setPageNum(pageNumber);
        this.requestFunctionData();
    }

    render() {
        return (
            <div align="center" className={'functionTable'}>
                <Loading loading={this.state.loading} text='数据加载中...'>
                    <Table
                        style={this.getTableStyle()}
                        columns={this.state.columns}
                        height={500}
                        maxHeight={500}
                        stripe = {true}
                        border = {true}
                        highlightCurrentRow={true}
                        data={this.state.dataList}
                        rowKey={this.reqData.rowKey}
                    />
                    <div className="block">
                          <Pagination layout="total, sizes, prev, pager, next, jumper"
                                    onSizeChange={this.onShowSizeChange.bind(this)}
                                    onCurrentChange = {this.onCurrentChange.bind(this)}
                                    total={this.state.total}
                                    pageSizes={[10, 20, 30]}
                                    pageSize={this.state.pageSize}
                                    currentPage={this.state.current}/>
                    </div>
                </Loading>
            </div>
        );
    }
}