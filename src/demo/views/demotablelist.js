import React from "react";
import {ReactTableList_antd} from "@/compenents/ReactTableList_antd";

class DemoTableList extends React.Component {
    render() {
        const columns = [
            {
                title: '序号',
                width: 80,
                key: 'id',
                render: (text, record, index) => ` ${index + 1}`
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <span>{text}</span>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'addr',
                key: 'addr',
            },
            {
                title: 'Birth',
                dataIndex: 'birth',
                key: 'birth',
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',

            },
        ];
        return (
            <ReactTableList_antd url='/user/listpage' auto={true} columns={columns}>
            </ReactTableList_antd>
        );
    }
}

export default DemoTableList;