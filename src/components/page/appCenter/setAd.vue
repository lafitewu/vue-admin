<template>
	<div class="setAd">
		<h3>{{msg}}</h3>
		<div class="selects">
			<el-select v-model="value" placeholder="请选择应用" @change="selectFn">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id"
			      >
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
				      width="70">
				    </el-table-column>
				    <el-table-column
				      label="ID"
				      width="120">
				      <template slot-scope="scope">{{ scope.row.id }}</template>
				    </el-table-column>
				    <el-table-column
				      prop="img"
				      label="图标"
				      width="120"
				      >
				      <template scope="icon_scope">
				      	<img style="width: 70%; margin-top: 10%;" :src="icon_scope.row.img" alt="图标"/>
				      </template>
				    </el-table-column>
				    <el-table-column
				      prop="name"
				      label="广告名称"
				      >
				    </el-table-column>
				    <el-table-column
				      prop="package_name"
				      label="包名"
				      show-overflow-tooltip>
				    </el-table-column>
				    <!-- <el-table-column
				      prop="startTime"
				      label="投放开始时间"
				      show-overflow-tooltip>
				    </el-table-column>
				    <el-table-column
				      prop="endTime"
				      label="投放结束时间"
				      show-overflow-tooltip>
				    </el-table-column> -->
				</el-table>
			</div>
		</div>
		<div class="adSave" @click="saveFn">确认保存</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				Id: '',
				filterCpl: [],
				msg: '广告设置',
				msg1: '虚拟货币设置',
				msg2: '虚拟货币名称：',
				msg3: '虚拟货币汇率：',
				msg4: 'CPL广告过滤',
				value: '',
				value2: '金币',
				moneyVal: '100',
				options: [],
		        tableData3: [],
		        multipleSelection: []
			}
		},
		mounted() {
			this.Init();
		},
		// 组件更新之后执行(解决checked()中len取不到值)
		updated() {
			this.checked();
		},
		methods: {
			// 初始化
			Init() {
				var that = this;
				that.$http.post(that.hostname+"/api/dev/getAppsConfigs"+this.url_token()).then(function(res){
					that.options = res.data.data;
					that.Id = that.options[0].id;
					that.value = that.options[0].name;
					that.value2 = that.options[0].exdw;
					that.moneyVal = that.options[0].exchange;
					that.tableData3 = that.options[0].cpls;
				});
			},
			// 保存接口
			saveFn() {
				var that = this;
				var datas = {
					id: that.Id,
					exdw: that.value2,
					exchange: that.moneyVal,
					filterCpl: that.filterCpl
				};
				that.$http.post(that.hostname+"/api/dev/saveAppConfig"+this.url_token(),datas).then(function(res){
					console.log(res.body);
					if(res.body.code == 1) {
						this.$notify.success({
	                      title: '成功',
	                      message: '保存成功！',
	                    });
	                    this.Init();
					}else {
						this.$notify.error({
	                      title: '失败',
	                      message: res.body.msg,
	                    });
					}
				});
			},
			checked(){
				var len = this.tableData3.length;
				// console.log(this.tableData3);
				for(var i = 0; i < len; i++) {
					if(this.tableData3[i].ignore == 1) {
						this.$refs.multipleTable.toggleRowSelection(this.tableData3[i],true);
					}
				}
		    },
		    // cpl过滤
		    handleSelectionChange(val) {
		    	this.filterCpl = val;
		    },
		    // 下拉菜单动态赋值
	    	selectFn(val) {
		      	var keys;
		      	for(var i = 0,L = this.options.length; i < L; i++) {
		      		if(val == this.options[i].id) {
		      			keys = i;
		      		}
		      	}
		      	this.Id = this.options[keys].id;
		      	this.value2 = this.options[keys].exdw;
		      	this.moneyVal = this.options[keys].exchange;
		      	this.tableData3 = this.options[keys].cpls;
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
