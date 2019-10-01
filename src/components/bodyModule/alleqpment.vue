<template>
	<div class='alleqpment'>
		<div id='fill'></div>
        <div id="addaUser">
            <form class='form-horizontal'>
					<label>管理者：<input type='text' class='form-control' v-model="account"/></label>
					<label>日期：<input type='text' class='form-control' v-model="password"/></label>
					<label>使用者：<input type='text' class='form-control' v-model='name'/></label>
					<label>状态：<input type='text' class='form-control' v-model="phone"/></label>
                    <label>从属实验室：<input type='text' class='form-control' v-model="rank"/></label>
			</form>
            <br/>
            <button> 点击添加一个设备 </button>
        </div>
        <div id='search'><input  placeholder="添加查询条件" /> <button><i class="fa fa-refresh" aria-hidden="true"></i></button> </div>
        <div id='result'>
		    <table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>id</th>
						<th>master</th>
						<th>indate</th>
						<th>user</th>
                        <th>status</th>
                        <th>belong</th>
                        <th>修改</th>
                        <th>删除</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td>{{item.id}}</td>
                        <td>{{item.account}}</td>
                        <td>{{item.password}}</td>
						<td>{{item.name}}</td>
						<td>{{item.phone}}</td>
                        <td>{{item.rank}}</td>
                        <td><a><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
						<td><a><i class="fa fa-times" aria-hidden="true"></i></a></td>
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
		name: 'alleqpment'
	}
</script>

<style>
	.alleqpment{
		height: 150%;
        background-color: rgb(142, 162, 182);
	}
    .alleqpment #fill{
        height: 5%;
    }
    .alleqpment #addaUser{
        text-align: center;
        border:1px solid white;
        padding:5px;
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
        height: 70%;
        border:1px solid white;
        margin:0 5% 0 5%;
    }
    .alleqpment a{
        margin: 0px;
    }
    .alleqpment #page{
        text-align: center
    }
</style>