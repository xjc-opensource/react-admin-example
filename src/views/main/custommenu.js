import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd'

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
@withRouter
class CustomMenu extends React.Component {
    state = {
        openKeys: [],
        selectedKeys: []
    }

    linkPathKey = {};

    findKeyItem(key) {
        let item = this.linkPathKey[key];
        if (item) {
            return item;
        } else {
            return null;
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let currKey = nextProps.location.pathname + nextProps.location.search;
       // console.log("currKey:", currKey);
        let item = this.findKeyItem(currKey);
        if (item == null) {
            item = this.findKeyItem(nextProps.location.pathname);
        }
        //console.log("item:", item);
        if (item != null) {
            this.setState({
                selectedKeys: [item.key],
                openKeys: item.parentKey,
            })
        }
    }

    onOpenChange = (xkeys) => {
       let iLen = xkeys.length;
        this.setState({
            openKeys: xkeys,
            //selectedKeys: [],
        });
       if (iLen>0) {
            this.setState({
                openKeys: [xkeys[iLen-1]],
            });
        }
    }

    renderMenuItem = (parentKey,{key, icon, title, linkPath,}) => {
         let spath = key;
         if (linkPath) {
             spath = linkPath;
         }

         this.linkPathKey[spath] = { key: key, parentKey: parentKey};

        return (
            <Menu.Item key={key}>
                <Link to={spath}>
                    {icon && <Icon type={icon}/>}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    renderSubMenu = (parentKey, {key, icon, title, subs, linkPath}) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon}/>}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu([...parentKey].push(item.key),item) : this.renderMenuItem(parentKey, item)
                    })
                }
            </Menu.SubMenu>
        )
    }

    render() {
        const {openKeys, selectedKeys} = this.state
        return (
            <div>
                <Menu
                    onOpenChange={this.onOpenChange.bind(this)}
                    onClick={({key}) => this.setState({selectedKeys: [key]})}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    theme={this.props.theme ? this.props.theme : 'dark'}
                    mode='inline'>
                    {
                        this.props.menus && this.props.menus.map(item => {
                            return item.subs && item.subs.length > 0 ? this.renderSubMenu([item.key],item) : this.renderMenuItem([],item)
                        })
                    }
                </Menu>
            </div>
        )
    }
}

export default CustomMenu