import React,{Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

class SwiperComponent extends Component{
    render(){
        return <div className="swiper-container" ref="scDom">
            <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={require('../../static/img/banner1.png')} alt=""/></div>
                <div className="swiper-slide"><img src={require('../../static/img/banner2.png')} alt=""/></div>
                <div className="swiper-slide"><img src={require('../../static/img/banner3.png')} alt=""/></div>
                <div className="swiper-slide"><img src={require('../../static/img/banner4.png')} alt=""/></div>
            </div>
        </div>
    }
    componentDidMount(){
        new Swiper(this.refs.scDom,{
            autoplay:true,
            loop:true
        })
    }
}

export default SwiperComponent