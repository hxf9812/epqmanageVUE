<template>
<div  class='personalDetails'>
			<div id='result'>
				<h4>个人信息表</h4>
				<form class='form-horizontal'>
					<label>账号：<input type='text' class='form-control' readonly v-model="account"/></label><br/>
					<label>密码：<input type='text' class='form-control' v-model="password"/></label><br/>
					<label>姓名：<input type='text' class='form-control' v-model='name' /></label><br/>
					<label>电话：<input type='text' class='form-control' v-model="phone"/></label><br/>
				</form>
				<br/>
				<p ref='personalDetailsmes'></p>
				<button @click="modifyUserInfo"> 点击修改个人信息 </button>
			</div>
</div>
</template>

<script>
	export default {
		inject:["reload"],
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
				if(result.data!=''){
				var d=result.data
				obj.password=d.password
				obj.name=d.name
				obj.phone=d.phone
				}else{
					alert("无法获得指定用户信息，请重新登录");
					obj.$router.push({path:'/login'})
				}
			}).catch(function(){
				alert("发现未知错误，请稍后再试")
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
				if(result.data!=''){
					if(result.data.flag==true){
					// obj.$refs.personalDetailsmes.innerHTML ='修改成功'
					alert("修改成功")
					this.reload()
					}
					if(result.data.flag==false)
					alert('未检测到有任何修改')
				}
			}).catch(function(){
				console.log("发现未知错误，请稍后再试");
			})
			}
		}
	}
</script>

<style>
.personalDetails{
	position: relative;
}
.personalDetails #result{
	padding:1%;
	margin: 8% 25% 0 25%;
	background-color:lightgrey;
	border-radius: 25px;
	text-align: center;
}
.personalDetails button{
	width: 30%;
	margin: auto;
	outline: none;	
	}
</style>