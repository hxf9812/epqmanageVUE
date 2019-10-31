<template>
	<div class='allUserInfo'>

        <div id="addaUser">
            <h4>添加用户表</h4>
            <form class='form-horizontal'>
					<label>账号：<input type='text' class='form-control' v-model="account" placeholder="用户账号"/></label>
					<label>密码：<input type='text' class='form-control' v-model="password" placeholder="用户密码"/></label>
					<label>姓名：<input type='text' class='form-control' v-model='name' placeholder="用户姓名"/></label>
					<label>电话：<input type='text' class='form-control' v-model="phone" placeholder="用户电话"/></label>
                    <label>身份：
                        <div class="dropdown">
                        <button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown" style="width:100%;height:100%;position:relative" >
                            {{setrank}}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click.prevent="userrank=1,setrank='管理员'" style="background-color:white">管理员</a></li>
                            <li><a href="#" @click.prevent="userrank=2,setrank='设备负责人'" style="background-color:white">设备负责人</a></li>
                            <li><a href="#" @click.prevent="userrank=3,setrank='普通用户'" style="background-color:white">普通用户</a></li>
                        </ul>
                        </div>
                    </label>
			</form>
            <br/>
            <button @click='addaUser'> 点击添加一个用户 </button>
        </div>
            

        <div id='result'>

            <h4 style='text-align: center;'>所有用户信息表</h4>
            <div id='search'>
                <span>添加查询条件</span> 
                <input  placeholder="根据名字查询" v-model="keywords" /> <button @click="matchingAllUser"><i class="fa fa-refresh" aria-hidden="true" ></i></button>		
            </div>

		    <table class="table table-bordered" >
				<thead>
					<tr>
						<th >账号</th>
						<th>密码</th>
						<th>姓名</th>
                        <th>电话</th>
                        <th>身份</th>
                        <th>修改</th>
                        <th>删除</th>
					</tr>
				</thead>
				
				<tbody  class='inputstyle'>
					<tr v-for="item in data.list" :key="item.account">
                        <td>{{item.account}}</td>
                        <td><input type="text"  v-model="item.password" /></td>
						<td><input type="text"  v-model="item.name" /></td>
						<td><input type="text"  v-model="item.phone" /></td>
                        <td>
                            <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button"  data-toggle="dropdown" style="width:100%;position:relative" >
                                {{item.userrank | status}}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#" @click.prevent="item.userrank=1" style="background-color:white">管理员</a></li>
                                <li><a href="#" @click.prevent="item.userrank=2" style="background-color:white">设备负责人</a></li>
                                <li><a href="#" @click.prevent="item.userrank=3" style="background-color:white">用户</a></li>
                            </ul>
                            </div>
                        </td>
                        <td><a @click.prevent="modifyaUser(item.password,item.name,item.phone,item.userrank,item.account)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
						<td><a @click.prevent="deleteaUser(item.account)"><i class="fa fa-times" aria-hidden="true"></i></a></td>
					</tr>
				</tbody>
			</table>
        </div>

        <div id='page'  style="margin-top:10px">
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
        name: 'allUserInfo',
        data(){
            return {
                data:[],
                account:'',
                password:'',
                name:'',
                phone:'',
                userrank:3,
                setrank:'普通用户',
                keywords:'',
            }
        },
        created(){
            var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getAllUser',
                method:'post',
                data:{
                    pageNum:1
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
            matchingAllUser(){
                 var obj = this;
                this.$axios({
                    url:'http://127.0.0.1:8081/getAllUser',
                    method:'post',
                    data:{
                        pageNum:1,
                        matching:this.keywords
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
                    url:'http://127.0.0.1:8081/getAllUser',
                    method:'post',
                    data:{
                        pageNum:pn,
                        matching:this.keywords
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
            addaUser(){
                var obj = this;
                this.$axios({
                url:'http://127.0.0.1:8081/addaUser',
                method:'post',
                data:{
                    account:obj.account,
                    password:obj.password,
                    name:obj.name,
                    phone:obj.phone,
                    userrank:obj.userrank,
                },
                dataType:'json'
                }).then(function(result){
                if(result.data!=''){
                    if(result.data!=''){
					if(result.data.flag==true){
                    obj.reload()
                    }
					if(result.data.flag==false)
					alert("信息添加失败！请重试")
				}
                }
                }).catch(function(){
                 alert("发现未知错误，请稍后再试")
                })
            },
            deleteaUser(userAccount){
                var obj = this;
                this.$axios({
                url:'http://127.0.0.1:8081/deleteaUser',
                method:'post',
                data:{
                    account:userAccount
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
            },
            modifyaUser(password,name,phone,userrank,account){
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
				console.log("success");
				if(result.data!=''){
					if(result.data.flag==true){
                     alert("信息修改成功")
                     obj.reload()
                    }
					if(result.data.flag==false)
					alert("信息修改失败！请重试")
				}
			}).catch(function(){
				 alert("发现未知错误，请稍后再试")
			})

            }
            }
        
    }
</script>

<style>
	.allUserInfo{
        background-color: rgb(142, 162, 182);
	}
    .allUserInfo #addaUser{
        text-align: center;
        background-color:lightgrey;
        margin: 10px 50px;
        padding:10px 0;
        border-radius: 10px;
    }
    .allUserInfo button{
        width: 15%;
        margin: 5px 0;
        display: inline-block;
    }
    .allUserInfo #search{
        padding: 20px;
        font-size: 1.1vw;
        padding-left:36%;
    }
    .allUserInfo #result{
        height: 655px;
        margin:5% 5% 0 5%;
        background-color: rgb(152, 164, 175);
        border-radius: 10px;
        border:1px solid rgb(255, 255, 255);
    }
    .inputstyle a{
        margin: 5px;
        height: 38px;
        text-align: center;
        display:block;
        text-decoration: none;
        background-color:rgb(206, 188, 188);
        border-radius: 2px;
    }
    .inputstyle a:hover{
        background-color:rgb(223, 204, 204);
    }
    .allUserInfo #page{
        margin:auto;
        width:600px;
    }
    .allUserInfo td{
        padding:0;
        height: 30px;
    }
    .inputstyle input{
        padding:0;
        border:2px;
        width: 99%;
        height: 100%;
        background-color: lightgrey;
        border-radius: 2px;
        border:1.2px solid rgb(94, 80, 80);
        margin:2px
    }
    
</style>