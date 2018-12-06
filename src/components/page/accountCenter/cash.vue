<template>
	<div class="passworld">
		<div class="pass_title">{{title}}</div>
		<div class="init_list" v-for="item in pass_arr" :key="item.val">
			<font>{{item.label}}：</font>
			<span>{{item.unit}}</span>
			<span>{{item.holder}}</span>
			<input @change="InputFn" class="money_input" v-model="valMoney" type="number" v-if="item.inputs">
			<span class="InputNotice" v-show="item.notice">ps: 提现金额不能超过可提现余额</span>
		</div>
		<div class="Last_info">
			<el-checkbox v-model="checked"><span>我方确认：结算金额以幂动确认的金额为准。</span></el-checkbox>
		</div>
		<div class="init_btn">
			
            <el-button class="init_click" type="primary" @click="edits">马上提款</el-button>
        </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: "申请提款",
				pass_arr: [
					{label: "开户名",holder: ""},
					{label: "身份状态",holder: ""},
					{label: "银行账号",holder: ""},
					{label: "开户银行",holder: ""},
					{label: "账户余额",holder: "",unit: '￥'},
					{label: "可提款余额",holder: "",unit: '￥'},
					{label: "发票方式",holder: "提供发票"},
					{label: "提款金额",holder: "",unit: '￥',inputs: true, notice: false},
					{label: "打款金额",holder: "",unit: '￥'},
				],
				valMoney: '',
				noticeInfo: false
			}
		},
		mounted() {
			this.Init();
		},
		methods: {
			edits() {
				var that = this;
				var datas = {
					
				}
				that.$http.post(that.hostname+"/api/dev/"+this.url_token(),datas).then(function(response){
					// this.$message.error(response.data.msg);
	            });
			},
			Init() {
               var that = this;
                that.$http.jsonp(that.hostname+"/api/dev/userinfo"+this.url_token()).then(function(response){
                    console.log(response.data);
                    if(response.data.code == 1) {
                        that.ruleForm = response.data.data;
                        
                        that.pass_arr[0].holder = that.ruleForm.bankuser;
                        that.pass_arr[1].holder = that.ruleForm.status;
                        that.pass_arr[2].holder = that.ruleForm.bankaccount;
						that.pass_arr[3].holder = that.ruleForm.bankname;
						that.pass_arr[4].holder = that.ruleForm.balance;
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
				   this.pass_arr[8].holder = this.valMoney;
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
			width: 6rem;
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
	
	.InputNotice {
		margin-left: 15px;
		color: #C03616;
	}
</style>