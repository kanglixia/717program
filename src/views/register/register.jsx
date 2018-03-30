import React,{Component} from 'react'
import './register.css'
import $http from '../../utils/http'
import {Link} from 'react-router-dom'

class Register extends Component{
    constructor(){
        super()
        this.toRegister = this.toRegister.bind(this)
    }
    render(){
        return <div id="regist">
            <h3>
                <span><i className="icon iconfont">&#xe6b0;</i></span>
                <span>注册717</span>
                <span><Link to="/login">登录</Link></span>
            </h3>
            <div className="reg">
                <p><i className="icon iconfont">&#xe638;</i><input type="text" placeholder="请输入您的用户名" className="username" ref="username"/></p>
                <p><i className="icon iconfont">&#xe65e;</i><input type="text" placeholder="请输入您的密码" className="password" ref="password"/></p>
                <p><button onClick={this.toRegister}>立即注册</button></p>
            </div>
        </div>
    }
    toRegister(){
        let {username,password} = this.refs;

        $http.post('/user/register',{
            username:username.value,
            password:password.value
        })
        .then(res=>{
            console.log(res)
            if(res.success==1){
                this.props.history.push("/login")
            }else{
                alert("注册出错")
            }
        })
    }
}

export default Register