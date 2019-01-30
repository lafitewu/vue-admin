<template>
	<div class="personal" v-loading="loading">
		<div class="person_title">{{title}}</div>
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="mian_ruleForm">
			<el-form-item label="认证状态">
				<span style="color: #20A0FF;font-weight: bold;">{{ruleForm.status}}</span>
			</el-form-item>
			<el-form-item label="身份类型">
				<el-radio-group :disabled="Disabled" @change="nameFn" v-model="ruleForm.utype">
					<el-radio label="1">公司</el-radio>
					<el-radio label="0">个人</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="公司名称" v-if="!nameTurn">
				<el-input style="width: 400px" type="text" v-model="ruleForm.compayname" :disabled="Disabled"></el-input>
			</el-form-item>
			<el-form-item label="个人名称" :disabled="Disabled" v-if="nameTurn">
				<el-input style="width: 400px" type="text" v-model="ruleForm.realname" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="身份证号码" v-if="nameTurn">
				<el-input style="width: 400px" type="text" v-model="ruleForm.cardno" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="联系地址">
				<el-input style="width: 400px" type="text" v-model="ruleForm.address" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="邮箱">
				<el-input style="width: 400px" type="text" v-model="ruleForm.email" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="QQ">
				<el-input style="width: 400px" type="text" v-model="ruleForm.qq" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="身份证正面" v-if="nameTurn">
					<el-upload
					  :action="this.hostname+'/api/dev/uploadpic'+this.url_token()"
    				  :disabled="Disabled"
					  class="avatar-uploader"
					  :show-file-list="false"
					  :on-success="yyleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <!-- <div class="coverDialog" v-if="!btn_turn">
						  <div class="layer" @click="handleFileEnlarge(ruleForm.businessLicenseUrl)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
					  </div> -->
					  <img v-if="ruleForm.cardupimage" :src="ruleForm.cardupimage" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="身份证反面" v-if="nameTurn">
					<el-upload
					  :disabled="Disabled"
					  :action="this.hostname+'/api/dev/uploadpic'+this.url_token()"
					  class="avatar-uploader"
					  :show-file-list="false"
					  :on-success="cardDownSuccess"
					  :before-upload="beforeAvatarUpload">
					  <!-- <div class="coverDialog" v-if="!btn_turn">
						  <div class="layer" @click="handleFileEnlarge(ruleForm.businessLicenseUrl)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
					  </div> -->
					  <img v-if="ruleForm.carddownimage" :src="ruleForm.carddownimage" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<!-- :disabled="Disabled" :data="uploadDatas" -->
				<el-form-item label="营业执照" v-if="!nameTurn">
					<el-upload
					  :disabled="Disabled"
					  :action="this.hostname+'/api/dev/uploadpic'+this.url_token()"
					  class="avatar-uploader"
					  :show-file-list="false"
					  :on-success="businessSuccess"
					  :before-upload="beforeAvatarUpload">
					  <!-- <div class="coverDialog" v-if="!btn_turn">
						  <div class="layer" @click="handleFileEnlarge(ruleForm.businessLicenseUrl)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
					  </div> -->
					  <img v-if="ruleForm.business_license" :src="ruleForm.business_license" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<!-- :disabled="Disabled" -->
				<el-form-item label="开户许可证" v-if="!nameTurn">
					<!-- <input type="file" /> -->
					<el-upload
					  :disabled="Disabled"
					  :action="this.hostname+'/api/dev/uploadpic'+this.url_token()"
					  class="avatar-uploader"
					  :show-file-list="false"
					  :on-success="open_licenseSuccess"
					  :before-upload="beforeAvatarUpload">
					  <!-- <div class="coverDialog" v-if="!btn_turn">
						  <div class="layer" @click="handleFileEnlarge(ruleForm.businessLicenseUrl)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
					  </div> -->
					  <img v-if="ruleForm.open_license" :src="ruleForm.open_license" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

			<div class="person_title">{{title2}}</div>

			<el-form-item label="纳税方式" v-if="!nameTurn">
				<el-radio-group @change="taxFn" v-model="ruleForm.tax_payment" :disabled="Disabled">
					<el-radio label="0">一般纳税人</el-radio>
					<el-radio label="1">小规模纳税人</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="发票类型" v-if="!nameTurn">
				<el-radio-group v-model="ruleForm.receipt_type" :disabled="Disabled">
					<el-radio label="专用发票">专用发票</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="发票税率" v-if="!nameTurn">
				<span>{{receiptTax}}</span>
			</el-form-item>

			<el-form-item label="账户名称">
				<el-input style="width: 400px" type="text" v-model="ruleForm.bankuser" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="开户行">
				<el-input style="width: 400px" type="text" v-model="ruleForm.bankname" :disabled="Disabled"></el-input>
			</el-form-item>

			<el-form-item label="银行账号">
				<el-input style="width: 400px" type="text" v-model="ruleForm.bankaccount" :disabled="Disabled"></el-input>
			</el-form-item>
		</el-form>
		
		<!-- v-if="btnShow" -->
		<el-button class="editBtn" @click="goBack" type="primary" plain >返回</el-button>
		<!-- <el-button class="editBtn" @click="editToFn" type="primary" plain v-if="btnShow">修改信息</el-button> -->
		<!--  v-if="!btnShow" -->
		<el-button class="editBtn" @click="dialogVisible = true" type="primary">保存信息</el-button>


		<!-- 弹窗提示 -->
		<el-dialog
			:visible.sync="dialogVisible"
			width="50%"
			top= "20vh">
			<span style="font-size: 16px;">提交信息之后，该账号会进入审核中状态，在审核完结之前将不能修改信息，是否确认提交？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancleFn">取 消</el-button>
				<el-button type="primary" @click="saveFn">确 定</el-button>
			</span>
		</el-dialog>

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
				// Disabled: '',
				massage: [],
				msg: [],
				ruleForm: [],
				nameTurn: '',
				receiptTax: '',
				cardUp: '',
				btnName: "修改信息",
				btnShow: true,
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
					if(that.ruleForm.utype == "0") {
						that.nameTurn = true;
					}else {
						that.nameTurn = false;
					}

					// 发票税率展示
					if(that.ruleForm.tax_payment == "0") {
						this.nameTurn = true;
						this.receiptTax = "6%"
					}else {
						this.nameTurn = false;
						this.receiptTax = "3%"
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
				if(this.ruleForm.status == "审核中") {
					this.$message.error('正在审核中，不可编辑');
				}else {
					this.Disabled = null;
					this.btnShow = false;
				}
				
			},
			nameFn(val) {
				if(val == "0") {
					this.nameTurn = true;
				}else {
					this.nameTurn = false;
				}
			},
			taxFn(val) {
				if(val == 0) {
					this.receiptTax = "6%"
				}else {
					this.receiptTax = "3%"
				}
			},
			yyleAvatarSuccess(res) {
				this.ruleForm.cardupimage = res;
			},
			cardDownSuccess(res) {
				this.ruleForm.carddownimage = res;
			},
			businessSuccess(res) {
				this.ruleForm.business_license = res;
			},
			open_licenseSuccess(res) {
				this.ruleForm.open_license = res;
			},
			beforeAvatarUpload(res,file) {
				// console.log(res);
				// console.log(file);
			},
			uploadFn(item) {
				console.log(item);
				this.cardUp = item;
				// let formData = new FormData()
				// formData.append('file', item.file)
				// formData.append('type', 'SKU')
				// formData.append('id', this.$route.params.id)
				// console.log('上传图片接口-参数', item.file)
				// upLoadPicFromWeApp(formData).then(res => {
				// console.log('上传图片接口-数据', res)
				// this.formInline.pic_data[this.picIdx].img_url = res.msg
				// }).catch(err => {
				// this.$message.error('上传失败，请重新上传')
				// console.log('报错', err)
				// })
			},
			// 保存表单信息
			saveFn() {
				let that = this;
				that.dialogVisible = false;
				var SaveTurn;
				if(that.ruleForm.utype == "0") {
					// 个人
					that.ruleForm.compayname = "";
					that.ruleForm.open_license = "";
					that.ruleForm.business_license = "";

					if(that.ruleForm.realname == "") {
						SaveTurn = 1;
					}
				}else {
					// 公司
					that.ruleForm.realname = "";
					that.ruleForm.cardno = "";
					that.ruleForm.cardupimage = "";
					that.ruleForm.carddownimage = "";

					if(that.ruleForm.compayname == "") {
						SaveTurn = 1;
					}
				}

				if(SaveTurn == 1) {
					that.$message.error('公司名或个人名称有误！');
				}else {
					var Datas = {
						email: that.ruleForm.email,
						utype: that.ruleForm.utype,
						name: that.ruleForm.name,
						mobile: that.ruleForm.mobile,
						compayname: that.ruleForm.compayname,
						qq: that.ruleForm.qq,
						address: that.ruleForm.address,
						cardno: that.ruleForm.cardno,
						bankuser: that.ruleForm.bankuser,
						bankname: that.ruleForm.bankname,
						bankaccount: that.ruleForm.bankaccount,
						cardupimage: that.ruleForm.cardupimage,
						carddownimage: that.ruleForm.carddownimage,
						business_license: that.ruleForm.business_license,
						open_license: that.ruleForm.open_license,
						tax_payment: that.ruleForm.tax_payment,
						realname: that.ruleForm.realname
					}
					that.$http.post(that.hostname+"/api/dev/updateuserinfo"+that.url_token(), Datas).then((response) => {
						console.log(response);

						that.$notify.success({
							title: '成功',
							message: '保存成功！',
						});
						that.$router.push("/personal");
						that.Disabled = "";
						that.btnShow = true;

					}, (response) => {
					});
				}
			},
			cancleFn() {
				this.dialogVisible = false;
				// this.Disabled = "";
				// this.btnShow = true;
			},
			goBack() {
				this.$router.push("/personal");
			}
		}
	}
</script>
<style>
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
			margin-left: 35%;
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