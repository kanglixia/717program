import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store/store'
import router from './router/router.config.js'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import RouterWraper from './components/routeWraper'
import './static/font/iconfont.css'
import './static/css/reset.css' 
import './static/css/common.css' 
import './static/css/goodsItem.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/index/home"></Redirect>
                <RouterWraper routes={router.routes}></RouterWraper>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)