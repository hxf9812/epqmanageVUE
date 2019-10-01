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


Vue.config.productionTip = false

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
Vue.filter("status",function(rank){
  if(rank==1){
    return "管理员"
  }else if(rank==2){
    return "设备负责人"
  }else if(rank==3){
    return "用户"
  }			
})
new Vue({
  el: '#app',
  router,
  methods:{
     
  }
})
