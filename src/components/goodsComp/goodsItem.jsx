import React,{Component} from 'react'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'
import {ToastContainer,toast} from 'react-toastify'
import {connect} from 'react-redux'
import {ADD_CART} from './../../store/reducer'
// import {T} from 'react-toast-mobile'

class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart = this.addCart.bind(this)
    }
    render(){
        let {data} = this.props;
        return <dl className="goods_item" onClick={()=>{this.toDetail(data.goods_id)}}>
            <dt><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></dt>
            <dd>
                <p className="goods_detail">{data.goods_name}</p>
                <p>
                    <span className="goods_price">￥{data.discount_price}</span>
                    <span onClick={this.addCart} className="gwc"><i className="icon iconfont">&#xe605;</i></span>
                </p>
                <ToastContainer></ToastContainer>
            </dd>
        </dl>
    }
    addCart(e){
        e.stopPropagation()
        let {data} = this.props;
        if(getCookie('token')){
            $http.post('/user/Cart/addCart',{
                goods_id:data.goods_id,
                goods_info:data,
                token:getCookie('token')
            })
            .then((res)=>{
                if(res==1){
                    mountNotify('购物车添加成功')
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1,
                            selected:0
                        }
                    })
                }else{
                    // T.notify(res.info)
                    let {history,location} = this.props;
                    history.push('/login',{
                        from:location.pathname
                    })
                }
            })
        }else{
            let {history,location} = this.props;
            history.push('/login',{
                from:location.pathname
            })
        }
    }
    toDetail(goods_id){
        this.props.history.push('/detail?goods_id='+goods_id,{
            goods_id:goods_id
        })
    }
}

export default connect(null)(GoodsItem)