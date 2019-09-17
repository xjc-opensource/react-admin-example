import React from "react";
import {Layout, Spin} from "antd";
import Session from '@/core/session';
import Api from '@/api/api';
import MessageBox from '@/core/message';
import './main.css';
import CustomHeader  from './customheader';
import CustomMenu from "./custommenu";
import DemoMenu from '@/demo/demoMenu';
import Router from '@/router/router'
import {connect} from "react-redux";
import * as UserAction  from '@/store/user/action.js'
import {withRouter} from 'react-router-dom'


const {Sider, Header, Content, Footer} = Layout;

@withRouter
@connect(
    state => ({
        user: state.userInfo
    }),
    {   getUserInfo: UserAction.get,
        setUserMenu: UserAction.setUserMenu,
    }
)

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.collapsed = false;
    }

    state = {
        collapsed: false,
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
            if (MessageBox.showLoadingMessage("正在退出登录")) {
                Api.postUrl(Api.Url.USER.LOGOUT, reqObj).then(() => {
                    MessageBox.closeLoadingMessage();
                    Session.deleteSession();
                    this.props.history.push('/login');
                }, () => {
                    MessageBox.closeLoadingMessage();
                    MessageBox.showErrorMessage("退出登录失败");

                    /*  message({
                          type: 'error', message: '退出登录失败'
                      });*/
                })
            }
        }
    }

    componentDidMount(){
        const menuList = [
            {key: '/home', title: '首页', icon: 'bank',},
            {
                key: '/homex', title: '基本组件', icon: 'laptop',
                subs: [
                    {key: '/homex/mqtt', linkPath:'/general/mqtt', title: 'mqtt', icon: '',},
                    {key: '/homex/about', linkPath:'/general/about', title: '关于', icon: '',},
                ]
            },
        ];

        if (true === this.GlobalEnvParams.DEMO_MENU) {
            menuList.push(...DemoMenu);
        }

        this.props.setUserMenu(menuList);
        this.props.getUserInfo();
    }

    render() {
     //   alert(JSON.stringify(this.props.user.menuList));
        return (
            <div id='page'>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div style={{height: '100vh', overflowY: 'auto'}}>
                        <div className="logo">React Admin Example</div>
                            <Spin spinning={this.props.user.loading} tip='菜单加载中...'>
                             <CustomMenu menus={this.props.user.menuList}/>
                            </Spin>
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
