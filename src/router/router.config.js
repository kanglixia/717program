import React,{Component} from 'react'
import Home from '../views/home'
import Detail from '../views/detail'
import Login from '../views/login'
import Register from '../views/register'
import Index from '../views/index'
import Search from '../views/search'
import Catagory from '../views/catagory/catagory'
import Result from '../views/result/result'
import Mine from '../views/mine/mine'
import Cart from '../views/cart/cart'
import Consignee from '../views/consignee/consignee'
import DeliveryList from '../views/deliveryList/deliveryList'
import Setting from '../views/setting/setting'
// // 404页面
// import Err from '../views/err/err'

let router = {
    routes:[
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/setting',
            component: Setting
        },
        {
            path: '/consignee',
            component: Consignee
        },
        {
            path: '/deliveryList',
            component: DeliveryList
        },
        {
            path: '/index',
            component: Index,
            children:[
                {
                    path: '/index/home',
                    component: Home
                },
                {
                    path: '/index/catagory',
                    component: Catagory
                },
                {
                    path: '/index/cart',
                    component: Cart
                },
                {
                    path: '/index/mine',
                    component: Mine,
                    autohorization:true
                },
                {
                    path: '/index/search',
                    component: Search
                },
                {
                    path:'/index/result',
                    component:Result
                }
            ]
        }
    ]
}

export default router