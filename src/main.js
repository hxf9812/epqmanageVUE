// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import $ from 'jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
Vue.prototype.$axios = axios
import 'font-awesome/css/font-awesome.css' 
import { read } from 'fs';


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  methods:{
     
  }
})
// 日期格式化
Vue.filter("timeFormat",function(time){
  var d=new Date(time);
  var yy=d.getFullYear();
  var mm=d.getMonth()+1;
  var dd=d.getDate();
  var hh=d.getHours();
  var MM=d.getMinutes();
  var ss=d.getSeconds();
  return yy+"-"+mm+"-"+dd+" "+hh+":"+MM+":"+ss			
})
// 身份格式化
Vue.filter("status",function(rank){
  if(rank==1){
    return "管理员"
  }else if(rank==2){
    return "设备负责人"
  }else if(rank==3){
    return "用户"
  }			
})
// 设备状态格式化
Vue.filter("eqpstatus",function(status){
  if(status==0){
    return "健康"
  }else if(status==1){
    return "损坏"
  }else{
    return "未知状态"
  }	
})
// 用户账号转用户姓名
Vue.filter("accountToname",function(user){
  if(user!=null){
    if(user.name!='') return user.name;
    else return '空的用户名'
  }
  return "空闲"
})
// 处理结果格式化
Vue.filter("isdealed",function(result){
  if(result==0){
    return "未被处理"
  }
  else if(result==1) return  "已经被通过"
  else return "未通过审核"
})
// 判断设备是否已经被分配
Vue.filter("distributed",function(result){
  if(result==null || result==''){
    return "未被分配"
  }
  else return "已被分配"
})
// 自定义标签 焦点
Vue.directive("focus",{
  bind : function(el){}, //数据处理阶段
  inserted : function(el){el.focus()},//dom渲染阶段
  updated :function(el){}
      }
  )
//自定义标签 title 
Vue.directive("title",{
  bind : function(el){}, //数据处理阶段
  inserted : function(el,binding){
    var user=binding.value
    if(user!=null)
    el.title="电话号码  "+user.phone
    else
    el.title="电话号码  未设置"
  },//dom渲染阶段
  updated :function(el){}
      }
  )
  // 设备故障处理状态格式化
Vue.filter("declarestatus",function(result){
  if(result==0){
    return "未被处理"
  }
  else if(result==1) return  "故障认证存在"
  else return "故障维修完毕"
})