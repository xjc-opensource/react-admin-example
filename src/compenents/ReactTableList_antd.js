import React from "react";
import {Table, Spin} from "antd";
import {ReactTableList} from "./ReactTableList";

export class ReactTableList_antd extends ReactTableList {
    constructor(props) {
        super(props);
        this.state.columns = props.columns;
        this.state.dataList = [];
    }

    onShowSizeChange(current, pageSize) {
        console.log({current: current, pageSize: pageSize});
        this.requestListPageData(current, pageSize);
    }

    onChange(pageNumber) {
        console.log('Page: ', pageNumber);
        this.requestListPageData(pageNumber);
    }

    render() {
        return (
            <div>
                <Spin spinning={this.state.loading} tip='数据加载中...'>
                <Table columns={this.state.columns} dataSource={this.state.dataList} rowKey={this.reqData.rowKey}
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