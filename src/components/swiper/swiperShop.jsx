import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './swiperShop.css'

class SwiperShop extends Component{
    render(){
        return <div className="swiper-container shop" ref="sDom">
            <div className="swiper-wrapper">
                <div className="swiper-slide">7.17安全食品商城周年庆，暑期放假嗨不停！</div>
                <div className="swiper-slide">绿色无公害 无污染 无添加 天然有机蔬菜，吃的放心，健康第一！</div>
            </div>
        </div>
    }
    componentDidMount(){
        new Swiper(this.refs.sDom,{
            direction:'vertical',
            autoplay:true,
            loop:true
        })
    }
}

export default SwiperShop