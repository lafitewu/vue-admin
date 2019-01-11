<template>
	<div class="passworld">
		<div class="pass_title">{{title}}</div>
		<div class="init_list" v-for="item in pass_arr" :key="item.val" v-if="!item.shows">
			<font>{{item.label}}：</font>
			<span>{{item.unit}}</span>
			<span>{{item.holder}}</span>
			<input @change="InputFn" class="money_input" v-model="valMoney" type="number" v-if="item.inputs">
			<span class="input_info" v-if="item.info">*{{NameInfo}}需为整元，并且不少于500元</span>
			<span class="InputNotice" v-if="item.notice">ps: {{noticeWorld}}</span>
		</div>
		<div class="Last_info">
			<el-checkbox v-model="checked" @change="checkBoxFn"><span>我方确认：结算金额以幂动确认的金额为准。</span></el-checkbox>
			<span class="InputNotice" v-if="checkBoxTurn">ps: 请进行确认</span>
		</div>
		<div class="init_btn">
			
            <el-button class="init_click" type="primary" @click="cashFn">马上提款</el-button>

			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>注意事项：</span>
				</div>
				<div v-if="ruleForm.pay_type == 2">
					<h4>周结</h4>
					<h4>1.打款周期说明：</h4>
					<span class="listNode">1.1 实行周结方式。开发者可以在本周任意时刻申请提款，幂动将于下周审核开发者本周所有的提款申请并安排付款。如遇节假日则顺延处理。</span>
					<h4>2.可提款余额说明：</h4>
					<span class="listNode">2.1 申请提款只能提取“可提款余额”所示的金额;</span>
					<span class="listNode">2.2 收入金额>=500元时可进行结算，不足500元时，将累计至账户余额;</span>
					<h4>3.发票注意事项：</h4>
					<span class="listNode"> 3.1 开发者在平台申请提款，需要依法开具抬头为“广州幂动科技有限公司”的增值税专用发票;</span>
					<span class="listNode"> 3.2 提供的增值税专用发票发票金额必须与打款金额一致;</span>
					<span class="listNode"> 3.3 增值税专用发票内容可为：信息服务费、技术服务费或广告费;</span>
					<h4>4.如遇以下情况提款申请将延期处理：</h4>
					<span class="listNode"> 4.1 发票出现错误，会通知开发者说明情况并将发票回寄，开发者需重新开票;</span>
					<span class="listNode"> 4.2 在提现申请处理期间，幂动没收到等同金额的发票。</span>
				</div>
				<div v-else-if="ruleForm.pay_type == 1">
					<h4>半月结</h4>
					<h4>1.打款周期说明：</h4>
					<span class="listNode">1.1 实行15天结算方式。开发者可以在当月15号前任意时刻申请提款，幂动将于20号前审核开发者提交的提款申请并安排付款。如遇节假日则顺延处理。</span>
					<h4>2.可提款余额说明：</h4>
					<span class="listNode">2.1 申请提款只能提取“可提款余额”所示的金额;</span>
					<span class="listNode">2.2 收入金额>=500元时可进行结算，不足500元时，将累计至账户余额;</span>
					<h4>3.发票注意事项：</h4>
					<span class="listNode"> 3.1 开发者在平台申请提款，需要依法开具抬头为“广州幂动科技有限公司”的增值税专用发票;</span>
					<span class="listNode"> 3.2 提供的增值税专用发票发票金额必须与打款金额一致;</span>
					<span class="listNode"> 3.3 增值税专用发票内容可为：信息服务费、技术服务费或广告费;</span>
					<h4>4.如遇以下情况提款申请将延期处理：</h4>
					<span class="listNode"> 4.1 发票出现错误，会通知开发者说明情况并将发票回寄，开发者需重新开票;</span>
					<span class="listNode"> 4.2 在提现申请处理期间，幂动没收到等同金额的发票。</span>
				</div>
				<div v-else-if="ruleForm.pay_type == 0">
					<h4>月结</h4>
					<h4>1.打款周期说明：</h4>
					<span class="listNode">1.1 统一实行月结方式。开发者可以在任意时刻申请提款，幂动将于每月10日审核开发者上月所有的提款申请并安排付款。如遇节假日则顺延处理。</span>
					<h4>2.可提款余额说明：</h4>
					<span class="listNode">2.1 申请提款只能提取“可提款余额”所示的金额;</span>
					<span class="listNode">2.2 收入金额>=500元时可进行结算，不足500元时，将累计至账户余额;</span>
					<h4>3.发票注意事项：</h4>
					<span class="listNode"> 3.1 开发者在平台申请提款，需要依法开具抬头为“广州幂动科技有限公司”的增值税专用发票;</span>
					<span class="listNode"> 3.2 提供的增值税专用发票发票金额必须与打款金额一致;</span>
					<span class="listNode"> 3.3 增值税专用发票内容可为：信息服务费、技术服务费或广告费;</span>
					<h4>4.如遇以下情况提款申请将延期处理：</h4>
					<span class="listNode"> 4.1 发票出现错误，会通知开发者说明情况并将发票回寄，开发者需重新开票;</span>
					<span class="listNode"> 4.2 在提现申请处理期间，幂动没收到等同金额的发票。</span>
				</div>
				<div v-else-if="ruleForm.pay_type == 3">
					<h4>预付</h4>
					<h4>1.申请预付说明：</h4>
					<span class="listNode">1.1 预收账款剩余金额低于3天的消耗金额时可申请预付;</span>
					<h4>2.发票注意事项：</h4>
					<span class="listNode">2.1 开发者需要依法开具抬头为“广州幂动科技有限公司”的增值税专用发票并在每月25号前将发票邮寄至幂动;</span>
					<span class="listNode">2.2 提供的增值税专用发票金额需与系统后台显示打款金额一致;</span>
					<span class="listNode">2.3 增值税专用发票内容可为：信息服务费、技术服务费或广告费;</span>
					<h4>3.如遇以下情况提款申请将延期处理：</h4>
					<span class="listNode"> 3.1 发票出现错误，会通知开发者说明情况并将发票回寄，开发者需重新开票;</span>
					<span class="listNode"> 3.2 幂动在当月25号前没收到开发者开具的增值税专用发票。</span>
				</div>
			</el-card>
        </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				NameInfo: "提款金额",
				title: "申请提款",
				pass_arr: [
					{label: "开户名",holder: ""},
					{label: "身份状态",holder: ""},
					{label: "银行账号",holder: ""},
					{label: "开户银行",holder: ""},
					{label: "账户余额",holder: "",unit: '￥'},
					{label: "可提款余额",holder: "",unit: '￥',shows: false},
					{label: "发票方式",holder: "提供发票"},
					{label: "提款金额",holder: "",unit: '￥',inputs: true, notice: false,info: true},
					{label: "打款金额",holder: "",unit: '￥'},
				],
				valMoney: '',
				noticeInfo: false,
				checked: false,
				noticeWorld: "提现金额不能超过可提现余额",
				checkBoxTurn: false
			}
		},
		mounted() {
			this.Init();
		},
		methods: {
			Init() {
               var that = this;
                that.$http.jsonp(that.hostname+"/api/dev/userinfo"+this.url_token()).then(function(response){
                    // console.log(response.data);
                    if(response.data.code == 1) {
                        that.ruleForm = response.data.data;
						if(that.ruleForm.pay_type == 3) {
							that.title = "申请预付";
							that.NameInfo = "预付金额";
							that.pass_arr[4].label = "预收款剩余金额";
							that.pass_arr[7].label = "预付金额";
							that.pass_arr[8].label = "预付金额";
							that.pass_arr[5].shows = true;
							that.pass_arr[4].holder = that.ruleForm.prebalance - that.ruleForm.totalbalance < 0 ? 0:(that.ruleForm.prebalance - that.ruleForm.totalbalance).toFixed(2);
						}else {
							that.pass_arr[4].holder = that.ruleForm.balance;
						}
                        that.pass_arr[0].holder = that.ruleForm.bankuser;
                        that.pass_arr[1].holder = that.ruleForm.status;
                        that.pass_arr[2].holder = that.ruleForm.bankaccount;
						that.pass_arr[3].holder = that.ruleForm.bankname;
						
						that.pass_arr[5].holder = that.ruleForm.withbalance;
                    }else {
                        that.$router.replace('/login');
                        that.$notify.error({
                            title: '温馨提示',
                            message: '您的账号在别处登录，请重新登录',
                        })
                    }
                });
		   },
		   InputFn() {
			   if(this.valMoney > this.ruleForm.withbalance) {
				   this.pass_arr[7].notice = true;
				   this.pass_arr[8].holder = "";
				   this.valMoney = "";
			   }else {
				   this.pass_arr[7].notice = false;
				   if(this.ruleForm.tax_payment == 1) {
					   this.pass_arr[8].holder = (this.valMoney*0.97).toFixed(2);
				   }else {
					   this.pass_arr[7].holder = this.valMoney;
					   this.pass_arr[8].holder = this.valMoney;
				   }
			   }  
		   },
		   cashFn() { 
			   let that = this;
			   if(that.ruleForm.status == "审核中") {
				   if(that.ruleForm.pay_type == 3) {
						that.$message.error('账户审核中，不可申请预付!');
					}else {
						that.$message.error('账户审核中，不能提款！');
					}
			   }else {
				   if((that.valMoney.split('.').length == 1) && (that.valMoney >= 500) && (that.checked)) {
							var datas = {
								amount: that.valMoney
							}
							var Api;
							if(that.ruleForm.pay_type == 3) {
								Api = "/api/dev/applyprepay";
							}else {
								Api = "/api/dev/withdraw";
							}
							that.$http.post(that.hostname+Api+this.url_token(),datas).then(function(response){
								if(response.data.code == 0) {
									that.$notify.error({
										title: '错误',
										message: response.data.msg
									});
								}else {
									that.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									});
									that.$router.push('/account');
								}
							});
							
					}else {
						if(!that.checked) {
							that.checkBoxTurn = true;
						}else {
							that.$message.error('请输入正确的提现金额');
						}
					}
			   }
		   },
		   checkBoxFn() {
			   if(this.checked) {
				   this.checkBoxTurn = false;
			   }else {
				   this.checkBoxTurn = true;
			   }
		   }
		}
	}
</script>
<style scoped>
	.pass_title {
		font-size: 1.4rem;
		font-weight: bold;
		color: #324157;
		height: 3.5rem;
		width: 100%;
		border-bottom: 1px solid #BFCBD9;
	}
	.init_list {
		line-height: 5rem;
		width: 80%;
		height: 5rem;
		border-bottom: 1px dashed gray;
	}
		.init_list font {
			float: left;
			margin-left: 2%;
			text-align: right;
			width: 8rem;
		}
		.init_list span {
			float: left;
			font-size: 1rem;
		}
		.init_list .init_input {
			float: left;
			width: 30%;
			margin-top: 1.5rem;
			margin-left: 1%;
		}
	.init_btn {
		margin-top: 5rem;
		margin-left: 30%; 
	}
		.init_click {
			padding: .8rem 2rem;
		}

	.money_input {
		float: left;
		width: 200px;
		height: 30px;
		margin-top: 23px;
	}
	.Last_info {
		margin-top: 10px;
		margin-left: 30px;
	}
		.Last_info span {
			color: #20A0FF;
		}
		.Last_info .InputNotice {
			margin-left: 15px;
			color: #C03616;
			font-size: 14px;
		}
	
	.InputNotice {
		margin-left: 15px;
		color: #C03616;
	}

	.input_info {
		color: gray;
		margin-left: 15px;
	}


	.box-card {
		position: absolute;
		top: 10%;
		right: 20px;
		width: 350px;
		line-height: 28px;
	}
		.listNode {
			display: block;
			margin-left: 10px;
		}
</style>