<template>
	<div class='applyeqp'>

		<div id='result'>
		<h4 style='text-align:center'>设备信息表（用户）</h4>  <br/>
	
		 <div id='search'>
			 <span>添加查询条件</span>
			 <input  placeholder="选择要查询的实验室" v-model="keywords" /> 		
				<label @click="isFree=0">查看所有设备:<input type="radio" name='selecteqp'  ></label>&nbsp;&nbsp;&nbsp;
				<label @click="isFree=1">查看空闲设备:<input type='radio' name='selecteqp' checked /></label>
				<button @click="matchingAllEqp"><i class="fa fa-refresh" aria-hidden="true"></i></button>	
		 </div>
		 <span>----鼠标悬停在管理者或者使用者姓名上可以查看他的电话号码----</span>
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>设备号</th>
						<th>管理者</th>
						<th>购入日期</th>
						<th>当前使用者</th>
                        <th>设备是否损坏</th>
                        <th>从属实验室</th>
                        <th>设备申请</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data.list" :key="item.id">
						<td>{{item.id}}</td>
                        <td v-title='item.masterUser'>{{item.masterUser|accountToname }}</td>
                        <td>{{item.indate | timeFormat}}</td>
						<td v-title='item.userUser'>{{item.userUser| accountToname}}</td>
						<td>{{item.status | eqpstatus }}</td>
                        <td>{{item.belong}}</td>
						<td><a style='margin:0;' @click.prevent="applyaEqp(item.user,item.master,item.id,item.status)"><i class="fa fa-envelope" aria-hidden="true"></i></a></td>
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
		name: 'applyeqp',
		data(){
			return{
				data:[],
				keywords:'',
				isFree:1,
				test:'asdfadsfa',

			}
		},
		created(){
			  var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getAllEqp',
                method:'post',
                data:{
					pageNum:1,
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
			applyaEqp(user,master,id,status){
				if(user!=null || status!=0){
					alert("因为该设备正在被使用，或者设备不可用，申请失败")
					return
				}
				var obj = this;
            	this.$axios({
                url:'http://127.0.0.1:8081/applyaEqp',
                method:'post',
                data:{
					whoapply:obj.getCookie('useraccount'),
					whoapplyed:master,
					applyeqp:id,
					isdealed:0,
				},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true) alert("申请成功");
					else alert("因为远端的原因，未能申请成功")
              }
            }).catch(function(){
                 alert("发现未知错误，请稍后再试")
            })
			}
		}
	}
</script>

<style>
	.applyeqp{
        background-color: rgb(142, 162, 182);
	}
	.applyeqp button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.applyeqp #search{
        font-size: 1.1vw;
        padding-left:36%;
    }
	.applyeqp #result{
        height: 640px;
        border:1px solid rgb(255, 255, 255);
        margin:5% 5% 0 5%;
        background-color: rgb(152, 164, 175);
    }
	.applyeqp a{
        text-align: center;
        display:block;
        text-decoration: none;
        background-color:rgb(206, 188, 188);
        border-radius: 2px;
    }
    .applyeqp a:hover{
        background-color:rgb(223, 204, 204);
    }
</style>