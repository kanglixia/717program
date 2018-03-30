import React,{Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {getCookie} from '../utils/utils'
function isLogin(){
    return !!getCookie('token')
}

class RouteWrapper extends Component{
    render(){
        const {routes} = this.props;
        return routes.map((item,index)=>{
            return <Route key={index} path={item.path} render={(location)=>{
                return item.autohorization&& !isLogin()?
                <Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect>
                :
                <item.component {...location} routes={item.children}></item.component>
            }}></Route>
        })
    }
}
export default RouteWrapper