<template>
	<div class='logRecord'> 
		
		<div id='result'>
			 <h4 style='text-align:center'>设备故障日志记录</h4><br/>
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="10%">表单号</th>
						<th width="10%">设备号</th>
						<th width="15%">损坏日期</th>
						<th width="10%">损坏次数</th>
						<th width="40%">损坏原因</th>
						<th width="15%">是否已经被维修</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td>{{item.id}}</td>
                        <td>{{item.eqpid}}</td>
                        <td>{{item.damagedate| timeFormat}}</td>
						<td>{{item.damagetime}}</td>
						<td>{{item.cause }}</td>
						<td>{{item.isrepaired|declarestatus }}</td>
					</tr>
				</tbody>
			</table>
        </div>
	</div>
</template>

<script>
	export default {
		name: 'logRecord',
		data(){
			return {
				data:[],
			}
		},
		created(){
			var obj = this;
            this.$axios({
                url:'http://127.0.0.1:8081/getAllEqpLog',
                method:'post',
                data:{
				},
                dataType:'json'
            }).then(function(result){
                if(result.data!=''){
					if(result.data.flag==true)
					obj.data=result.data.extend.logs
					else
					alert("出错")
              }
            }).catch(function(){
                alert("发现未知错误，请稍后再试")
            })
		}
	}
</script>

<style>
	.logRecord{
		height: 150%;
        background-color: rgb(142, 162, 182);
	}
	.logRecord #fill{
		height: 6%;
	}
	.logRecord a{
		margin:0
	}
	.logRecord button{
        width: 15%;
        margin: auto;
        display: inline-block;
    }
	.logRecord #search{
        padding: 10px;
        font-size: 1.1vw;
        padding-left:36%;
    }
	 .logRecord #result{
		 border-radius: 10px;
		 background-color: rgb(135, 164, 194);
        height: 80%;
        border:1px solid white;
        margin:5% 5% 0 5%;
    }
	 .logRecord .table{
		table-layout: fixed;
	}
	.logRecord td{
		word-wrap:break-word;
	}
</style>