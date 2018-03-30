import React,{Component} from 'react'

class Dialog extends Component{
    render(){
        return <div id="mark">
            <div id="dialog">
                <p>确定要退出登录吗？</p>
                <p>确认</p>
            </div>
            <div id="off">取消</div>
        </div>
    }
}