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
import logRecord from '@/components/bodyModule/logRecord'
import welcome from '@/components/bodyModule/welcome'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/login',name:'login',component: login},
    {path:'/loginSuccess',name:'loginSuccess', component:loginSuccess ,
    	children:[
      {path: 'personalDetails',component: personalDetails},
      {path:'allUserInfo',component:allUserInfo},
      {path: 'alleqpment',component: alleqpment},
      {path: 'applyeqp',component: applyeqp},
      {path: 'failDeclare',component: failDeclare},
      {path: 'applydeal',component: applydeal},
      {path: 'logRecord',component: logRecord},
      {path:'welcome',component: welcome}
      ]
    }
  ]
})
