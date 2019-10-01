<template>
<div  class='personalDetails'>

			<div id='fill'></div>
			<div id='result'>
				<form class='form-horizontal'>
					<label>账号：<input type='text' class='form-control' readonly v-model="account"/></label><br/>
					<label>密码：<input type='text' class='form-control' v-model="password"/></label><br/>
					<label>姓名：<input type='text' class='form-control' v-model='name'/></label><br/>
					<label>电话：<input type='text' class='form-control' v-model="phone"/></label><br/>
				</form>
				<br/>
				<button @click="modifyUserInfo"> 点击修改个人信息 </button>
			</div>
		
</div>
</template>

<script>
	export default {
		name: 'personalDetails',
		data(){
			return {
			account:'',
			password:'',
			name:'',
			phone:''
			}
		},
		created(){
			// this.account=this.$route.query.userAccount
			this.account=this.getCookie("useraccount");
			var obj=this
			this.$axios({
				url:'http://127.0.0.1:8081/getUserByAccount',
                method:'post',
                data:{
					account:obj.account,
                },
                dataType:'json'
			}).then(function(result){
				console.log("success");
				if(result.data!=''){
				var d=result.data
				obj.password=d.password
				obj.name=d.name
				obj.phone=d.phone
				}else{
					alert("发现未知错误，请重新登录");
				}
			}).catch(function(){
				alert("sorry!远程出现未知错误")
			})
		},
		mounted(){
		},
		methods:{
			getCookie(cname)
			{
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) 
			{
				var c = ca[i].trim();
				if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return "";
			},
		modifyUserInfo(){
			var obj=this
			this.$axios({
				url:'http://127.0.0.1:8081/modifyUserInfo',
                method:'post',
                data:{
					account:obj.account,
					password:obj.password,
					name:obj.name,
					phone:obj.phone,
                },
                dataType:'json'
			}).then(function(result){
				console.log("success");
				if(result.data!=''){
					if(result.data.flag==true)
					location.reload()
					if(result.data.flag==false)
					alert("信息修改失败！请重试")
				}
			}).catch(function(){
				console.log("fail");
			})

		}
		}
	}
</script>

<style>
.personalDetails{
	height: 100%;
	position: relative;
}
.personalDetails #fill{
	height: 10%;
}
.personalDetails #result{
	padding:1%;
	margin: 0 25% 0 25%;
	background-color:lightgrey;
	border-radius: 25px;
	text-align: center;
}
.personalDetails button{
	width: 30%;
	margin: auto;
}

</style>