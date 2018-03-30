import React,{Component} from "react"
import "./catagory.css"
import $http from '../../utils/http'
class Catagory extends Component{
    constructor(){
        super()
        this.state={
            activeIndex:0
        }
    }
    render(){
        let catList=['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        return <div id="catagory">
           <header>
               <input type="text" placeholder="请输入你要购买的商品"/><i className="icon iconfont">&#xe62f;</i>
           </header>
           <div className="catagory_wrap">
             <div className="left">
                <ul>
                    {
                        catList.map((item,index)=>{
                            return <li key={index} className={this.state.activeIndex==index?'active':''} onClick={()=>{this.toggleActive(index)}}>{item}</li>
                        })
                    }
                </ul>
             </div>
            <div className="right">
            </div>
           </div>
        </div>
    }
    toggleActive(index){
        // $http.get('/mobile/Category/categorySon',{sonid:index+1}).then((res)=>{
        //     console.log(res)
        // })
        // $http.jsonp(url).then(res=>{
        //     console.log(res)
        // })
        this.setState({
            activeIndex:index
        })
    }
}
export default Catagory