<template>
	<div class='declareDeal'>
		<div id='fill'></div>
		 
		 <h4 style='text-align:center'>需要处理的故障申报表单</h4><br/>
		 <div id='search'>
				<label @click="howselect=0">查看未被处理的设备:<input type='radio' name='selecteqp' checked /></label> &nbsp;&nbsp;&nbsp;&nbsp;
				<label @click="howselect=1">查看已经故障认证的设备:<input type="radio" name='selecteqp'  ></label>&nbsp;&nbsp;&nbsp;&nbsp;
				<label @click="howselect=2">查看已经完成维修的设备:<input type='radio' name='selecteqp' /></label> 
		</div>
		<div id='result'>
		    <table class="table table-bordered table-hover">
			
				<thead>
					<tr>
						<th width='5%'>设备号</th>
						<th  width='8%'>申请人</th>
						<th width='10%'>申报日期</th>
						<th width='52%'>申报内容</th>
						<th width='10%'>处理状态</th>
						<th v-if="howselect==0 || howselect==1" colspan="1" width='5%'>申报处理</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in matching()" :key="item.id">
						<td>{{item.eqpid}}</td>
                        <td>{{item.declarantUser |accountToname }}</td>
                        <td>{{item.decalredate | timeFormat}}</td>
						<td>{{item.content}}</td>
						<td>{{item.dealstatus  |declarestatus }}</td>
						<td  width='5%' v-if="howselect==0"><a href="#" @click.prevent="declareEnsure(item.id)">故障认证</a></td>
						<td  width='5%'  v-if="howselect==1"><a href="#" @click.prevent="handleDeclare(item.id)" >完成维修</a></td>
					</tr>
				</tbody>
			</table>
        </div>
	</div>
</template>

<script>
	export default {
		inject:["reload"],
		name: 'declareDeal',
		data(){
			return{
				useraccount:this.getCookie('useraccount'),
				data:[],
				howselect:0
			}
		},
		created(){
			 var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getDeclareByMaster',
                method:'post',
                data:{
					master:obj.useraccount
				},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true)
					obj.data=result.data.extend.declareList
					else
					alert("出错")
              }
            }).catch(function(){
                alert('发现未知错误，请稍后再试');
            })
		},
		methods:{
			matching(){
				// var list=this.getnotusing()
				if(this.howselect==0){
					var newlist= this.data.filter(item=>{
								if(item.dealstatus==0){
									return item
								}
							})
					return newlist
				}
				else if(this.howselect==1){
					var newlist= this.data.filter(item=>{
							if(item.dealstatus==1){
								return item
							}
                        })
					return newlist
				}
				else{
					var newlist= this.data.filter(item=>{
							if(item.dealstatus==2){
								return item
							}
                        })
					return newlist
				}
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
			declareEnsure(id){
						var obj=this
						this.$axios({
						url:'http://127.0.0.1:8081/declareEnsure',
						method:'post',
						data:{
							id:id
						},
						dataType:'json'
					}).then(function(result){
						if(result.data!=''){
							if(result.data.flag==true){
							alert("认证成功")
							obj.reload()
							}
							else alert("失败")
						}
					}).catch(function(){
						 alert("发现未知错误，请稍后再试")
					})

			},
			handleDeclare(id){
				var obj=this
				this.$axios({
						url:'http://127.0.0.1:8081/handleDeclare',
						method:'post',
						data:{
							id:id
						},
						dataType:'json'
					}).then(function(result){
						if(result.data!=''){
							if(result.data.flag==true){
								alert("完成维修")
							obj.reload()
							}
							else alert("失败")
						}
					}).catch(function(){
						 alert("发现未知错误，请稍后再试")
					})
			}
		}
	}
</script>

<style>
	.declareDeal{
		height: 150%;
        background-color: rgb(142, 162, 182);
	}
	.declareDeal #fill{
		height: 6%;
	}
	.declareDeal a{
		color:black;
		text-align: center;
        display:block;
        text-decoration: none;
        background-color:rgb(206, 188, 188);
        border-radius: 2px;
	}
	.declareDeal a:hover{
        background-color:rgb(179, 164, 164);
	}
	.declareDeal button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.declareDeal #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
	.declareDeal #result{
        height: 80%;
        border:1px solid white;
        margin:0 5% 0 5%;
    }
	 .declareDeal .table{
		table-layout: fixed;
	}
	.declareDeal td{
		word-wrap:break-word;
	}
</style>