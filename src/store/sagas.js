import {takeEvery} from 'redux-saga'
import {call,put} from 'redux-saga/effects'
import $http from '../utils/http'
import { getCookie } from '../utils/utils';
import {DELIVERY_LIST,DELIVERY_LIST_ERR} from '../store/reducer'

// 每一个saga就是一个generator函数

//worker saga
function* fetchData(){  
    // 使用call去请求数据，call(fn,param)
    // 实现异步转同步
    try{
        let res = yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3})
        //saga中替代dispatch来触发action的函数
        yield put({
            type:"TEST_SAGA",
            data:JSON.parse(res)
        })
    }catch(err){
        yield put({
            type:"TEST_SAGA_ERROR",
            data:err
        })
    }
    
}

function* fetchDelivery(){
    try{
        let res = yield call($http.post,'/user/Mail/list',{token:getCookie('token')})
        yield put({
            type:DELIVERY_LIST,
            data:res
        })
    }catch(err){
        yield put({
            type:DELIVERY_LIST_ERR,
            data:res
        })
    }
}

function* editDelivery(action) {  
    try{
        let res = yield call($http.post,'/user/Mail/editlist',{token:getCookie('token'),index:action.data})
        yield put({
            type:'EDIT_DELIVERY_INFO',
            data:res
        })
    }catch(err){
        yield put({
            type:'EDIT_DELIVERY_INFO_ERR',
            data:res
        })
    }
}

function* deleteDelivery(action) {  
    try{
        let res = yield call($http.post,'/user/Mail/deletelist',{token:getCookie('token'),index:action.data})
        yield put({
            type:'DELETE_DELIVERY_INFO',
            data:res
        })
    }catch(err){
        yield put({
            type:'DELETE_DELIVERY_INFO_ERR',
            data:res
        })
    }
}

//watch saga
function* watchFetch() {  
    // 监听每一个type为GET_GOODS_LIST的action
    yield takeEvery(['GET_GOODS_LIST'],fetchData)
}

function* watchDelivery() {  
    yield takeEvery(['GET_DELIVERY_LIST'],fetchDelivery)
}

function* watchEditDelivery() {  
    yield takeEvery(['EDIT_DELIVERY'],editDelivery)
}

function* watchDeleteDelivery() {  
    yield takeEvery(['DELETE_DELIVERY'],deleteDelivery)
}

export default function* rootSaga() {  
    yield [watchFetch(),watchDelivery(),watchEditDelivery(),watchDeleteDelivery()]
}