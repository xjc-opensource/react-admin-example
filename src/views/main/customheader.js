import React from 'react'
import {Icon, Badge, Dropdown, Menu, Avatar} from 'antd'
import Screenfull from 'screenfull'
import {Link, withRouter} from 'react-router-dom'
import Session from '@/core/session'
import * as CounterAction  from '@/store/counter/action.js'
import {connect} from 'react-redux'

//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter
@connect(
    state => ({
        counter: state.counter
    }),
    {getCount: CounterAction.get}
)
class Customheader extends React.Component {
    state = {
        icon: 'arrows-alt',
        count: 10000,
        visible: false
    };

    componentDidMount() {
        this.props.getCount();

        Screenfull.onchange(() => {
            this.setState({
                icon: Screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
            })
        })
    };

    componentWillUnmount() {
        Screenfull.off('change')
    }

    toggle = () => {
        this.props.onToggle();
    };

    screenfullToggle = () => {
        if (Screenfull.enabled) {
            Screenfull.toggle();
        }
    };

    logout = () => {
        this.props.history.push(this.props.location.pathname);
    };

    render() {
        const {icon, count} = this.state;
        const {collapsed, location} = this.props;
        const isLogin = Session.isAuthSession();
        const userName = Session.getSessionData().userName;
        const notLogin = (
            <div>
                <Link to={{pathname: '/login', state: {from: location}}}
                      style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
                <img src={require('../../assets/user.png')} alt=""/>
            </div>
        );

        const menu = (
            <div>
                <Menu>
                    <Menu.Item key="2">
                        修改密码
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="3"><span onClick={this.props.logout}>退出登录</span></Menu.Item>
                </Menu>
            </div>
        );

        const login = (
            <div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div>
                        <span>{userName}</span>
                        <Avatar icon="user" shape="square"/>
                        <Icon type="down"/>
                    </div>
                </Dropdown>

            </div>
        );
        return (
            <div style={{backgroundColor: '#FFF'}}>
                <Icon
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    className='trigger'
                    onClick={this.toggle}/>
                <div style={{lineHeight: '64px', float: 'right'}}>
                    <ul className='header-ul'>
                        <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
                        <li onClick={() => this.setState({count: 0})}>
                            <Badge count={isLogin ? this.props.counter.count : 0} overflowCount={count}
                                   style={{marginRight: -17}}>
                                <Icon type="notification"/>
                            </Badge>
                        </li>
                        <li>
                            {isLogin ? login : notLogin}
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

export default Customheader