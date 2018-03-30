import React,{Component,PureComponent} from 'react'
import {connect} from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
import './cart.css'
import CartItem from '../../components/cartItem/cartItem'

class Cart extends PureComponent{
    constructor(){
        super()
        this.state={
            str:'all',
            edit:'编辑',
            pay:'结算'
        }
        this.cartEdit=this.cartEdit.bind(this);
        this.toDelGoods=this.toDelGoods.bind(this);
    }
    render(){
        let {str,edit,pay} = this.state;
        let {cartList,totalCost,selectAll,selectedAll} = this.props;
        return <div id="cart">
            <header>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>购物车</span>
                <span onClick={this.cartEdit}>{edit}</span>
            </header>
            <div id="cart_list">
                {
                    cartList.map((item,index)=>{
                        return <CartItem key={'cartItem'+index} item={item}></CartItem>
                    })
                }
            </div>
            <div id="cart_foot">
                <span>
                    <i onClick={()=>{
                    this.setState({
                         str:str=='all'?'none':'all'
                    })
                    selectedAll(str)}} className={"all-btn icon iconfont "+(selectAll?'icon-duihao':'')}></i>全选
                </span>
                <span>
                    合计：
                    <b>￥{totalCost}</b>
                </span>
                <span onClick={this.toDelGoods}>{pay}</span>
            </div>
        </div>
    }
    cartEdit(){
        this.setState({
            edit:this.state.edit=='编辑'?'完成':'编辑',
            pay:this.state.edit=='编辑'?'删除':'结算'
        })
    }
    toDelGoods(){
        if(this.state.pay=='结算') return;
        let selectedID = [];
        this.props.cartList.forEach(item=>{
            if(item.selected==1){
                selectedID.push(item.goods_id)
            }
        })
        this.props.delCartGoods(selectedID)
    }
    componentDidMount(){
        this.props.fetchGoodsList(this.props.history)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)