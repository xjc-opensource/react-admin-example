import React from "react";
import {Spin, Table} from "antd";
import {ReactTableList} from "../../compenents/ReactTableList";

class FunctionTable extends ReactTableList {
    constructor(props) {
        super(props);
        this.setPostOperate();
        this.params.funKey = props.funKey;
    }

    params = {
        funKey: "",
    }

    onShowSizeChange(current, pageSize) {
        console.log({current: current, pageSize: pageSize});
        this.requestListPageData(current, pageSize, this.params);
    }

    onChange(pageNumber) {
        console.log('Page: ', pageNumber);
        this.setPageNum(pageNumber);
        this.requestListData(this.params);
    }

   componentWillReceiveProps(nextProps) {
        console.log("data funKey:", nextProps.funKey);
        if ((nextProps.funKey) && (nextProps.funKey.length >0)) {
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
        let resultData = {
        };

        if (data.fieldListInfo) {
            let columns = [];
            const textRender = (text, record, index) =>  <span>{text}</span>;

            for(let index in data.fieldListInfo) {
                const fieldsObj = data.fieldListInfo[index];
                let columnsItem = {
                    title: fieldsObj.fieldDesc,
                    dataIndex:fieldsObj.fieldName,
                    key: fieldsObj.fieldName,
                };

                columnsItem.render = textRender;
                columns.push(columnsItem);
            }
            resultData.columns = columns;
        }
        if (data.dataList) {
            resultData.list =  data.dataList;
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

export default FunctionTable;