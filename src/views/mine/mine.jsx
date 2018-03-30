import React,{Component} from 'react'
import './mine.css'
import {connect} from 'react-redux'
import mapStateToProps from './state'

class Mine extends Component{
    constructor(){
        super()
        this.toSetting = this.toSetting.bind(this)
        this.toDeliveryList= this.toDeliveryList.bind(this)
    }
    render(){
        let {userInfo} = this.props;
        return <div id="mine">
            <header>
                <span><i className="icon iconfont" onClick={this.toSetting}>&#xe65c;</i></span>
                <span>我的717商城</span>
                <span></span>
            </header>
            <section className="mine-user">
                <dl>
                    <dt><img src={require('../../static/img/mineT.png')} alt=""/></dt>
                    <dd>
                        <p>{userInfo.name}</p>
                        <p>{userInfo.nickName}</p>
                    </dd>
                </dl>
            </section>
            <div id="mine-shop">
                <span>
                    <i className="icon iconfont">&#xe6cb;</i>我的店铺
                </span>
                <span><i className="icon iconfont">&#xe639;</i></span>
            </div>
            <ul id="mine-order">
                <li>
                    <i className="icon iconfont">&#xe63f;</i>
                    <span>待付款</span>
                </li>
                <li>
                    <i className="icon iconfont">&#xe60a;</i>
                    <span>待发货</span>
                </li>
                <li>
                    <i className="icon iconfont">&#xe610;</i>
                    <span>待收货</span>
                </li>
                <li>
                    <i className="icon iconfont">&#xe68e;</i>
                    <span>售后</span>
                </li>
                <li>
                    <i className="icon iconfont">&#xe624;</i>
                    <span>我的订单<i className="icon iconfont">&#xe639;</i></span>
                </li>
            </ul>
            <ul id="mine-manage">
                <li>
                    <span><i className="icon iconfont">&#xe6bc;</i>我的社区</span>
                    <span><i className="icon iconfont">&#xe639;</i></span>
                </li>
                <li>
                    <span><i className="icon iconfont">&#xe63f;</i>账户余额</span>
                    <span><i className="icon iconfont">&#xe639;</i></span>
                </li>
                <li onClick={this.toDeliveryList}>
                    <span><i className="icon iconfont">&#xe618;</i>地址管理</span>
                    <span><i className="icon iconfont">&#xe639;</i></span>
                </li>
            </ul>
        </div>
    }
    toDeliveryList(){
        this.props.history.push('/deliveryList')
    }
    toSetting(){
        this.props.history.push('/setting')
    }
}
export default connect(mapStateToProps)(Mine)