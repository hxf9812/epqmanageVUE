<template>
	<div class='applydeal'>
		 
		<div id='result'>
			<div id='search'><h5>需要处理的申请表单</h5> </div>
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>id</th>
						<th>申请人</th>
						<th>设备管理员</th>
						<th>提交申请的设备</th>
						<th>设备是否已经被分配</th>
						<th colspan="2">处理方式</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in data.list" :key="item.id">
						<td>{{item.id}}</td>
                        <td>{{item.applyUser.name }}</td>
                        <td>{{item.applyedUser.name}}</td>
						<td>{{item.applyedEqp.belong}}实验室的{{item.applyeqp}}号机器</td>
						<td>{{item.applyedEqp.user | distributed}}</td>
						<td width="60px"><a @click.prevent="modifyIsdealed(item.id,item.applyedEqp.id,item.applyUser.account,1)">通过</a></td>
						<td width="60px"><a @click.prevent="modifyIsdealed(item.id,item.applyedEqp.id,item.applyUser.account,2)">驳回</a></td>
					</tr>
				</tbody>
			</table>
        </div>
		<div id='page' style="margin-top:10px;width: 600px;margin:auto">
           共{{data.total}}条数据 10条/页
            <div style="display:inline-block">
                <ul class="pagination" style="margin:0px;">
                    <li class="page-item"><a class="page-link" href="#"  @click.prevent="goto(data.nextPage)">上一页</a></li>
                     <li class="page-item"><a class="page-link" href="#" v-if="data.prePage-1>0">..</a></li>
                    <li class="page-item"><a class="page-link" href="#"  v-if="data.prePage>0" @click.prevent="goto(data.prePage)">{{data.prePage}}</a></li>
                    <li class="page-item"><a class="page-link" href="#" @click.prevent="goto(data.pageNum)">{{data.pageNum}}</a></li>
                    <li class="page-item"><a class="page-link" href="#" v-if="data.nextPage>0" @click.prevent="goto(data.nextPage)">{{data.nextPage}}</a></li>
                    <li class="page-item"><a class="page-link" href="#" v-if="data.lastPage-data.pageNum>1">..</a></li>
                    <li class="page-item"><a class="page-link" href="#" @click.prevent="goto(data.nextPage)" >下一页</a></li>
                </ul>
            </div>
            前往第<input style="display:inline-block;width:50px" v-model="data.pageNum" @keyup.enter="goto(data.pageNum
            )"  /> 页  
        </div>
	</div>
</template>

<script>
	export default {
		inject:["reload"],
		name: 'applydeal',
		data(){
			return{
				useraccount:this.getCookie('useraccount'),
				data:'',
			}
		},
		created(){
			 var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getAllApplyByWhoApplyed',
                method:'post',
                data:{
					pageNum:1,
					whoapplyed:obj.useraccount,
				},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true)
					obj.data=result.data.extend.ApplysByMaster
					else
					alert("出错")
              }
            }).catch(function(){
                alert("发现未知错误，请稍后再试")
            })
		},
		methods:{
			goto(pn){
                var obj = this;
                this.$axios({
                    url:'http://127.0.0.1:8081/getAllApplyByWhoApplyed',
                    method:'post',
                    data:{
                        pageNum:pn,
                        whoapply:obj.useraccount,
                    },
                    dataType:'json'
                }).then(function(result){
                    if(result.data!=''){
                        obj.data=result.data.extend.ApplysByMaster
                }
                }).catch(function(){
                    alert("发现未知错误，请稍后再试")
                })
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
			modifyIsdealed(applyid,applyeqpid,whoapplyaccount,isdealed){
						var obj=this
						this.$axios({
						url:'http://127.0.0.1:8081/modifyIsdealed',
						method:'post',
						data:{
							id:applyid,
							isdealed:isdealed,
							applyeqp:applyeqpid,
							whoapply:whoapplyaccount,
						},
						dataType:'json'
					}).then(function(result){
						if(result.data!=''){
							if(result.data.flag==true){
							obj.reload()
							alert("处理成功")
							}
							else alert("处理失败，请重试")
						}
					}).catch(function(){
						alert("发现未知错误，请稍后再试")
					})
			}
		}
	}
</script>

<style>
	.applydeal{
		height: 150%;
        background-color: rgb(142, 162, 182);
	}
	.applydeal #fill{
		height: 6%;
	}
	.applydeal a{
		display: inline-block;
		background-color: rgb(206, 188, 188);
	}
	.applydeal a:hover{
		background-color: rgb(175, 160, 160);
	}
	.applydeal button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.applydeal #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
	.applydeal #result{
        height: 80%;
        border:1px solid white;
        margin:5% 5% 0 5%;
		background-color:rgb(152, 164, 175);
		border-radius: 10px;
    }
</style>