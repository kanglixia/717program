import React,{Component} from 'react'
import './index.css'
import $http from '../../utils/http'
import RouterWraper from '../../components/routeWraper'
import {NavLink} from 'react-router-dom'
import Toast from 'react-toast-mobile'
import 'react-toast-mobile/lib/react-toast-mobile.css'

class Index extends Component{
    render(){
        let {routes} = this.props;
        return <div id="index">
            <Toast/>
            <div className="con">
                <RouterWraper routes={routes}></RouterWraper>
            </div>
            <ul className="foot">
                <li>
                    <NavLink to="/index/home" activeClassName="active">
                        <i className="icon iconfont">&#xe664;</i>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/catagory" activeClassName="active">
                        <i className="icon iconfont">&#xe630;</i>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/cart" activeClassName="active">
                        <i className="icon iconfont">&#xe605;</i>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/mine" activeClassName="active">
                        <i className="icon iconfont">&#xe638;</i>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    }
}
export default Index