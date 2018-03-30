const fs = require('fs');
const http = require('http');
const jwt = require('jsonwebtoken');
const querystring=require("querystring");
const Mock = require('mockjs');
const _ = require('lodash');

function queryApi(url,methods,params){
    return new Promise((resolve,reject)=>{
        let data='';
        const options={
            hostname:"www.lb717.com",
            port:80,
            path:url,
            method:methods,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            }
        }
        let request=http.request(options,(response)=>{
            response.setEncoding("utf8");
            response.on("data",(chunk)=>{
                data+=chunk
            });
            response.on("end",()=>{
                resolve(JSON.stringify(data))
            })
        })
        if(methods.toLowerCase()=='post'){
            request.write(querystring.stringify(params))
        }
        request.end()
    })
}

module.exports = function (app) {  
    //商品列表的接口
    app.post('/mall/index/getGoodsChannel',function (req,res) {
        queryApi('/mall/index/getGoodsChannel','post',req.body)
        .then((data)=>{
            res.end(data)
        })
    })
    // 注册接口
    app.post('/user/register',function(req,res){
        console.log(req.body)
        let user = fs.readFileSync('user.json',{encoding:"utf-8"});
        user = JSON.parse(user);
        user.push(req.body);
        fs.writeFile('user.json',JSON.stringify(user),function(){
            res.end(JSON.stringify({
                "success":1,
                "info":"register success"
            }))
        })
    })
    // login api
    app.post('/user/login',function (req,res) {  
        let user=fs.readFileSync(__dirname+"/user.json",{encoding:"utf-8"});
        user=JSON.parse(user);
        let login=req.body;
        let resInfo={
            success:0,
            info:"用户名或密码错误",
            token:''
        }
        user.forEach(use=>{
            if(use.username==login.username&&use.password==login.password){
                resInfo.success=1;
                resInfo.info="login success",
                resInfo.user = {
                    name:use.username,
                    time:new Date().toLocaleDateString(),
                    nickName:'Selina'
                }
            }
        });
        if(resInfo.success==1){
            resInfo.token=jwt.sign(login,"selina",{
                expiresIn:60*60
            })
        }
        res.end(JSON.stringify(resInfo))
    })
    //添加购物车
    app.post('/user/Cart/addCart',function (req,res) {  
        jwt.verify(req.body.token,"selina",(err,decoded)=>{
            if(err){
                res.end(JSON.stringify({
                    info:'登录过期，请重新登录',
                    detail:err.TokenExpiredError
                }))
            }else{
                let cartInfo = JSON.parse(fs.readFileSync(__dirname+'/cart_info.json',{encoding:'utf-8'}))
                if(cartInfo[decoded.username]){
                    let recordList = cartInfo[decoded.username];
                    let flag = false;//新添加商品
                    recordList.forEach((item,index)=>{
                        if(item.goods_id==req.body.goods_info.goods_id){
                            ++item.count;
                            flag=true;//重复商品
                        }
                    })
                    if(!flag){
                        let record = req.body.goods_info;
                        record.count=1;
                        record.selected=0;
                        cartInfo[decoded.username].push(record)
                    }
                }else{
                    let record = req.body.goods_info;
                    record.count=1;
                    record.selected=0;
                    cartInfo[decoded.username]=[record]
                }
                fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cartInfo),function(){  
                    res.end("1")
                })
            }
        })
    })
    //分类接口
    app.get('/mobile/Category/categorySon',function (req,res) {  
        queryApi('/mobile/Category/categorySon'+'?'+querystring.stringify(req.query),'get')
        .then(data=>{
            res.json(data)
        })
    })
    //登录过后获取购物车的商品记录
    app.post('/user/Cart/goodsList',function (req,res) {  
        jwt.verify(req.body.token,"selina",(err,decoded)=>{
            if(err){
                res.end(JSON.stringify({
                    info:'登录过期，请重新登录',
                    detail:err.TokenExpiredError,
                    error:1
                }))
            }else{
                let goodsRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}));
                let goodsLists = goodsRecord[decoded.username] || [];
                res.json(goodsLists)
            }
        })
    })
    //删除购物车指定商品
    app.post('/user/Cart/delGoods',function (req,res) {  
        let cartRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}));
        jwt.verify(req.body.token,'selina',function (err,decoded) {  
            if(err){
                res.json(err)
            }else{
                let cartList = cartRecord[decoded.username];
                let delGoods = _.remove(cartList,function (item) {  
                    return req.body.selectedID.indexOf(item.goods_id)>-1
                })
                cartRecord[decoded.username]=cartList;
                fs.writeFile(__dirname+'/cart_info.json',JSON.stringify(cartRecord),function(){  
                    res.json({
                        success:1,
                        info:'删除成功',
                        delGoods:delGoods,
                        leftGoods:cartList
                    })
                })
            }
        })
    })
    //新加邮寄地址
    app.post('/user/Mail/addNew',function (req,res) {  
        jwt.verify(req.body.token,'selina',function (err,decoded) {  
            if(err){
                res.json(err)
            }else{
                let usr = decoded.username;
                let delivery = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}));
                delete req.body.token;
                if(delivery[usr]){
                    delivery[usr].push(req.body)
                }else{
                    delivery[usr] = [req.body]
                }
                fs.writeFile('./delivery.json',JSON.stringify(delivery),function (err) {  
                    if(err){
                        res.json(err)
                    }else{
                        res.json({
                            success:1,
                            info:'地址添加成功'
                        })
                    }
                })
            }
        })
    })
    //获取邮寄地址列表
    app.post('/user/Mail/list',function (req,res) {  
        jwt.verify(req.body.token,'selina',function (err,decoded){
            if(err){
                res.json(err)
            }else{
                let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}));
                res.json(list[decoded.username])
            }
        })
    })
    //删除邮寄地址列表
    app.post('/user/Mail/deletelist',function (req,res) {  
        jwt.verify(req.body.token,'selina',function (err,decoded){
            if(err){
                res.json(err)
            }else{
                let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))[decoded.username];
                list.splice(req.body.index,1);
                res.json(list)
            }
        })
    })
    //编辑邮寄地址列表
    app.post('/user/Mail/editlist',function (req,res) {  
        jwt.verify(req.body.token,'selina',function (err,decoded){
            if(err){
                res.json(err)
            }else{
                let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))[decoded.username];
                list.splice(req.body.index,1);
                res.json(list[req.body.index])
            }
        })
    })
}