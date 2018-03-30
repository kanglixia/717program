import React,{Component} from 'react'
import './deliveryList.css'
import Header from '../../components/header'
import Button from '../../components/button'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch'
import mapStateToProps from './state'

class DeliveryList extends Component{
    constructor(){
        super()
        this.toConsignee=this.toConsignee.bind(this)
    }
    render(){
        let {history,deliveryList} = this.props;
        console.log(deliveryList)
        return (
            <div id="delivery">
                <header>
                    <Header history={history}><h1>收货地址</h1></Header>
                </header>
                <section id="delivery-con">
                {
                    deliveryList.length==0?
                    <p>null</p>
                    :
                    <ul>
                        {
                            deliveryList.map((item,index)=>{
                                return <li key={index}>
                                    <p><span>{item.name}</span>&nbsp;<span>{item.phone}</span></p>
                                    <p>{item.province+item.city+item.region}</p>
                                    <h5>
                                        <span onClick={()=>{this.toEdit(index)}}><i className="icon iconfont">&#xe64d;</i> 编辑</span>
                                        <span onClick={()=>{this.toDele(index)}}><i className="icon iconfont">&#xe609;</i> 删除</span>
                                    </h5>
                                </li>
                            })
                        }
                    </ul>
                }
                </section>
                <div>
                    <Button onClick={this.toConsignee}><i className="icon iconfont">&#xe604;</i>&nbsp;新增加地址</Button>
                </div>
            </div>
        )
    }
    toEdit(index){
        this.props.toEditDelivery(index)
        this.props.history.push('/consignee')
    }
    toDele(index){
        this.props.toDeleteDelivery(index)
    }
    toConsignee(){
        this.props.history.push('/consignee')
    }
    componentDidMount(){
        this.props.getDelivery()
    }
    componentWillMount(){
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliveryList)