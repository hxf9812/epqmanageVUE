<template>
	<div class='allUserInfo'>

        <div id='fill'></div>
        <div id="addaUser">
            <form class='form-horizontal'>
					<label>账号：<input type='text' class='form-control' v-model="account"/></label>
					<label>密码：<input type='text' class='form-control' v-model="password"/></label>
					<label>姓名：<input type='text' class='form-control' v-model='name'/></label>
					<label>电话：<input type='text' class='form-control' v-model="phone"/></label>
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
        <div id='search'><input  placeholder="根据名字查询" v-model="keywords" /> <button><i class="fa fa-refresh" aria-hidden="true"></i></button> </div>
        <div id='result'>
		    <table class="table table-bordered">
				<thead>
					<tr>
						<th>account</th>
						<th>password</th>
						<th>name</th>
                        <th>phone</th>
                        <th>rank</th>
                        <th>修改</th>
                        <th>删除</th>
					</tr>
				</thead>
				
				<tbody  class='inputstyle'>
					<tr v-for="item in matching()" :key="item.account">
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

        <div id='page'>
            这是第几页
        </div>
	</div>
</template>

<script>
	export default {
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
                data:{},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
                    obj.data=result.data
              }
            }).catch(function(){
                console.log('fail');
            })
        },
        methods:{
            matching(){
               var newlist= this.data.filter(item=>{
							if(item.name.indexOf(this.keywords)!=-1){
								return item
							}
                        })
                return newlist
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
					if(result.data.flag==true)
					location.reload()
					if(result.data.flag==false)
					alert("信息添加失败！请重试")
				}
                }
                }).catch(function(){
                console.log('fail');
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
                console.log("success")
				if(result.data!=''){
					if(result.data.flag==true)
					location.reload()
					if(result.data.flag==false)
					alert("信息修改失败！请重试")
				}
                }).catch(function(){
                console.log('fail');
                alert("sorry!远程出现未知错误")
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
					if(result.data.flag==true)
					location.reload()
					if(result.data.flag==false)
					alert("信息修改失败！请重试")
				}
			}).catch(function(){
				console.log("fail");
			})

            }
            }
        
    }
</script>

<style>
	.allUserInfo{
		height: 150%;
        background-color: rgb(142, 162, 182);
	}
    .allUserInfo #fill{
        height: 5%;
    }
    .allUserInfo #addaUser{
        text-align: center;
        border:1px solid white;
        padding:5px;
    }
    .allUserInfo button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
    .allUserInfo #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
    .allUserInfo #result{
        height: 70%;
        border:1px solid white;
        margin:0 5% 0 5%;
    }
    .allUserInfo a{
        margin: 0px;
    }
    .allUserInfo #page{
        text-align: center
    }

    .inputstyle input{
        padding:0;
        border:2px;
        background-color: rgb(142, 162, 182);
        height: 30px;
        border:1px solid  rgb(119, 135, 151);
    }
</style>