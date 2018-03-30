import React,{Component} from 'react'
import {connect} from 'react-redux'
import mapDispatchToProps from './dispatch'

class CartItem extends Component{
    constructor(){
        super()
    }
    render(){
        let {toggleSelect,updateCount,item} = this.props;
        return (
            <div id="cart_lists">
                <div className="left">
                    <i onClick={()=>{toggleSelect((1-item.selected),item.goods_id)}} className={item.selected==0?'select-btn icon iconfont':'select-btn icon iconfont icon-duihao'}></i>
                </div>
                <dl>
                    <dt><img src={"http://www.lb717.com/"+item.obj_data} alt=""/></dt>
                    <dd>
                        <h2>{item.goods_name}</h2>
                        <h4>
                            <p>
                                <b>×{item.count}</b>
                                <b className="price">￥{item.discount_price}</b>
                            </p>
                            <p>
                                <span onClick={()=>{updateCount(--item.count,item.goods_id)}}>-</span>
                                <span className="num">{item.count}</span>
                                <span onClick={()=>{updateCount(++item.count,item.goods_id)}}>+</span>
                            </p>
                        </h4>
                    </dd>
                </dl>
            </div>
        )
    }
}
export default connect(null,mapDispatchToProps,null,{pure:false})(CartItem)