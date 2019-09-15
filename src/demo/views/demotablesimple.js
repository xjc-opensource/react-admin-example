import React from "react";
import {Table} from "antd";

class Demotablesimple extends React.Component {
    render() {
        const action = this.GlobalUtil.getQueryStringByName("action");

        const list = [{
            key:"42",
            value: '42岁'
        },{
            key:"32",
            value: '三十二岁'
        }];
        function finddata(value, list) {
            for(let i=0;i<list.length;i++){
                if (list[i].key === value) {
                    return list[i].value;
                }
            }
            return value;
        }

        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: {value:'32',list:list},
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '李三',
                age: {value:'42',list:list},
                address: '西湖区湖底公园2号',
                nameList: list
            },
        ];

        const xx = (text, record, index) =>  <span>{finddata(text.value, text.list)}</span>;
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record, index) =>  <span>{text + " " + action} </span>,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                render: xx,
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];

        const yy = <Table dataSource={dataSource} columns={columns} />;


        return (
          <div> {yy}</div>
        );
    }

    componentWillReceiveProps(nextProps) {
        //this.GlobalUtil.getQueryStringByName("action")
    }
}

export default Demotablesimple;