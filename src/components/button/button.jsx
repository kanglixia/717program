import React,{Component} from 'react'
import './button.css'

class Button extends Component{
    render(){
        return <div id="btn">
            <button onClick={this.props.onClick} type="button">{this.props.children}</button>
        </div>
    }
}

export default Button