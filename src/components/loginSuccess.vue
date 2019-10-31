<template>
	
	<div class='loginSuccess'>
		
	 	<div id='headbox'>
			<div id='atitle'> 实验室设备维修和管理系统 </div>
			<div id='logout'>
				<router-link to="/loginSuccess/welcome"><i class="fa fa-desktop" aria-hidden="true"> home</i></router-link>
				<router-link to="/loginSuccess/personalDetails" > <i class="fa fa-user-circle-o" aria-hidden="true"> {{name}} </i>  </router-link>
				<router-link to="/login" v-on:click.native="logout"> logout <i class="fa fa-sign-out" aria-hidden="true"></i></router-link>
		  </div>
		</div>
	 
		<div id='leftbox'>
				<button @click="flag1=!flag1">+用户信息</button>

				<transition>
					<div v-if="flag1==true" class='downlist'> 
						<!-- <router-link :to="{path:'/loginSuccess/personalDetails',query:{userAccount:account}}" >个人信息</router-link> -->
						<router-link to="/loginSuccess/personalDetails"  :class="{active : active == 1}" v-on:click.native="active=1">个人信息</router-link>

						<div v-if='level==1'>
							<router-link to="/loginSuccess/allUserInfo" v-if="level==1" :class="{active : active == 2}" v-on:click.native="active=2">所有用户信息</router-link>
						</div>

					</div>
				</transition>

				<button @click="flag2=!flag2">+操作列表</button>

				<transition>
					<div v-if='flag2==true' class='downlist'> 
						<router-link to="/loginSuccess/alleqpment"  v-if="level<=2" :class="{active : active == 3}"  v-on:click.native="active=3">管理所有设备</router-link>
						<router-link to="/loginSuccess/applyeqp"  v-if="level"  :class="{active : active ==4}" v-on:click.native="active=4"> 申请设备</router-link>
						<router-link to="/loginSuccess/commitedapplyform"  v-if="level"   :class="{active : active == 5}" v-on:click.native="active=5">提交的申请表单</router-link>
						<router-link to="/loginSuccess/failDeclare" v-if="level" :class="{active : active == 6}" v-on:click.native="active=6">设备故障申报</router-link>
						<!-- 提示 铃声或者短信 -->
						<router-link to="/loginSuccess/applydeal" v-if="level<=2" :class="{active : active == 7}" v-on:click.native="active=7">设备申请处理</router-link>   
						<router-link to="/loginSuccess/declareDeal" v-if="level<=2" :class="{active : active == 8}" v-on:click.native="active=8">设备故障申报处理</router-link>   
						<!-- 图片上传  -->
						<router-link to="/loginSuccess/logRecord" v-if="3<=2" :class="{active : active == 9}" v-on:click.native="active=9">设备维修日志记录</router-link>  
						<router-link to="/loginSuccess/eqpreturn" v-if="level" :class="{active : active == 10}" v-on:click.native="active=10">设备归还</router-link>
						<router-link to="/loginSuccess/commiteddeclareform" v-if="level" :class="{active : active == 11}" v-on:click.native="active=11">用户已经发起的故障申报</router-link>
					</div>
				</transition>
		</div>
		<div id='bodybox'> <router-view v-if="isRouterAlive" ></router-view> </div>
		
	</div>
	
</template>

<script>
	export default{
		name:"loginSuccess",
		provide(){
			return{
			reload: this.reload
			}
		},
		data(){
			return{
				flag1: false,
				flag2: false,
				account:'',
				active:0,
				name:'',
				isRouterAlive:true,
				level:1,
			}
		},
		created(){
			var obj=this
			// 路由限制
			if(this.getCookie('useraccount')==null||this.getCookie('useraccount')==''){ 
				obj.$router.push({path:'/login'})
			}
			else obj.account=this.getCookie('useraccount')

			this.$axios({
						url:'http://127.0.0.1:8081/getUserByAccount',
						method:'post',
						data:{
							account:obj.account,
						},
						dataType:'json'
			}).then(function(result){
						if(result.data!=''){
						obj.name=result.data.name
						obj.level=result.data.userrank
						}else{
							alert("找不到指定用户，请重新登录");
							obj.$router.push({path:'/login'})
						}
			}).catch(function(){
						alert('发现未知错误，请稍后再试');
			})
		},
		methods:{
			getCookie(cname){
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) 
			{
				var c = ca[i].trim();
				if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return "";
			},
			logout(){
				document.cookie = "useraccount=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			},
			reload(){
				this.isRouterAlive=false;
				this.$nextTick(function(){
					this.isRouterAlive=true
				})
			}
		}
	}
</script>

<style>

.loginSuccess{
	background-image: none;
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
}
#leftbox  button{
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
#leftbox button:active {
  box-shadow: 0 3px #666;
  transform: translateY(2px);
}
#leftbox .v-enter,.v-leave-to{
	opacity: 0;
}
#leftbox .v-enter-active,.v-leave-active{
	transition:all 0.3s ease;
}
#leftbox  a{
	text-align: center;
	display: block;
	text-decoration: none;
	margin-left: 3vw;
	background-color:rgb(114, 155, 168);
	border-radius: 5px;
	color: black;
	margin-top: 1vw;
	margin-bottom: 1vw;
}
#leftbox a:hover{
    background-color: rgb(145, 198, 214);
}
#leftbox a:active{
	background-color:rgb(97, 134, 145);
}
#logout a{
	color:black;
	display: inline;
	background-color:#d2d7db;
	border-radius: 4px;
}
.active{
	border:2px solid rgb(131, 27, 58);
}
h4{
	font-size: 1.6vw
}
</style>