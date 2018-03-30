import React,{Component} from 'react'
import './login.css'
import $http from '../../utils/http'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch'

class Login extends Component{
    constructor(){
        super()
        this.toLogin = this.toLogin.bind(this)
    }
    render(){
        return <div id="login">
            <h3>
                <span><i className="icon iconfont">&#xe6b0;</i></span>
                <span>登录717</span>
                <span><Link to="/register">注册</Link></span>
            </h3>
            <div className="log">
                <p><i className="icon iconfont">&#xe638;</i><input type="text" placeholder="请输入您的用户名" className="username" ref="username"/></p>
                <p><i className="icon iconfont">&#xe65e;</i><input type="text" placeholder="请输入您的密码" className="password" ref="password"/></p>
                <p><button onClick={this.toLogin}>立即登录</button></p>
            </div>
        </div>
    }
    toLogin(){
        let {username,password} = this.refs;

        $http.post('/user/login',{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            if(res.success==1){
                // 把用户信息存储一份到store中
                this.props.saveUser(res.user);
                // 把用户信息存储一份到localStoage中
                localStorage.setItem('user-info',JSON.stringify(res.user))
                // 登录成功之后判断要跳转的页面
                let from = this.props.location.state?this.props.location.state.from || 'index/home':'index/home';
                document.cookie="token="+res.token
                this.props.history.replace(from)
            }else{
                alert("登录出错")
            }
        })
    }
}

export default connect(null,mapDispatchToProps)(Login)