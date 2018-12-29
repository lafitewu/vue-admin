<template>
	<div class="appList">
		<h3>{{msg}}</h3>
		<el-table
			v-loading="loading" element-loading-text="加载中...."
            :data="tableData"
            stripe
            :default-sort = "{prop: 'dates',order: 'descending'}"
            style="width: 100%;margin: 20px auto;font-size: 1rem;text-align: center">
            <el-table-column v-for="(item,index) in appTable" :key="index"
              :prop="item.prop"
              :label="item.name"
              :sortable="item.turn" >
            </el-table-column>
          </el-table>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading: true,
				msg: '应用列表',
				tableData: [],
				appTable: [
				    {name: "平台",prop: "ostype"},
				    {name: "应用名称", prop: "appname"},
				    {name: "应用包名", prop: "packagename"},
				    // {name: "广告状态", prop: ""},
				    {name: "应用类型", prop: "apptype"},
				    {name: "创建时间", prop: "createtime"}
				]
			}
		},
		mounted() {
			var that = this;
			that.$http.post(that.hostname+"/api/dev/getApps"+this.url_token()).then(function(res){
				 // 防止多处登录
				if(res.body.code == 0) {
					that.$router.replace('/login');
					that.$notify.error({
						title: '温馨提示',
						message: '您的账号在别处登录，请重新登录',
					})
				}else {
					that.loading = false;
					that.tableData = res.body.data;
				}
			});
		}
	}
</script>
<style>
	.appList table {
		text-align: left;
	}
</style>
