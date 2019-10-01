<template>
	
	<div class='loginSuccess'>
		
	 	<div id='headbox'>
			<div id='atitle'> 实验室设备维修和管理系统 </div>
			<div id='logout'>
				<router-link to="/loginSuccess/welcome"><i class="fa fa-desktop" aria-hidden="true"> home</i></router-link>
				<router-link to="/loginSuccess/personalDetails" > <i class="fa fa-user-circle-o" aria-hidden="true"> hxf </i>  </router-link>
				<router-link to="/login" v-on:click.native="logout"> logout <i class="fa fa-sign-out" aria-hidden="true"></i></router-link>
		  </div>
		</div>
	 
		<div id='leftbox'>
				<button @click="flag1=!flag1">+用户信息</button>

				<transition>
					<div v-if="flag1==true" class='downlist'> 
						<!-- <router-link :to="{path:'/loginSuccess/personalDetails',query:{userAccount:account}}" >个人信息</router-link> -->
						<router-link to="/loginSuccess/personalDetails" >个人信息</router-link>
						
					<br/>
						<router-link to="/loginSuccess/allUserInfo">所有用户信息</router-link>
					</div>
				</transition>

				<button @click="flag2=!flag2">+操作列表</button>

				<transition>
					<div v-if='flag2==true' class='downlist'> 
						<router-link to="/loginSuccess/alleqpment">管理所有设备</router-link>
						<br/>
						<router-link to="/loginSuccess/applyeqp">申请设备</router-link>
						<br/>
						<router-link to="/loginSuccess/failDeclare">设备故障申报</router-link>
						<br/>
						<!-- 提示 铃声或者短信 -->
						<router-link to="/loginSuccess/applydeal">设备申请处理</router-link>   
						<br/>
						<!-- 图片上传  -->
						<router-link to="/loginSuccess/logRecord">设备维修日志记录</router-link>  
					</div>
				</transition>
		</div>

		<div id='bodybox'> <router-view></router-view> </div>
		
	</div>
	
</template>

<script>
	export default{
		name:"loginSuccess",
		data(){
			return{
				flag1: false,
				flag2: false,
				// data: {account:'666',id:1,name:'hxf',password:'666',phone:139,rank:1}
				account:''
			}
		},
		created(){
			// this.account=this.$route.query.account
		},
		methods:{
			logout(){
				document.cookie = "useraccount=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
		}
	}
</script>

<style>

.loginSuccess{
	position: relative;
	height: 100%;
	background-color: rgb(142, 162, 182);
	font-size: 1vw;
}
.loginSuccess #headbox{
	width: 100%;
	position: fixed;
	background-color: #343a40;
	color:#fff;
	height: 4vw;
	z-index:2
}
.loginSuccess #atitle{
	display: inline-block;
	font-size: 2vw;
	margin:1vw 0 0 5vw;
}
.loginSuccess #logout{
	float:right;
	font-size: 1.2vw;
	padding: 1.6vw 2vw 0 0;
}
.loginSuccess #leftbox{
	height: 100%;
	width:15%;
	margin-top: 4vw;
	position: fixed;
	background-color: lightgrey;
	font-size: 1.2vw;
}
.loginSuccess  #bodybox{
	padding: 4vw 0  0 15%;
	height: 100%;
}
.loginSuccess  button{
	display: block;
	border: none;
	text-align: center;
	background-color: rgb(59, 90, 126);
	margin: 1vw 0 1vw;
	color: white;
	width: 100%;
	height: 2em;
	border-radius: 5px;
	outline: none;
}
.loginSuccess button:active {
  box-shadow: 0 3px #666;
  transform: translateY(2px);
}

.loginSuccess .v-enter,.v-leave-to{
	opacity: 0;
	transform: translateX(100px);
}
.loginSuccess .v-enter-active,.v-leave-active{
	transition:all 0.5s ease;
}
.loginSuccess  a{
	text-align: center;
	display: block;
	text-decoration: none;
	margin-left: 3vw;
	background-color:rgb(114, 155, 168);
	border-radius: 5px;
	color: black;
}
.loginSuccess  a:active{
	background-color:rgb(97, 134, 145);
}
#logout a{
	display: inline;
	background-color:#d2d7db;
}
</style>