import React,{Component} from "react"
import "./search.css"
import {connect} from 'react-redux'

class Search extends Component{
    constructor(){
        super()
        this.state={
            historyList:[]
        }
        this.toSearch=this.toSearch.bind(this);
        this.clearHistory=this.clearHistory.bind(this);
        this.testSaga=this.testSaga.bind(this);
    }
    render(){
        let {historyList}=this.state;
        let {goodsList} = this.props;
        return <div id="search">
            <header>
                <input type="text" ref="words" placeholder="请输入你要购买的商品"/><i className="icon iconfont">&#xe62f;</i>
                <button onClick={this.toSearch}>搜索</button>
            </header>
            <section className="recent-search">
                <p>
                    <span>最近搜索</span><i className="icon iconfont" onClick={this.clearHistory}>&#xe609;</i>
                </p>
                {historyList.length==0?<h3>暂无搜索记录...</h3>:
                    <ul>
                        {
                            this.state.historyList.map((item,index)=>{
                                return <li key={index} onClick={()=>this.toResult(item)}>{item}</li> 
                            })
                        }
                    </ul>
                }
            </section>
            <section className='common-search'>
                <p>大家都在搜</p>
                <ol>
                    <li>蜂蜜</li>
                    <li>三黄鸡</li>
                    <li onClick={this.testSaga}>红酒</li>
                </ol>
            </section>
        </div>
    }
    testSaga(){
        this.props.dispatch({
            type:"GET_GOODS_LIST"
        })
    }
    toSearch(){
        if(!this.refs.words.value) return;
        let words=this.refs.words.value;
        let ls=localStorage;
        if(ls.getItem("SearchHistory")){
            let arr=JSON.parse(ls.getItem("SearchHistory"));
            if(arr.indexOf(words)>-1)return;
            arr.push(words)
            ls.setItem("SearchHistory",JSON.stringify(arr))
        }else{
            ls.setItem("SearchHistory",JSON.stringify([words]))
        }
         this.props.history.push("/index/result",{
             words:this.refs.words.value
        })
    }
    toResult(words){
        this.props.history.push("/index/result",{
            words:words
        })
    }
    clearHistory(){
        localStorage.removeItem('SearchHistory');
        this.setState({
            historyList:[]
        })
    }
    componentDidMount(){
        if(localStorage.getItem("SearchHistory")){
            this.setState({
                historyList:JSON.parse(localStorage.getItem("SearchHistory"))
            })
        }
    }
}
export default connect(function(state){
    return {
        
    }
})(Search)