<template>
	<div class='alleqpment'>
        <div id="addaUser">
            <h4> 添加设备表 </h4>
            <form class='form-horizontal'>
					<label>管理者：<input type='text' class='form-control' v-model="master" placeholder="请输入你的账号"/></label>
                    <label>从属实验室：<input type='text' class='form-control' v-model="belong" placeholder="设备归属的实验室"/></label>
			</form>
            <br/>
            <button @click='addaeqp'> 点击添加一个设备 </button>
        </div>
        <div id='result'>
       <h4 style='text-align:center'>所有设备信息表</h4>
        <div id='search'> <span>添加查询条件</span> <input  placeholder="选择设备实验室" v-model="keywords"/> 
        <label @click="isFree=0">查看所有设备:<input type="radio" name='selecteqp'  ></label>&nbsp;&nbsp;&nbsp;
		<label @click="isFree=1">查看空闲设备:<input type='radio' name='selecteqp' checked /></label>
        <button @click="matchingAllEqp"><i class="fa fa-refresh" aria-hidden="true" ></i></button>	</div>
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>序号</th>
						<th>管理者</th>
						<th>购入日期</th>
						<th>当前使用者</th>
                        <th>可用状态</th>
                        <th>从属实验室</th>
                        <!-- <th>修改</th> -->
                        <th>删除</th>
					</tr>
				</thead>
				
				<tbody class='eqpinput'>
					<tr v-for="item in data.list" :key="item.id">
						<td>{{item.id}}</td>
                        <td>{{item.masterUser|accountToname }}</td>
                        <td>{{item.indate | timeFormat}}</td>
						<td>{{item.userUser| accountToname}}</td>
						<td>{{item.status | eqpstatus}}</td>
                        <td>{{item.belong}}</td>
                        <!-- <td><a @click.prevent="modifyaeqp(item.id,item.master,item.indate,item.user,item.status,item.belong)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td> -->
						<td><a @click.prevent="deleteaeqp(item.id)"><i class="fa fa-times" aria-hidden="true"></i></a></td>
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
        name: 'alleqpment',
        inject:["reload"],
        data(){
            return {
                data:{},
                master:'',
                indate:new Date(),
                user:null,
                status:0,
                belong:'',
                keywords:'',
                isFree:1,
            }
        },
        created(){
            var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getAllEqp',
                method:'post',
                data:{
                    pageNum:2,
                    isFree:this.isFree
                },
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
                    obj.data=result.data.extend.eqpList
              }
            }).catch(function(){
                 alert("发现未知错误，请稍后再试")
            })
        },
        methods:{
            matchingAllEqp(){
                var obj = this;
                this.$axios({
                    url:'http://127.0.0.1:8081/getAllEqp',
                    method:'post',
                    data:{
                        pageNum:1,
                        matching:this.keywords,
                        isFree:this.isFree
                    },
                    dataType:'json'
                }).then(function(result){
                    if(result.data!=''){
                        obj.data=result.data.extend.eqpList
                }
                }).catch(function(){
                    alert("发现未知错误，请稍后再试")
                })
            },
            goto(pn){
                var obj = this;
                this.$axios({
                    url:'http://127.0.0.1:8081/getAllEqp',
                    method:'post',
                    data:{
                        pageNum:pn,
                        matching:this.keywords,
                        isFree:this.isFree
                    },
                    dataType:'json'
                }).then(function(result){
                    if(result.data!=''){
                        obj.data=result.data.extend.eqpList
                }
                }).catch(function(){
                    alert("发现未知错误，请稍后再试")
                })
            },
            addaeqp(){
                var obj = this;
                this.$axios({
                url:'http://127.0.0.1:8081/addEqp',
                method:'post',
                data:{
                   id:obj.id,
                   master:obj.master,
                   indate:obj.indate,
                   user:obj.user,
                   status:obj.status,
                   belong:obj.belong,
                },
                dataType:'json'
                }).then(function(result){
                if(result.data!=''){
                    if(result.data!=''){
					if(result.data.flag==true)
					obj.reload()
					if(result.data.flag==false)
					alert("信息添加失败！请重试")
				}
                }
                }).catch(function(){
                alert("发现未知错误，请稍后再试")
                })
            },
            modifyaeqp(){
                 var obj=this
			    this.$axios({
				url:'http://127.0.0.1:8081/modifyaUser',
                method:'post',
                data:{
					account:account,
					password:password,
					name:name,
                    phone:phone,
                    userrank:userrank
                },
                dataType:'json'
			}).then(function(result){
				if(result.data!=''){
					if(result.data.flag==true)
					location.reload()
					if(result.data.flag==false)
					alert("信息修改失败！请重试")
				}
			}).catch(function(){
				console.log("fail");
			})
            },
            deleteaeqp(eqpid){
                var obj = this;
                this.$axios({
                url:'http://127.0.0.1:8081/deleteEqp',
                method:'post',
                data:{
                    id:eqpid
                },
                dataType:'json'
                }).then(function(result){
				if(result.data!=''){
					if(result.data.flag==true)
					obj.reload()
					if(result.data.flag==false)
					alert("信息删除失败！请重试")
				}
                }).catch(function(){
                alert("发现未知错误，请稍后再试")
                })
            }
        }
    }
    
</script>

<style>
	.alleqpment{
        background-color: rgb(142, 162, 182);
	}
    .alleqpment #addaUser{
        text-align: center;
        border:1px solid white;
        padding:5px;
        margin:10px 50px;
        border-radius: 10px;
        background-color: lightgrey;
    }
    .alleqpment button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
    .alleqpment #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
    .alleqpment #result{
        height: 610px;
        border:1px solid rgb(255, 255, 255);
        margin:5% 5% 0 5%;
        background-color: rgb(152, 164, 175);
    }
    .eqpinput a{
        text-align: center;
        display:block;
        text-decoration: none;
        background-color:rgb(206, 188, 188);
        border-radius: 2px;
    }
    .eqpinput a:hover{
        background-color:rgb(223, 204, 204);
    }
    .eqpinput input{
        padding:0;
        border:2px;
        background-color: rgb(142, 162, 182);
        height: 30px;
        border:1px solid  rgb(119, 135, 151);
    }
</style>