import React,{Component} from 'react'
import ReactDOM from 'react-dom'

export class Notify extends Component{
    constructor(){
        super()
        this.state={
            isOpen:true
        }
        this.contentStyle={
            position:'fixed',
            left:'50%',
            top:'40%',
            transform:'translate3d(-50%,-50%,0)',
            padding:'10px 30px',
            background:'rgba(0,0,0,0.7)',
            color:'#fff',
            borderRadius: '10px'
        }
        this.openNotify=this.openNotify.bind(this)
    }
    render(){
        let {isOpen} = this.state;
        let {msg} = this.props;
        return isOpen?(<div id="notify" style={this.contentStyle}>
            <div>{msg}</div>
        </div>):null
    }
    openNotify(){
        this.setState({
            isOpen:true
        })
    }
}

// export class Loading extends Component{
//     constructor(){
//         super()
//         this.state={
//             isOpen:true
//         }
//         this.contentStyle={
//             position:'fixed',
//             left:'50%',
//             top:'40%',
//             transform:'translate3d(-50%,-50%,0)',
//             padding:'10px 30px',
//             background:'rgba(0,0,0,0.7)',
//             color:'#fff',
//             borderRadius: '10px'
//         }
//     }
//     render(){
//         let {isOpen} = this.state;
//         let {msg} = this.props;
//         return isOpen?(<div id="notify" style={this.contentStyle}>
//             <div style={this.contentStyle}>loading...</div>
//         </div>):null
//     }
// }

class NotifyProtals extends Component{
    constructor(){
        super()
        this.state={
            isMounted:false,
            renderTo:document.body,
            msg:'some message for you...'
        }
        this.mountNotify=this.mountNotify.bind(this)
    }
    render(){
        let {isMounted,renderTo,msg} = this.state;
        // let {type} = this.props;
        return isMounted?ReactDOM.createPortal(<Notify msg={msg}/>,renderTo):'';
    }
    componentDidMount(){
        let {container}=this.props;
        if(typeof container=='string'){
            let el = document.querySelector(container);
            this.setState({
                renderTo:el
            })
        }else{
            console.log('container目前只支持字符串')
        }
    }
    mountNotify(msg){
        this.setState({
            isMounted:true,
            msg
        })
        setTimeout(()=>{
            this.setState({
                isMounted:false
            })
        },2000)
    }
}

export default NotifyProtals