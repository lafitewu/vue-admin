<template>
	<div class="AdList">
		<h3>{{msg}}</h3>
		
		<el-table
		    ref="multipleTable"
		    :data="tableData3"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      label="ID"
		      width="120">
		      <template slot-scope="scope">{{ scope.row.id }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="icon"
		      label="图标"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="adname"
		      label="广告名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="pagename"
		      label="包名"
		      show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column
		      prop="startTime"
		      label="投放开始时间"
		      show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column
		      prop="endTime"
		      label="投放结束时间"
		      show-overflow-tooltip>
		    </el-table-column>
		</el-table>

		<div class="adSave">确认保存</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: '过滤广告',
		        multipleSelection: []
			}
		},
		 methods: {
	      // toggleSelection(rows) {
	      //   if (rows) {
	      //     rows.forEach(row => {
	      //       this.$refs.multipleTable.toggleRowSelection(row);
	      //     });
	      //   } else {
	      //     this.$refs.multipleTable.clearSelection();
	      //   }
	      // },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	        // console.log(val);
	      }
	    }
	}
</script>
<style>
	h3 {
		width: 100%;
		padding-bottom: 1vw; 
		border-bottom: 1px solid #BFCBD9;
	}
	
		.adSave {
			display: inline-block;
			width: 120px;
			height: 35px;
			line-height: 35px;
			text-align: center;
			color: white;
			background: #20A0FF;
			margin-top: 2vw;
			border-radius: 5px;
			cursor: pointer;
		}
</style>
