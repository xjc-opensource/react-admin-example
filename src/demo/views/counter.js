import React from 'react';
import {connect} from 'react-redux';
import {reset, add, sub, addAsync, get} from '../../store/counter/action.js';


//使用注解的方式修改state和组件之间的传值
@connect(
    //你需要state当中的什么参数 取出来就会放到props相对的参数当中
    state => ({
        counter: state.counter
    }),
    //你需要state当中的什么方法就可以写到下面的大括号中就能被放到props当中 并且会自动dispatch
    {reset, add, sub, addAsync, get}
)
class Counter extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <div>
                    <h1>现在是数字几{this.props.counter.count}</h1>
                    {/*使用了connect之后这里不需要在手动的dispatch了直接调用即可*/}
                    <button onClick={this.props.add}>加</button>
                    <button onClick={this.props.sub}>减</button>
                    <button onClick={this.props.reset}>重置</button>
                    {/*这里点击完成之后就会触发异步方法 在两秒之后更新*/}
                    <button onClick={this.props.addAsync}>等两秒再加</button>
                </div>

                <div>
                    <h1>现在是数字几{this.props.counter.count}</h1>
                    {/*使用了connect之后这里不需要在手动的dispatch了直接调用即可*/}
                    <button onClick={this.props.add}>加</button>
                    <button onClick={this.props.sub}>减</button>
                    <button onClick={this.props.reset}>重置</button>
                    {/*这里点击完成之后就会触发异步方法 在两秒之后更新*/}
                    <button onClick={this.props.addAsync}>等两秒再加</button>
                </div>
            </div>
        )
    }
}

export default Counter;