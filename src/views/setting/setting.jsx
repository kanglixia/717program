import React,{Component} from 'react'
import {loginout} from '../../utils/utils'
import './setting.css'

class Setting extends Component{
    constructor(){
        super()
        this.logingout = this.logingout.bind(this)
    }
    render(){
        return <div id="setting">
            <header>
                <span><i className="icon iconfont">&#xe6b0;</i></span>
                <span>设置</span>
                <span>&nbsp;</span>
            </header>
            <div id="tui">
                <button type="button" onClick={this.logingout}>退出登录</button>
            </div>
        </div>
    }
    logingout(){
        loginout()
        this.props.history.push('/index/home')
    }
}

export default Setting