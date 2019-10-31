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
				<button class='btn btn-primary' @click="registerForm">点我注册</button>
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
	setCookie(cname,cvalue,exdays){
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
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
			  if(result.data!=''){
				  var useraccount=result.data.account;
				  obj.setCookie("useraccount",useraccount);
			  	  obj.pageSkip()
			  }else{
			  alert("账号或者密码错误")
			  }
  		}).catch(function(){
			  alert("未知错误，请稍后再试")
		})
	},
	registerForm(){
		  var obj=this
		   this.$axios({
                url:'http://127.0.0.1:8081/register',
                method:'post',
                data:{
                    account:obj.account,
                    password:obj.password,
                    name:'',
                    phone:'',
                    userrank:3,
                },
                dataType:'json'
        	}).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true){
						 alert("成功注册")
				  		 obj.setCookie("useraccount",obj.account);
			  	 		 obj.pageSkip()
					}
					if(result.data.flag==false)
					alert(result.data.msg)
                }
            }).catch(function(){
					alert('未知错误，请稍后再试')
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
	height: 320px;
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
