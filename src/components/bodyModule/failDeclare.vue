<template>
	<div class='failDeclare'>
		<div id='mainbody'>
			<h4> 设备故障申报表单 </h4><br/>
			<form class="form-horizontal">
				<div class="form-group">
					<label for="eqpid" class="col-sm-6 control-label">输入因损坏要申请维修的设备:</label>
					<div class="col-sm-6" style='margin-left:25%'>
					<input type="text" class="form-control" id='eqpid' v-model='eqpid'>
					</div>
				</div>
				<div class="form-group">
					<label for="declarecontent" class="col-sm-6 control-label">输入设备损坏原因或损坏情况:</label>
					<div class="col-sm-6" style='margin-left:25%'>
					<input type="text" class="form-control" id='declarecontent' v-model="content">
					</div>
				</div>
			</form>	
					<button type="submit" class="btn btn-default" @click="sendDeclare">点击申报</button>		
		</div>
	</div>
</template>

<script>
	export default {
		inject:["reload"],
		name: 'failDeclare',
		data(){
			return{
				eqpid:'',
				content:''
			} 
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
				sendDeclare(){
						if(this.content=='') {
							alert("设备故障原因不能为空")
							return
						}
						if(this.eqpid==''){
							alert("设备号不能为空")
							return
						}
						var obj = this;
						this.$axios({
						url:'http://127.0.0.1:8081/sendDeclare',
						method:'post',
						data:{
							declarant:obj.getCookie('useraccount'),
							eqpid:obj.eqpid,
							content:obj.content,
						},
						dataType:'json'
					}).then(function(result){
						if(result.data!=''){
							if(result.data.flag==true) {alert("设备故障申报成功");obj.reload()}
							else alert(result.data.msg)
					}
					}).catch(function(){
						alert("发现未知错误，请稍后再试")
					})
					
				}
		}

	}
</script>

<style>
	.failDeclare{
		height: 100%;
        background-color: rgb(142, 162, 182);
	}
	.failDeclare #mainbody{
		height: 70%;
		background-color: lightgrey;
		margin:5% 20% 0;
		text-align: center;
		border-radius: 10px;
	}
	.failDeclare button{
		width: 20%;
		background: rgb(180, 118, 118);
	}
</style>