<template>
	<div class="setAd">
		<h3>{{msg}}</h3>
		<div class="selects">
			<el-select v-model="value" placeholder="请选择应用">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		</div>
		<div class="moneySet">
			<h4>{{msg1}}</h4>
			<div class="money1">{{msg2}}</div>
			<el-input style="width:19%;margin-top: 0.5vw;" v-model="value2" placeholder=""></el-input>
		</div>
		
		<div class="money2">
			{{msg3}}<br/>
			<el-input style="width:15%;margin-top: 0.5vw;" v-model="moneyVal" placeholder=""></el-input>
		</div>

		<div class="ads">
			<h4>{{msg4}}</h4>
			<div class="adsTable">
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
			</div>
		</div>
		<div class="adSave">确认保存</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				msg: '广告设置',
				msg1: '虚拟货币设置',
				msg2: '虚拟货币名称：',
				msg3: '虚拟货币汇率：',
				msg4: 'CPL广告过滤',
				value: '',
				value2: '金币',
				moneyVal: '100',
				options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        tableData3: [{
		          id: '2016-05-03',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }, {
		          id: '2016-05-02',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }, {
		          id: '2016-05-04',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }, {
		          id: '2016-05-01',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }, {
		          id: '2016-05-08',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }, {
		          id: '2016-05-06',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }, {
		          id: '2016-05-07',
		          icon: '王小虎',
		          adname: '上海市普陀区金沙江路 1518 弄',
		          pagename: 'yttsdsdsds.apk',
		          startTime: '2016-05-03',
		          endTime: '2016-05-03'
		        }],
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
	        console.log(val);
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
	.selects,.moneySet {
		width: 80%;
		padding: 1vw 0;
		border-bottom: 1px dashed #808080;
	}
		.money1,.money2 {
			margin-top: 1.5vw;
			font-size: 16px;
		}
		.money2 {
			margin-top: .8vw;
			padding-bottom: 1.2vw;
			border-bottom: 1px dashed #808080;
		}
		.money_unit {
			margin-top: .5vw;
		}

	.ads {
		padding-bottom: 1.2vw;
		border-bottom: 1px dashed #808080;
	}
		.ads h4 {
			margin-top: 1vw;
		}
		.adsName {
			float: left;
			margin-top: .6vw;
			font-size: 16px;
		}
		.adsBtn,.adSave {
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
			/*margin: auto;*/
		}
		.adsTable {
			margin-top: 1vw;
		}
</style>
