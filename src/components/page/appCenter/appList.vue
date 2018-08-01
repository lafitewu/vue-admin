<template>
	<div class="appList">
		<h3>{{msg}}</h3>
		<el-table
            :data="tableData"
            stripe
            :default-sort = "{prop: 'dates',order: 'descending'}"
            style="width: 100%;margin: 20px auto;font-size: 1rem;text-align: center">
            <el-table-column v-for="item in appTable"
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
				msg: '应用列表',
				tableData: [],
				appTable: [
				    {name: "平台",prop: ""},
				    {name: "应用名称"},
				    {name: "应用包名"},
				    {name: "广告状态"},
				    {name: "应用类型"},
				    {name: "创建时间"}
				]
			}
		}
	}
</script>
