<template>
	<div class='eqpreturn'>

		<div id='result'>
		<h4 style='text-align:center'>当前使用的设备</h4><br/>

		---鼠标悬停可查看管理员电话---
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>设备号</th>
						<th>设备管理员</th>
						<th>设备健康状态</th>
						<th>从属实验室</th>
						<th width="200px">归还设备</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td>{{item.id}}</td>
                        <td v-title='item.masterUser'>{{item.masterUser|accountToname }}</td>
                        <td>{{item.status | eqpstatus }}</td>
						<td>{{item.belong}}</td>
						<td><a href="#" style='margin:0' @click.prevent='eqpreturn(item.id)'>点击归还设备</a></td>
					</tr>
				</tbody>
			</table>
        </div>
	</div>
</template>

<script>
	export default {
		inject:["reload"],
		name: 'eqpreturn',
		data(){
			return{
				useraccount:this.getCookie('useraccount'),
				data:[],
			}
		},
		created(){
			  var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getEqpByUser',
                method:'post',
                data:{
					user:obj.useraccount,
				},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true)
					obj.data=result.data.extend.eqp
					else
					obj.$refs.eqpreturnmes.innerHTML=result.data.mes
              }
            }).catch(function(){
                alert('发现未知错误，请稍后重试')
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
			eqpreturn(id){
				var obj = this;
				this.$axios({
					url:'http://127.0.0.1:8081/returnEqp',
					method:'post',
					data:{
						id:id
					},
					dataType:'json'
				}).then(function(result){
					if(result.data!=''){
						if(result.data.flag==true)
						obj.reload()
						else
						alert("归还设备失败,请重新尝试")
				}
				}).catch(function(){
					alert('发现未知错误，请稍后重试')
				})
			}
		}
	}
</script>

<style>
	.eqpreturn{
		height: 100%;
        background-color: rgb(142, 162, 182);
	}
	.eqpreturn button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.eqpreturn #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
	.eqpreturn #result{
        height: 80%;
        border:1px solid white;
        margin:5% 5% 0 5%;
		background-color: rgb(147, 170, 175);
		border-radius: 10px;
    }
	.eqpreturn a{
		color:black;
		 text-align: center;
        display:block;
        text-decoration: none;
        background-color:rgb(206, 188, 188);
        border-radius: 2px;
	}
	.eqpreturn a:hover{	
        background-color:rgb(226, 209, 209);
	}
</style>