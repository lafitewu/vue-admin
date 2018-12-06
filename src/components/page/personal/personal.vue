<template>
	<div class="personal" v-loading="loading">
		<div class="person_title">{{title}}</div>
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="mian_ruleForm">
			<el-form-item label="认证状态">
				<span style="color: #20A0FF;font-weight: bold;">{{ruleForm.status}}</span>
			</el-form-item>
			<el-form-item label="身份类型">
				<span>{{cardType}}</span>
			</el-form-item>
			<el-form-item label="公司名称" v-if="nameTurn">
				<span>{{ruleForm.compayname}}</span>
			</el-form-item>
			<el-form-item label="个人名称" :disabled="Disabled" v-if="!nameTurn">
				<span>{{ruleForm.realname}}</span>
			</el-form-item>

			<el-form-item label="身份证号码" v-if="!nameTurn">
				<span>{{ruleForm.cardno}}</span>
			</el-form-item>

			<el-form-item label="联系地址">
				<span>{{ruleForm.address}}</span>
			</el-form-item>

			<el-form-item label="邮箱">
				<span>{{ruleForm.email}}</span>
			</el-form-item>

			<el-form-item label="QQ">
				<span>{{ruleForm.qq}}</span>
			</el-form-item>

			<el-form-item label="身份证正面" v-if="!nameTurn">
				<span>{{ruleForm.cardupimage != "" ? "已上传": "未上传"}}</span>
			</el-form-item>

			<el-form-item label="身份证反面" v-if="!nameTurn">
				<span>{{ruleForm.carddownimage != "" ? "已上传": "未上传"}}</span>
			</el-form-item>

			<el-form-item label="营业执照" v-if="nameTurn">
				<span>{{ruleForm.business_license != "" ? "已上传": "未上传"}}</span>
			</el-form-item>

			<el-form-item label="开户许可证" v-if="nameTurn">
				<span>{{ruleForm.open_license != "" ? "已上传": "未上传"}}</span>
			</el-form-item>

			<div class="person_title">{{title2}}</div>

			<el-form-item label="纳税方式">
				{{ruleForm.tax_payment == "0" ? "一般纳税人": "小规模纳税人"}}
			</el-form-item>

			<el-form-item label="发票类型">
				<span>专用发票</span>
			</el-form-item>

			<el-form-item label="发票税率">
				<span>{{receiptTax}}</span>
			</el-form-item>

			<el-form-item label="账户名称">
				<span>{{ruleForm.bankuser}}</span>
			</el-form-item>

			<el-form-item label="开户行">
				<span>{{ruleForm.bankname}}</span>
			</el-form-item>

			<el-form-item label="银行账号">
				<span>{{ruleForm.bankaccount}}</span>
			</el-form-item>
		</el-form>

		<el-button class="editBtn" @click="editToFn" type="primary" plain v-if="btnShow">修改信息</el-button>
		<!-- <el-button class="editBtn" @click="dialogVisible = true" type="primary" v-if="!btnShow">保存信息</el-button> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				loading: true,
				title: "基本信息",
				title2: "财务信息",
				Disabled: '',
				massage: [],
				msg: [],
				ruleForm: [],
				nameTurn: '',
				receiptTax: '',
				cardUp: '',
				btnName: "修改信息",
				btnShow: true,
				cardType: ''
			}
		},
		mounted() {
			var that = this;
			that.$http.jsonp(that.hostname+"/api/dev/userinfo"+this.url_token()).then(function(response){
                console.log(response.data);
                // for(var i = 0;i < that.$data.massage.length;i++) {
                // 	console.log(response.data.data.length);
				// }
				if(response.data.code == 1) {
					that.loading = false;
					that.ruleForm = response.data.data;

					// 个人||公司展示区别
					if(that.ruleForm.utype == "1") {
						that.nameTurn = true;
						that.cardType = "公司"
					}else {
						that.nameTurn = false;
						that.cardType = "个人"
					}

					// 发票税率展示
					if(that.ruleForm.tax_payment == "0") {
						this.nameTurn = true;
					}else {
						this.nameTurn = false;
					}
					// console.log(that.msg);
				}else {
					that.$router.replace('/login');
					that.$notify.error({
						title: '温馨提示',
						message: '您的账号在别处登录，请重新登录',
					})
				}
            });
		},
		methods: {
			editToFn() {
				this.$router.push("/personal_Edit");
			}
		}
	}
</script>
<style scoped>
.content {
    background: #EFEFEF;
}
	.person_title {
		font-size: 1.1rem;
		font-weight: bold;
		color: #324157;
		height: 2.4rem;
		width: 100%;
		/* border-bottom: 1px solid #BFCBD9; */
	}
		.editBtn {
			margin-top: 30px;
			width: 120px;
			margin-left: 40%;
		}
		.mian_ruleForm {
			margin-top: 20px;
		}

		/*图片上传样式*/
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		    width: 150px;
		    height: 150px;
		  }
		  .avatar-uploader .el-upload:hover {
		    border-color: #409EFF;
		  }
		  .avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 130px;
		    height: 130px;
		    line-height: 130px;
		    text-align: center;
		  }
		  .avatar {
		    width: 130px;
		    height: 130px;
		    margin: auto;
		    margin-top: 10px;
		    display: block;
		  }

		  .coverDialog {
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			display: none;
			color: white;
		}
		.avatar-uploader .el-upload:hover .coverDialog {
			display: block;
		}
		
		.el-dialog--small {
			width: 20%;
		}
</style>