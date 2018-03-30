import React,{Component} from 'react'
import $http from '../../utils/http'
import SwiperCom from '../../components/swiper/swiperCom'
import SwiperShop from '../../components/swiper/swiperShop'
import './home.css'
import GoodsItem from '../../components/goodsComp/goodsItem'
import Notify,{notify} from '../../components/notify'

class Home extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            channel_id:3,
            caniquery:true
        }
        this.search=this.search.bind(this);
        this.scrolling=this.scrolling.bind(this);
    }
    search(){
        let {history}=this.props;
        history.push("/index/search")
    }
    render(){
        return <div id="wrap" onScroll={this.scrolling} ref="scroller">
            <div ref="doc">
                <header>
                    <a href="##">
                        <img src="/src/static/img/717.png" alt=""/>
                    </a>
                    <a href="##">
                        <i className="icon iconfont">&#xe62f;</i>
                        <input type="text" onFocus={this.search} placeholder="请输入您要购买的商品"/>
                    </a>
                    <a href="##">
                        <i className="icon iconfont">&#xe6cb;</i>
                        <span>我的店铺</span>
                    </a>
                </header>
                <div id="banner">
                    <SwiperCom></SwiperCom>
                </div>
                <section className="home_cat">
                    <dl>
                        <dt><img src={require('../../static/img/sec1.png')}/></dt>
                        <dd>牛奶乳品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec2.png')}/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec3.png')}/></dt>
                        <dd>休闲零食</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec4.png')}/></dt>
                        <dd>米面粮油</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec5.png')}/></dt>
                        <dd>调味调料</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec6.png')}/></dt>
                        <dd>酒水饮料</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec7.png')}/></dt>
                        <dd>生鲜果蔬</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/sec8.png')}/></dt>
                        <dd>进口食品</dd>
                    </dl>
                </section>
                <div id="home_shop">
                    <h3>商城动态</h3>
                    <SwiperShop></SwiperShop>
                </div>
                <div className="good_list">
                    {
                        this.state.goodslist.map((item,index)=>{
                            return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                        })
                    }
                </div>
                <Notify ref="notify" container={'#index'}/>
            </div>
            <div id="home_bot">我是有底线的...</div>
        </div>
    }
    componentDidMount(){
        window.mountNotify = this.refs.notify.mountNotify;
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodslist:JSON.parse(res).data.data
            })
        })
    }
    scrolling(){
        if(this.state.channel_id>9) return;
        if(!this.state.caniquery) return;
        let {scroller,doc}=this.refs;
        let st=scroller.scrollTop;
        let sw=scroller.offsetHeight;
        let dh=doc.offsetHeight;

        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            console.log('满足条件，请求数据');
            this.setState({
                channel_id:++this.state.channel_id
            })
            let {goodslist} = this.state;
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
            .then(res=>{
                this.setState({
                    goodslist:[...goodslist,...JSON.parse(res).data.data]
                })
                this.setState({
                    caniquery:true
                })
            })
        }
    }
}
export default Home