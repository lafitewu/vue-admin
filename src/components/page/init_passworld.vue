<template>
	<div class="passworld">
		<div class="pass_title">{{title}}</div>
		<div class="init_list" v-for="item in pass_arr">
			<font>{{item.label}}：</font><span>*</span><el-input class="init_input" v-model="item.val" :placeholder="item.holder"></el-input>
		</div>
		<div class="init_btn">
            <el-button class="init_click" type="primary" @click="edits">确认修改</el-button>
        </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: "修改密码",
				pass_arr: [
					{label: "旧密码",holder: "请输入您的旧密码",val: ""},
					{label: "新密码",holder: "请输入您的新密码",val: ""},
					{label: "重复新密码",holder: "请再一次输入您的旧密码",val: ""}
				]
			}
		},
		methods: {
			edits() {
				var that = this;
				var psd = {
					"password": that.$data.pass_arr[0].val,
					"password1": that.$data.pass_arr[1].val,
					"password2": that.$data.pass_arr[2].val
				}
				that.$http.post("http://ad.midongtech.com/api/dev/modifyPassword"+this.url_token(),psd).then(function(response){
					this.$message.error(response.data.msg);
	            });
			}
		}
	}
</script>
<style>
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
			color: red;
			float: left;
			font-size: 1.5rem;
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
</style>