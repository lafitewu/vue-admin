<template>
	<div class="setAd" v-loading="loading" element-loading-text="加载中...">
		<h3>{{msg}}</h3>
		<!-- <div class="selects"> -->
			<el-select style="margin-top: 20px" v-model="value" placeholder="请选择应用" @change="selectFn">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id"
			      >
			    </el-option>
			</el-select>

			<div class="moneySet">
				<h4>{{msg1}}</h4>
				<div class="money1">{{msg2}}</div>
				<el-input style="width:19%;margin-top: 0.5vw;" v-model="value2" placeholder=""></el-input>
				<span style="margin-left: 2vw;">例如：汇率=1000,单位=金币 表示app内 1元=1000金币，请以app内实际单位为准。一般配置一次，请勿随意修改。</span>
			</div>
			
			<div class="money2">
				{{msg3}}<br/>
				<el-input style="width:15%;margin-top: 0.5vw;" type="number" v-model="moneyVal" placeholder=""></el-input>
			</div>	
		<!-- </div> -->
		
		<div class="kinds">
			<div class="kindsBtns" @click="kindsTap(index)" :class="{kinds_active: kindsIndex == index }" v-for="(item,index) in KindsBtn" :key="index">{{item.name}}</div>
		</div>
		<div class="money2" v-if="userRatio1">
			{{msg6}}<br/>
			<el-input style="width:15%;margin-top: 0.5vw;" v-model="userVal" placeholder=""></el-input>
			<span style="margin-left: 20px">ps:分成比例应在0-1之间(如：设置0.4，给用户40%)</span>
		</div>

		<div class="money2" v-if="userRatio2">
			{{msg6}}<br/>
			<el-input style="width:15%;margin-top: 0.5vw;" v-model="userVal2" placeholder=""></el-input>
			<span style="margin-left: 20px">ps:分成比例应在0-1之间(如：设置0.4，给用户40%)</span>
		</div>

		<div class="money2" v-if="httpAdress1">
			{{msg7}}<br/>
			<el-input style="width:50%;margin-top: 0.5vw;" v-model="httpAdressVal1" placeholder=""></el-input>
		</div>

		<div class="money2" v-if="httpAdress2">
			{{msg7}}<br/>
			<el-input style="width:50%;margin-top: 0.5vw;" v-model="httpAdressVal2" placeholder=""></el-input>
		</div>

		<div class="money2" v-if="httpAdress3">
			{{msg7}}<br/>
			<el-input style="width:50%;margin-top: 0.5vw;" v-model="httpAdressVal3" placeholder=""></el-input>
		</div>

		<!-- <div class="money2">
			{{msg8}}<br/>
			<span style="display:block;margin-top: 0.7vw;">{{httpKey}}</span>
		</div> -->
		<!-- <div class="ads">
			<h4>{{msg4}}</h4>
			<div class="adsTable">
				<el-table
					v-loading="loading" element-loading-text="加载中...."
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
				</el-table>
			</div>
		</div> -->
		
		<el-collapse style="margin-top: 30px" v-if="dictShow" accordion>
			<el-collapse-item :title="msg4" name="1">
				<div class="adsTable">
					<el-table
						v-loading="loading" element-loading-text="加载中...."
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
			</el-collapse-item>
			<!-- <el-collapse-item :title="msg5" name="2">
				<div class="adsTable">
					<el-table
						v-loading="loading" element-loading-text="加载中...."
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
					</el-table>
				</div>
			</el-collapse-item> -->
			</el-collapse>
		<div class="adSave" @click="saveFn">确认保存</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading: true,
				Id: '',
				filterCpl: [],
				msg: '广告设置',
				msg1: '虚拟货币设置',
				msg2: '虚拟货币名称：',
				msg3: '虚拟货币汇率：',
				msg4: 'CPL广告过滤',
				msg5: 'CPA广告过滤',
				msg6: '与用户分成比例：',
				msg7: '回调地址（不同广告可单独配置）：',
				msg8: '服务器秘钥：',
				value: '',
				value2: '金币',
				moneyVal: '100',
				options: [],
		        tableData3: [],
				multipleSelection: [],
				KindsBtn: [
                    {name: "CPA广告",value: "cpa"},
                    {name: "CPL广告",value: "cpl"},
                    {name: "加粉广告(小程序+公众号)",value: "mini"}
				],
				kindsIndex: 0,
				userRatio1: true,
				userRatio2: false,
				httpKey: '',
				httpAdressVal1: '',
				httpAdressVal2: '',
				httpAdressVal3: '',
				userVal: '',
				httpAdress1: true,
				httpAdress2: false,
				httpAdress3: false,
				dictShow: false
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
					 // 防止多处登录
                    if(res.body.code == 0) {
                        that.$router.replace('/login');
                        that.$notify.error({
                          title: '温馨提示',
                          message: '您的账号在别处登录，请重新登录',
                        })
                    }else {
						that.loading = false;
						that.options = res.data.data;
						that.Id = that.options[0].id;
						that.value = that.options[0].name;
						that.value2 = that.options[0].exdw;
						that.moneyVal = that.options[0].exchange;
						that.tableData3 = that.options[0].cpls;

						that.userVal = that.options[0].downratio_cpa;
						that.userVal2 = that.options[0].downratio_mini;
						that.httpAdressVal1 = that.options[0].cpa_callback_url;
						that.httpAdressVal2 = that.options[0].cpl_callback_url;
						that.httpAdressVal3 = that.options[0].mini_callback_url;
						that.httpKey = that.options[0].dkey;
					}
				});
			},
			// 保存接口
			saveFn() {
				var that = this;
				that.moneyVal = String(that.moneyVal);
				if((that.moneyVal < 0) || (that.moneyVal.split('.').length != 1) || (that.userVal < 0) || (that.userVal > 1) || (that.userVal2 < 0) || (that.userVal2 > 1)) {
					this.$notify.error({
						title: '失败',
						message: "输入有误,请重新输入",
					});
				}else {
					that.loading = true;
					var datas = {
						id: that.Id,
						exdw: that.value2,
						exchange: that.moneyVal,
						cpa_callback_url: that.httpAdressVal1,
						cpl_callback_url: that.httpAdressVal2,
						mini_callback_url: that.httpAdressVal3,
						downratio_cpa: that.userVal,
						downratio_mini: that.userVal2,
						filterCpl: that.filterCpl
					};
					that.$http.post(that.hostname+"/api/dev/saveAppConfig"+this.url_token(),datas).then(function(res){
						// console.log(res.body);
						if(res.body.code == 1) {
							that.$notify.success({
							title: '成功',
							message: '保存成功！',
							});
							that.Init();
							// this.Init();
						}else {
							that.loading = false; 
							that.$notify.error({
							title: '失败',
							message: res.body.msg,
							});
						}
					});
				}
				
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
				if(val.length == 0) {
					this.filterCpl = "";
				}else {
					this.filterCpl = val;
				}
		    },
		    // 下拉菜单动态赋值
	    	selectFn(val) {
				var that = this;
		      	var keys;
		      	for(var i = 0,L = that.options.length; i < L; i++) {
		      		if(val == that.options[i].id) {
		      			keys = i;
		      		}
		      	}
		      	that.Id = that.options[keys].id;
		      	that.value2 = that.options[keys].exdw;
		      	that.moneyVal = that.options[keys].exchange;
				that.tableData3 = that.options[keys].cpls;
				  
				that.userVal = that.options[keys].downratio_cpa;
				that.userVal2 = that.options[keys].downratio_mini;
				that.httpAdressVal1 = that.options[keys].cpa_callback_url;
				that.httpAdressVal2 = that.options[keys].cpl_callback_url;
				that.httpAdressVal3 = that.options[keys].mini_callback_url;
				that.httpKey = that.options[keys].dkey;
		  },
		  kindsTap(a) {
			var keys;
			// this.loading = true;
			this.kindsIndex = a
			this.val_date = this.KindsBtn[a].value;
			for(var i = 0,L = this.options.length; i < L; i++) {
				if(this.Id == this.options[i].id) {
					keys = i;
				}
			}
			console.log(keys);
			console.log(this.Id);
			if(a == 0) {
				this.userRatio1 = true;
				this.userRatio2 = false;

				this.httpAdress1 = true;
				this.httpAdress2 = false;
				this.httpAdress3 = false;

				this.dictShow = false;

				this.userVal = this.options[keys].downratio_cpa;
				this.httpAdressVal1 = this.options[keys].cpa_callback_url;
			}else if(a == 1) {
				this.userRatio1 = false;
				this.userRatio2 = false;

				this.httpAdress1 = false;
				this.httpAdress2 = true;
				this.httpAdress3 = false;

				this.dictShow = true;

				this.httpAdressVal2 = this.options[keys].cpl_callback_url;
			}else {
				this.userRatio1 = false;
				this.userRatio2 = true;

				this.httpAdress1 = false;
				this.httpAdress2 = false;
				this.httpAdress3 = true;

				this.dictShow = false;

				this.userVal2 = this.options[keys].downratio_mini;
				this.httpAdressVal3 = this.options[keys].mini_callback_url;
			}
		  }
	    }
	}
</script>
<style scoped>
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


		.kinds {
			width: 100%;
			height: 40px;
			margin-top: 20px;
			font-size: .9rem;
		}
			.kindsBtns {
				float: left;
				margin-right: 5px;
				width: 15%;
				height: 100%;
				line-height: 40px;
				text-align: center;
				background: white;
				border: 1px solid gray;
				cursor: pointer;
				border-radius: 5px;
			}
			.kinds_active {
				color: white;
				font-weight: bold;
				background: #20A0FF;
				/* border: 1px solid #FFB600; */
			}
</style>
