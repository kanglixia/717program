import React,{Component} from 'react'
import './header.css'

class Header extends Component{
    constructor(){
        super()
        this.goBack=this.goBack.bind(this)
        this.goHome=this.goHome.bind(this)
    }
    render(){
        return <header id="headers">
            <span><i onClick={this.goBack} className="icon iconfont">&#xe6b0;</i></span>
            <span>{this.props.children}</span>
            <span><i onClick={this.goHome} className="icon iconfont">&#xe664;</i></span>
        </header>
    }
    goBack(){
        this.props.history.go(-1)
    }
    goHome(){
        this.props.history.push('/index/home')
    }
}

export default Header