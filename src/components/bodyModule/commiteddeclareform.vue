<template>
	<div class='commiteddeclareform'>

		<div id='result'>
			 <div id='search'><h4>已经提交的申请表单</h4> </div>
		    <table class="table table-bordered table-hover">
			
				<thead>
					<tr>
						<th width='5%'>设备号</th>
						<th  width='8%'>设备负责人</th>
						<th width='10%'>申报日期</th>
						<th width='62%'>申报内容</th>
						<th width='15%'>处理状态</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in data.list" :key="item.id">
						<td>{{item.eqpid}}</td>
                        <td>{{item.masterUser |accountToname }}</td>
                        <td>{{item.decalredate | timeFormat}}</td>
						<td>{{item.content}}</td>
						<td>{{item.dealstatus |declarestatus }}</td>
						
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
		name: 'commiteddeclareform',
		data(){
			return{
				useraccount:this.getCookie('useraccount'),
				data:'',
			}
		},
		created(){
			  var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getDeclareByDeclarant',
                method:'post',
                data:{
					pageNum:1,
					declarant:obj.useraccount,
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
			goto(pn){
                var obj = this;
                this.$axios({
                    url:'http://127.0.0.1:8081/getDeclareByDeclarant',
                    method:'post',
                    data:{
                        pageNum:pn,
                        isFree:this.isFree
                    },
                    dataType:'json'
                }).then(function(result){
                    if(result.data!=''){
                        obj.data=result.data.extend.declareList
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
	.commiteddeclareform{
		height: 100%;
        background-color: rgb(142, 162, 182);
	}
	.commiteddeclareform button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.commiteddeclareform #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
	.commiteddeclareform #result{
        height: 80%;
        border:1px solid white;
        margin:5% 5% 0 5%;
		background-color: rgb(152, 164, 175);
		border-radius: 10px;
    }
     .commiteddeclareform .table{
		table-layout: fixed;
	}
	.commiteddeclareform td{
		word-wrap:break-word;
	}
    .commiteddeclareform a{
		margin:0
	}
</style>