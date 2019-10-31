import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import loginSuccess from '@/components/loginSuccess'
import personalDetails from '@/components/bodyModule/personalDetails'
import allUserInfo from '@/components/bodyModule/allUserInfo'
import alleqpment from '@/components/bodyModule/alleqpment'
import applyeqp from '@/components/bodyModule/applyeqp'
import failDeclare from '@/components/bodyModule/failDeclare'
import applydeal from '@/components/bodyModule/applydeal'
import declareDeal from '@/components/bodyModule/declareDeal'
import logRecord from '@/components/bodyModule/logRecord'
import welcome from '@/components/bodyModule/welcome'
import commitedapplyform from '@/components/bodyModule/commitedapplyform'
import eqpreturn from '@/components/bodyModule/eqpreturn'
import commiteddeclareform from '@/components/bodyModule/commiteddeclareform'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',name:'login',component: login},
    {path:'/login',name:'login',component: login},
    {path:'/loginSuccess',name:'loginSuccess', component:loginSuccess ,
    	children:[
      {path:'',component:welcome},
      {path: 'personalDetails',name:'personalDetails',component: personalDetails},
      {path:'allUserInfo',name:'allUserInfo',component:allUserInfo},
      {path: 'alleqpment',name:'alleqpment',component: alleqpment},
      {path: 'applyeqp',name:'applyeqp',component: applyeqp},
      {path: 'failDeclare',name:'failDeclare',component: failDeclare},
      {path: 'applydeal',name:'applydeal',component: applydeal},
      {path: 'logRecord',name:'logRecord',component: logRecord},
      {path:'welcome',name:'welcome',component: welcome},
      {path:'commitedapplyform',name:'commitedapplyform',component: commitedapplyform},
      {path:'eqpreturn',name:'eqpreturn',component:eqpreturn},
      {path:'declareDeal',name:'declareDeal',component:declareDeal},
      {path:'commiteddeclareform',name:'commiteddeclareform',component:commiteddeclareform}
      ]
    }
  ]
})
