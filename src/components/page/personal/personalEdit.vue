<template>
	<div class="unit_one unit_lafite">
		<div class="unit_one_top">
			<div class="unit_o_left_btn" @click="goBack"><i class="el-icon-arrow-left"></i>{{msg}}</div>
			<div class="unit_o_right">
				<div class="enter_btn" v-if="!btn_turn">
					<el-button type="primary" @click="EditFn" plain><i class="el-icon-edit"></i><span>编辑</span></el-button>
					<!-- <el-button type="danger" plain><i class="el-icon-delete"></i><span>删除</span></el-button>
					<el-button type="primary" plain><i class="el-icon-document"></i><span>复制</span></el-button> -->
				</div>
				<div class="out_btn" v-if="btn_turn">
					<el-button type="primary" @click="saveFn"><span>保存</span></el-button>
					<el-button type="danger" @click="cancelFn" plain><span>取消</span></el-button>
				</div>
				<el-switch 
					@change="changeFn"
					:disabled="isDisable"
			        on-text ="上线"
                    off-text = "暂停"
                    on-color="#00D1B2"
                    off-color="#dadde5" 
                    v-model="statusRadio"
                    >
				</el-switch>
				<el-tag type="success" style="float: right; margin-right: 1vw; margin-top:5px">{{statusInfo}}</el-tag>
			</div>
		</div>
		<div class="unit_o_content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="名称" prop="name">
					<el-input v-model="ruleForm.name" :disabled="Disabled"></el-input>
					<span class="unit_infro">为您的广告主取一个唯一的名字，建议客户名称与营业执照一致</span>
				</el-form-item>
				
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="ruleForm.email" :disabled="Disabled"></el-input>
					<span class="unit_infro">填一个广告主的邮箱账号，可以为广告主申请用这个邮箱来登录查看信息</span>
				</el-form-item>

				<el-form-item label="类型" prop="typeName">
					<el-select v-model="ruleForm.typeName" style="width: 100%;" @change="selectFn($event,item)" :disabled="Disabled">
				    	<el-option v-for="items in selectType" :label="items.keyStr" :value="items.valueStr" :key="items.index"></el-option>
				    </el-select>
					<span class="unit_infro">为广告主选择一个正确的类型，可以更好的获取到精准用户</span>
				</el-form-item>

				<el-form-item label="级别" prop="level">
					<el-radio-group v-model="ruleForm.level">
					    <el-radio label="A">A</el-radio>
					    <el-radio label="B">B</el-radio>
					    <el-radio label="C">C</el-radio>
					 </el-radio-group>
				</el-form-item>

				<el-form-item label="联系人名称" prop="contactName">
					<el-input v-model="ruleForm.contactName" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item label="联系人电话" prop="contactTel">
					<el-input v-model="ruleForm.contactTel" :disabled="Disabled"></el-input>
				</el-form-item>

				<el-form-item label="联系人地址" prop="contactAddress">
					<el-input v-model="ruleForm.contactAddress" :disabled="Disabled"></el-input>
				</el-form-item>

				<!-- prop="businessLicenseUrl" -->
				<el-form-item label="营业执照">
					<el-upload
					  :disabled="Disabled"
					  :data="uploadDatas"
					  :action="this.hostname+'/manage/sys/fileHandle/upload'"
					  class="avatar-uploader"
					  :show-file-list="false"
					  :on-success="yyleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <div class="coverDialog" v-if="!btn_turn">
						  <div class="layer" @click="handleFileEnlarge(ruleForm.businessLicenseUrl)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
					  </div>
					  <img v-if="ruleForm.businessLicenseUrl" :src="ruleForm.businessLicenseUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<!-- prop="icpUrl" -->
				<el-form-item label="ICP证书">
					<el-upload
					  :disabled="Disabled"
					  class="avatar-uploader"
					  :data="uploadDatas"
					  :action="this.hostname+'/manage/sys/fileHandle/upload'"
					  :show-file-list="false"
					  :on-preview="IcpView"
					  :on-remove="handleRemove"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <div class="coverDialog" v-if="!btn_turn">
						  <div class="layer" @click="handleFileEnlarge(ruleForm.icpUrl)">
								<i class="el-icon-view"></i>
							</div>
							<div class="del">
								<i @click="handleFileRemove(index)" class="el-icon-delete2"></i>
							</div>
					  </div>
					  <img v-if="ruleForm.icpUrl" :src="ruleForm.icpUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				
				<el-form-item label="其他资质">
					<el-upload
					  :limit="10"
					  :disabled="Disabled"
					  :data="uploadDatas"
					  :action="this.hostname+'/manage/sys/fileHandle/upload'"
					  list-type="picture-card"
					  :file-list="fileList"
					  :on-preview="handlePictureCardPreview"
					  :on-success="otherAvatarSuccess"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog visible.sync="dialogVisible">
					  <img width="100%" :src="ruleForm.othersUrl" alt="">
					</el-dialog>
				</el-form-item>

				<el-form-item label="邮箱通知">
					<el-switch
					  @change="mailStautsFn"
					  on-text ="启用"
                      off-text = "禁用"
					  :disabled="Disabled"
					  v-model="mailVal"
					  on-color="#13ce66"
					  off-color="#dadde5">
					</el-switch>
				</el-form-item>
				
				<!--  prop="budget" -->
				<el-form-item label="总预算">
					<el-input v-model="ruleForm.budget" type="number" :disabled="Disabled"></el-input>
				</el-form-item>
				<el-form-item label="单日预算">
					<el-input v-model="ruleForm.base_dayBudget" type="number" :disabled="Disabled"></el-input>
				</el-form-item>

				<!-- prop="descInfo" -->
				<el-form-item label="备注">
					<el-input
					  :disabled="Disabled"
					  type="textarea"
					  :rows="4"
					  placeholder="请输入内容"
					  v-model="ruleForm.descInfo">
					</el-input>
					<span class="unit_infro">备注信息可以填写一些您所需要的其他信息</span>
				</el-form-item>
  <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				uploadDatas: {
					bucket: "mddsp",
					ohtersPic: []
				},
				fileList: [],
				mailVal: false,
				msg: "返回列表",
				turn: false,
				btn_turn: false,
				imageUrl: "",
				Disabled: "",
				ruleForm: {},
		        rules: {
		          name: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          email: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
		          ],
		          typeName: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
				  ],
				   level: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
				  ],
				   contactName: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				   contactTel: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				   contactAddress: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				   budget: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				   base_dayBudget: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				   descInfo: [
		            { required: true, message: '这一项是必填的', trigger: 'blur' }
				  ],
				  icpUrl: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
				  ],
				  businessLicenseUrl: [
		            { required: true, message: '这一项是必填的', trigger: 'change' }
				  ]
		        },
		        selectType: [],
		        typeid: "",
				typename: "",
				isDisable: true,
				statusRadio: true
		      }
			},
		mounted() {
			this.Init(1);
		},
		methods: {
			Init(turn) {
				var that = this;
				var datas = {
					id: this.$route.query.id
				}
				this.$axios.get(this.hostname+'/manage/dsp/userInfo/admin/toEdit',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data);
					that.ruleForm = res.data;
					that.selectDataFn();
					//状态开关
					if(that.ruleForm.onlineStatus == 1) {
						that.statusRadio = true
					}else {
						that.statusRadio = false
					}
					// 审核状态判断
					switch(res.data.proveStatus) {
						case 0:
							that.statusInfo = "未提交";
							break;
						case 1:
							that.statusInfo = "审核中";
							break;
						case 2:
							that.statusInfo = "审核成功";
							that.isDisable = null
							break;
						case 3:
							that.statusInfo = "审核失败";
							break;
					}
                    that.uploadDatas.ohtersPic = that.ruleForm.othersUrl.split(',');
                    if(turn == 1) {
                    	// 多张图片上传渲染
	                    for(var i = 0,L = that.ruleForm.othersUrl.split(',').length; i < L; i++) {
	                    	that.fileList.push({url: that.ruleForm.othersUrl.split(',')[i]});
	                    	// that.fileList = [{url: "http://peiema7sz.bkt.clouddn.com/mddsp-20180904174116@|@jiantou.png"},{url: "http://peiema7sz.bkt.clouddn.com/mddsp-20180904174116@|@jiantou.png"}];
	                    }
                    }
                    // 邮箱是否通知
                    if(that.ruleForm.isNotifyByEmail == 0) {
                    	that.mailVal = false;
                    	that.ruleForm.isNotifyByEmailStauts = false;
                    }else {
                    	that.mailVal = true;
                    	that.ruleForm.isNotifyByEmailStauts = true;
                    }
                }, function(err){
                    console.log(err);
                })
			},
			// 下拉菜单Init
			selectDataFn() {
				var that = this;
				let username = localStorage.getItem('ms_username');
				var datas = {
					busNum: "b001"
				}
				this.$axios.get(this.hostname+'/manage/dsp/param/listDspConfigData',{params: datas}).then(function(res){
                    // 响应成功回调
                    console.log(res.data);
                    that.selectType = res.data;
                }, function(err){
                    console.log(err);
                })
			},
			goBack() {
				this.$router.go(-1);
			},
			EditFn() {
				this.Disabled = null;
				this.btn_turn = true;
			},
			cancelFn() {
				this.Disabled = "";
				this.btn_turn = false;
				this.Init();
			},
			IcpView(res,file) {
				console.log(res+"66:"+file);
			},
			handleAvatarSuccess(res, file) {
				if(res.resultCode == 200) {
					this.ruleForm.icpUrl = res.data;
				}
				console.log(res);
		        this.imageUrl = URL.createObjectURL(file.raw);
		        console.log("666"+this.imageUrl);
		    },
		    otherAvatarSuccess(res) {
		    	console.log(res);
		    	if(res.resultCode == 200) {
		    		this.uploadDatas.ohtersPic.push(res.data);
					this.ruleForm.othersUrl = res.data;
				}
				console.log(this.uploadDatas);
		    },
		    yyleAvatarSuccess(res) {
		    	if(res.resultCode == 200) {
					this.ruleForm.businessLicenseUrl = res.data;
				}
		    },
		    beforeAvatarUpload(file) {
		        // const isJPG = file.type === 'image/jpeg';
		        // const isLt2M = file.size / 1024 / 1024 < 2;
		        // if (!isJPG) {
		        //   this.$message.error('上传头像图片只能是 JPG 格式!');
		        // }
		        // if (!isLt2M) {
		        //   this.$message.error('上传头像图片大小不能超过 2MB!');
		        // }
		        // return isJPG && isLt2M;
		    },
		    handleFileRemove(a) {
				console.log(a);
			},
			// 预览查看图片
			handleFileEnlarge(urls) {
				window.open(urls);
			},
		    // 删除上传图片
		    handleRemove(file) {
		    	console.log(file.url);
		    	for(var i = 0, L = this.uploadDatas.ohtersPic.length; i < L; i++) {
		    		if(file.url == this.uploadDatas.ohtersPic[i]) {
		    			console.log(i);
		    			this.uploadDatas.ohtersPic.splice(i,1);
		    		}
		    	}
			},
			handlePictureCardPreview(val) {
				window.open(val.url);
			},
		    mailStautsFn(val) {
		    	console.log(val);
		    	if(val){
		    		this.ruleForm.isNotifyByEmail = 1
		    	}else {
		    		this.ruleForm.isNotifyByEmail = 0
		    	}
		    },
		    // 下拉选项选择
		    selectFn(event, item) {
		    	for(var i = 0, L = this.selectType.length; i < L; i++) {
		    		if(this.selectType[i].valueStr == event) {
		    			this.typeid = this.selectType[i].valueStr
		    			this.typename = this.selectType[i].keyStr
		    		}
		    	}
		    },
		    // 保存操作
			saveFn() {
				var that = this;
				that.$refs.ruleForm.validate((valid) => {
					if(valid) {
						var params = new URLSearchParams();
						params.append('id', this.$route.query.id);
						params.append('name', that.ruleForm.name);
						params.append('email', that.ruleForm.email);
						params.append('typeId', that.typeid);
						params.append('typeName', that.typename);
						params.append('level', that.ruleForm.level);
						params.append('contactName', that.ruleForm.contactName);
						params.append('contactAddress', that.ruleForm.contactAddress);
						params.append('contactTel', that.ruleForm.contactTel);
						params.append('businessLicenseUrl', that.ruleForm.businessLicenseUrl);
						params.append('icpUrl', that.ruleForm.icpUrl);
						params.append('othersUrl', that.uploadDatas.ohtersPic);
						params.append('isNotifyByEmail', that.ruleForm.isNotifyByEmail);
						params.append('descInfo', that.ruleForm.descInfo);

						params.append('budget', that.ruleForm.budget); // 总预算
						params.append('base_dayBudget', that.ruleForm.base_dayBudget); // 单日预算
						

						that.$axios.post(that.hostname+'/manage/dsp/userInfo/admin/update',params).then(function(res){
							// 响应成功回调
							console.log(res.data);
							if(res.data.resultCode == 200) {
								that.Disabled = "";
								that.btn_turn = false;
								that.$notify({
								title: '成功',
								message: res.data.message,
								type: 'success'
								});
							}else {
								that.$notify.error({
								title: '错误',
								message: res.data.message
								});
							}
						}, function(err){
							console.log(err);
						})
					}else {
						that.$message.error('请检查带*输入框否填写数据和图片是否上传');
					}
				})
			
			},
			//公用函数=>改变状态fn
			changeFn(val) {
				var Values;
				if(val) {
					Values = 1
				}else {
					Values = 0
				}
				this.publicFn.statusInitFn(this,this.ruleForm.id,Values,'/manage/dsp/userInfo/admin/changeStatus');
			}
    	}
	}
</script>
<style scoped>
	.unit_one_top {
		width: 100%;
		height: 2vw;
		line-height: 2vw;
		/*background: red;*/
	}
		.unit_o_left_btn {
			float: left;
			width: 120px;
			height: 100%;
			text-align: center;
			background: #D8D8D8;
			font-size: .9rem;
			cursor: pointer;
		}
		.unit_o_left_btn:hover {
			font-weight: bold;
		}
			.unit_o_left_btn i {
				font-size: .8rem;
				margin-right: 5px;
			}
		.unit_o_right {
			float: right;
			width: 30%;
			height: 100%;
		}
		.unit_o_right button {
			float: right;
			margin-left: 15px;
			height: 90%;
			width: 80px;
			font-size: .9rem;
		}
		.unit_o_right label {
			float: right;
			margin-right: 15px;
			margin-top: 7px;
		}

		.unit_o_content,.unit_o_content2 {
			width: 100%;
			margin-top: 1vw;
			padding: 2vw 0 .2vw 0;
			background: #FAFAFA;
		}
			.unit_lafite .unit_o_content form,.unit_o_content2 form {
				width: 70%;
				margin-left: 15%;
			}

		.unit_infro {
			color: gray;
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
		
		 .layer {
			  float: left;
			  width: 40%;
			  font-size: 1.2vw;
			  margin-top: 40%;
			  margin-left: 15%;
		  }
		  .del {
			  float: left;
			  width: 20%;
			  font-size: 1.2vw;
			  margin-top: 40%;
		  }
</style>