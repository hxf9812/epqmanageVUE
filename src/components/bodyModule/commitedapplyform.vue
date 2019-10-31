<template>
	<div class='commitedapplyform'>
	 
		<div id='result'>
			<div id='search'><h4>已经提交的申请表单</h4> </div>
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>id</th>
						<th>申请人</th>
						<th>设备管理员</th>
						<th>提交申请的设备</th>
						<th>处理结果</th>
						<th width="100px">清除申请记录</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in data.list" :key="item.id">
						<td>{{item.id}}</td>
                        <td>{{item.whoapply }}</td>
                        <td>{{item.applyedUser |accountToname}}</td>
						<td>{{item.applyedEqp.belong}}实验室的{{item.applyeqp}}号机器</td>
						<td>{{item.isdealed | isdealed}}</td>
						<td> <a style='margin:0' @click.prevent="deleteapply(item.id)">点击清除</a> </td>
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
		name: 'commitedapplyform',
		data(){
			return{
				useraccount:this.getCookie('useraccount'),
				data:[],
			}
		},
		created(){
			  var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getAllApplyByWhoApply',
                method:'post',
                data:{
					pageNum:1,
					whoapply:obj.useraccount,
				},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true)
					obj.data=result.data.extend.ApplysByUser
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
                    url:'http://127.0.0.1:8081/getAllApplyByWhoApply',
                    method:'post',
                    data:{
                        pageNum:pn,
                        whoapply:obj.useraccount,
                    },
                    dataType:'json'
                }).then(function(result){
                    if(result.data!=''){
                        obj.data=result.data.extend.ApplysByUser
                }
                }).catch(function(){
                    alert("发现未知错误，请稍后再试")
                })
            },
			getCookie(cname)
			{
			var n = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) 
			{
				var c = ca[i].trim();
				if (c.indexOf(n)==0) return c.substring(n.length,c.length);
			}
			return "";
			},
			deleteapply(applyid){
				var obj = this;
                this.$axios({
                url:'http://127.0.0.1:8081/deleteApplyById',
                method:'post',
                data:{
                    id:applyid
                },
                dataType:'json'
                }).then(function(result){
				if(result.data!=''){
					if(result.data.flag==true)
					obj.reload()
					if(result.data.flag==false)
					alert(result.data.msg)
				}
                }).catch(function(){
                alert("发现未知错误，请稍后再试")
                })
			}
		}
	}
</script>

<style>
	.commitedapplyform{
		height: 100%;
        background-color: rgb(142, 162, 182);
	}
	.commitedapplyform button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.commitedapplyform #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
	.commitedapplyform #result{
        height: 80%;
        border:1px solid white;
        margin:5% 5% 0 5%;
		background-color: rgb(152, 164, 175);
		border-radius: 10px;
    }
	.commitedapplyform a{
        text-align: center;
        display:block;
        text-decoration: none;
        background-color:rgb(206, 188, 188);
        border-radius: 2px;
    }
    .commitedapplyform a:hover{
        background-color:rgb(223, 204, 204);
    }
</style>