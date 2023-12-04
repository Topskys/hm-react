import { Component } from "react";

export default class Counter extends Component {
    state = {
        count: 0,
    }

    setCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 返回false 阻止更新
        return true
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
    }

    getChildMsg = (childMsg) => {
        console.log(childMsg)
    }

    render() {
        return (
            <div>
                <Child msg={this.state.count} onGetChildMsg={this.getChildMsg} />
                <button onClick={this.setCount}>{this.state.count}</button>
            </div>
        );
    }
};


class Child extends Component {

    render() {
        return (
            <>
                <div>  child-{this.props.msg} </div>
                <button onClick={() => this.props.onGetChildMsg('子传父-消息')}>sendMsgToParent</button>
            </>
        );
    }
}