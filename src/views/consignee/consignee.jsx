import React,{Component} from 'react'
import './consignee.css'
import propTypes from 'prop-types'
import Button from '../../components/button'
import Header from '../../components/header'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'
import Notify from '../../components/notify'
import {connect} from 'react-redux'

class Input extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        return <input type="text" ref={e=>{e&&(e.value=this.props.value||'')}} onChange={this.getVal} placeholder={this.props.placeholder}/>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
}
Input.propTypes={
    onChange:propTypes.func.isRequired
}

class Select extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        return <select onChange={this.getVal}>
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="天津">天津</option>
        </select>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
}
Select.propTypes={
    onChange:propTypes.func.isRequired
}

class Consignee extends Component{
    constructor(){
        super()
        this.toSave=this.toSave.bind(this)
        this.inputChange=this.inputChange.bind(this)
        this.name="";
        this.phone="";
        this.address="";
    }
    render(){
        let {editInfo,history} = this.props;
        console.log(editInfo)
        return <div id="consignee">
            <header>
                <Header history={history}><h1>收货人</h1></Header>
                <ul id="sign">
                    <li><Input placeholder="收货人姓名" onChange={(val)=>{this.inputChange('name',val)}} value={editInfo.name}/></li>
                    <li><Input placeholder="手机号" onChange={(val)=>{this.inputChange('phone',val)}} value={editInfo.phone}/></li>
                    <li>
                        <Select onChange={(val)=>{this.inputChange('province',val)}}></Select>
                        <Select onChange={(val)=>{this.inputChange('city',val)}}></Select>
                    </li>
                    <li><Select onChange={(val)=>{this.inputChange('region',val)}}></Select></li>
                    <li><Input placeholder="详细地址" onChange={(val)=>{this.inputChange('address',val)}} value={editInfo.address}/></li>
                </ul>
                <Button onClick={this.toSave}>保存</Button>
                <Notify container="#consignee" ref="tips"/>
            </header>
        </div>
    }
    inputChange(a,b){
        this[a]=b;
    }
    toSave(){
        let reg_exp_name = /([A-Za-z\d\u4e00-\u9fa5]+)$/g;
        let reg_exp_phone = /^1[3578]\d{9}$/;
        let {tips} = this.refs;
        if(!reg_exp_name.test(this.name)){
            tips.mountNotify('请输入姓名')
            return;
        }
        if(!reg_exp_phone.test(this.phone)){
            tips.mountNotify('请输入手机号')
            return;            
        }
        if(!this.province || !this.city || !this.region){
            tips.mountNotify('请选择省市区')
            return;
        }
        if(!this.address){
            tips.mountNotify('请填写街道')
            return;
        }
        $http.post('/user/Mail/addNew',{
            name:this.name,
            phone:this.phone,
            province:this.province,
            city:this.city,
            region:this.region,
            address:this.address,
            token:getCookie('token')
        }).then((res)=>{
            if(res.success==1){
                this.props.history.replace('/deliveryList')
            }
        })
    }
}

export default connect(function(state){
    return {
        editInfo:state.edit_info
    }
})(Consignee)