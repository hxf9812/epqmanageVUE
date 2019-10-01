<template>
		<div class='login'>
			<img src="../../static/avtar.png"/>
			
			<div id='bodybox'>
				<h3>实验室设备维修与申报系统</h3>

				<form class='form-horizontal'>
					<label>账号:
						<input class='form-control' v-model="account" />
					</label>
					<br/>
					<label>密码:
						<input class='form-control'   v-model="password"/>
					</label>
				</form>

				<button class='btn btn-primary' @click="loginForm">点我登录</button>
			</div>

			
		</div>	
</template>

<script>
	
	
export default {
  name: 'login', 
  data(){
  	return {
		  account:'',
		  password:'',

  	}
  },

  methods:{
	setCookie(cname,cvalue,exdays)
		{
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
		},
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
	pageSkip(){
		var obj = this;
		this.$router.push({path:'/loginSuccess',query:{account:obj.account}})
	},

  	loginForm(){
		var obj = this;
  		this.$axios({	  
  			url:'http://127.0.0.1:8081/login',
  			method:'post',
  			dataType:"json",
  			data:{
				  account:this.account,
				  password:this.password,
  			}
  		}).then(function(result){
			  console.log("success");
			  if(result.data!=''){
				  var useraccount=result.data.account;
				  obj.setCookie("useraccount",useraccount);
			  	  obj.pageSkip()
			  }else{
			  alert("账号或者密码错误")
			  }
  		}).catch(function(){
			  alert("sorry,登录出现错误")
		})
  	}
  }
}
</script>

<style>
body{
	background: url(../../static/bg1.jpg);
	background-size:cover;
}
.login{
	position:absolute;
	height: 50%;
	width: 40%;
	top:25%;
	left:30%;
	background-color: lightblue;
	border-radius: 20px;
}
.login img{
	height: 20%;
	margin: auto;
	display: block;
}
.login #bodybox{
	height: 80%;
	text-align: center;
	margin: auto
}
.login label{
	display:inline-block;
}
.login h3{
	font-size: 2vw;
}
.login{
	font-size:1vw;
}
</style>
