<template>
	<div class="setAd" v-loading="loading" element-loading-text="加载中...">
		<h3>{{msg}}</h3>
		<div class="selects">
			<el-select v-model="value" placeholder="请选择应用" @change="selectFn">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.appname"
			      :value="item.id"
			      >
			    </el-option>
			</el-select>
		</div>
		<div class="moneySet">
			<label class="money1">{{msg2}}</label>
			<el-input style="width:19%;margin-top: 0.5vw;" v-model="value2" placeholder=""></el-input>
		</div>
		
		<div class="money2">
			<label for="">{{msg3}}</label>
			<span class="appStatus">运行中</span>
		</div>

		<!-- <div class="money2">
			<label for="">{{msg4}}</label>
			<el-upload
				class="uploadFile"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">请将成功嵌入有米广告的安装包进行上传，文件大小超过50M,可以发邮件到verify@youmi.net。<br/>
上传成功后，我们将在每个工作日的16:00-18:00进行审核;审核通过即为“运行”状态，可获得正式广告</div>
			</el-upload>
		</div> -->

		<div class="money2">
			<label for="">{{msg5}}</label>
			<span>{{appsId}}</span>
			<!-- <el-input style="width:19%;margin-top: 0.5vw;" v-model="appsId" placeholder="" :disabled="isDisabled"></el-input> -->
			<!-- <div class="appCopy">复制</div> -->
			<!-- <span class="appInfo">嵌入SDK时使用，一个ID只能对应一个应用包名</span> -->
		</div>

		<div class="money2">
			<label for="">{{msg6}}</label>
			<span>{{keyId}}</span>
			<!-- <el-input style="width:19%;margin-top: 0.5vw;" v-model="keyId" placeholder="" :disabled="isDisabled"></el-input> -->
			<!-- <div class="appCopy">复制</div> -->
			<span class="appInfo">嵌入SDK时使用，此应用的专属密钥</span>
		</div>

		<!-- <div class="money2">
			<label for="">{{msg7}}</label>
			<el-select v-model="value" placeholder="请选择应用" @change="selectFn">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id"
			      >
			    </el-option>
			</el-select>
		</div> -->

		<!-- <div class="money2">
			<label for="">{{msg8}}</label>
			<el-input style="width:19%;margin-top: 0.5vw;" v-model="valueId" placeholder=""></el-input>
			<span class="appInfo">可填写多个关键字，不同关键字请用空格隔开</span>
		</div> -->

		<div class="money2">
			<label for="">{{msg9}}</label>
			<span>{{phonetype}}</span>
		</div>
		
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
				msg: '详细信息',
				msg1: '虚拟货币设置',
				msg2: '应用名称：',
				msg3: '应用状态：',
				msg4: '更新应用：',
				msg5: '应 用 I D：',
				msg6: '应用秘钥：',
				msg7: '应用类型：',
				msg8: '关 键 字 ： ',
				msg9: '应用平台：',
				value: '',
				value2: '',
				moneyVal: '100',
				options: [],
		        tableData3: [],
				multipleSelection: [],
				valueId: '',
				keyId: '',
				phonetype: '',
				isDisabled: true
			}
		},
		mounted() {
			this.Init();
		},
		methods: {
			// 初始化
			Init() {
				var that = this;
				that.$http.post(that.hostname+"/api/dev/getApps"+this.url_token()).then(function(res){
					that.loading = false;
					that.options = res.body.data;

					that.Id = that.options[0].id;
					that.value = that.options[0].appname;
					that.value2 = that.options[0].appname;
					that.appsId = that.options[0].id;
					that.keyId = that.options[0].dkey;
					that.phonetype = that.options[0].ostype;
				});
			},
			// 保存接口
			saveFn() {
				var that = this;
				that.loading = true;
				var datas = {
					id: that.Id,
					appname: that.value2
				};
				that.$http.post(that.hostname+"/api/dev/saveAppConfig"+this.url_token(),datas).then(function(res){
					// console.log(res.body);
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
				that.value = that.options[keys].appname;
				that.value2 = that.options[keys].appname;
				that.appsId = that.options[keys].id;
				that.keyId = that.options[keys].dkey;
				that.phonetype = that.options[keys].ostype;
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
			/* margin-top: 1.5vw; */
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
		/* .appStatus {
			padding: 5px 10px;
			background: #4D9705;
		} */
		.uploadFile {
			/* display: inline; */
			width: 70%;
			margin-top: 1vw;
		}
		.uploadFile .el-upload-dragger {
			width: 0;
			height: 0;
		}
		.appCopy {
			/* float: left; */
			display: inline;
			padding: 10px 20px;
			color: white;
			margin-left: 10px;
			background: #407ED2;
			cursor: pointer;
		}
		.appInfo {
			margin-left: 30px;
			color: gray;
			font-size: 13px;
		}
</style>
