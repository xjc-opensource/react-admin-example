import React from "react";
import {Layout} from "antd";
import Session from '@/core/session';
import Api from '@/api/api';
import './main.css';
import CustomHeader  from './customheader';
import CustomMenu from "./custommenu";
import DemoMenu from '@/demo/demoMenu';
import Router from '@/router/router'

const {Sider, Header, Content, Footer} = Layout;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.collapsed = false;
    }

    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    loginOut() {
        let userParams = Session.getSessionData();
        if (userParams != null) {
            let reqObj = {};
            reqObj.userId = userParams.userId;
            reqObj.token = userParams.token;
            Api.postUrl(Api.Url.LOGOUT, reqObj).then(() => {
                Session.deleteSession();
                this.props.history.push('/login');
            }, () => {
                this.$message({
                    type: 'error', message: '退出登录失败'
                });
            })
        }
    }

    render() {
        const menuList = [
            {key: '/home', title: '首页', icon: 'bank',},
            {
                key: '/home/general', title: '基本组件', icon: 'laptop',
                subs: [
                    {key: '/home/mqtt', title: 'mqtt', icon: '',},
                    {key: '/home/about', title: '关于', icon: '',},
                ]
            },
        ];

        if (true === this.GlobalEnvParams.DEMO_MENU) {
            menuList.push(...DemoMenu);
        };


        return (
            <div id='page'>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div style={{height: '100vh', overflowY: 'auto'}}>
                        <div className="logo">React Admin Example</div>
                        <CustomMenu menus={menuList}/>
                        </div>
                    </Sider>
                    <Layout>
                        <Header className="header">
                            <CustomHeader collapsed={this.state.collapsed} onToggle={this.toggle}
                                    logout={this.loginOut.bind(this)}/>
                        </Header>
                        <Content className="mainContent">
                            <div style={{padding: 16, position: 'relative'}}>
                                <Router />
                            </div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>React-Admin-Example
                            ©2019-{new Date().format('yyyy')} Created by 56009090@qq.com
                            <a target='_blank'
                               href='https://github.com/xjc-opensource/react-admin-example' rel="nofollow me noopener noreferrer">  github地址</a>
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Main;
