import React from "react";
import {ReactTableListAntd} from "@/compenents/ReactTableList_antd";

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
                render: (text, record, index) => <span>{text}</span>,
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
            <ReactTableListAntd url='/_mockjs/user/listpage' auto={true} columns={columns}>
            </ReactTableListAntd>
        );
    }
}

export default DemoTableList;