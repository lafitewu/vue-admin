<template>
	<div class="personal">
		<div class="person_title">{{title}}</div>
		<ul class="person_ul">
			<li v-for="item in msg">
				<span>{{item.name}}：</span>
				<font>{{item.val}}</font></li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: "个人基本信息",
				massage: [
					{name: "认证状态", val:"审核通过"},
					{name: "注册邮箱", val:"审核通过"},
					{name: "身份类型", val:"审核通过"},
					{name: "姓名", val:"审核通过"},
					{name: "联系地址", val:"审核通过"},
					{name: "所在地区", val:"审核通过"},
					{name: "手机号码", val:"审核通过"},
					{name: "QQ号码", val:"审核通过"},
					{name: "邮政编码", val:"审核通过"},
					{name: "身份证号", val:"审核通过"}
				],
				msg: []
			}
		},
		mounted() {
			var that = this;
			that.$http.jsonp("http://ad.midongtech.com/api/dev/profile"+this.url_token()).then(function(response){
                // console.log(response.data);
                // for(var i = 0;i < that.$data.massage.length;i++) {
                // 	console.log(response.data.data.length);
                // }
                that.$data.msg = response.data.data;
            });
		}
	}
</script>
<style>
	.person_title {
		font-size: 1.4rem;
		font-weight: bold;
		color: #324157;
		height: 3.5rem;
		width: 100%;
		border-bottom: 1px solid #BFCBD9;
	}
	.person_ul {
		margin-left: 1%;
		width: 80%;
	}
		.person_ul li {
			text-indent: 1.5rem;
			list-style: none;
			line-height: 3.5rem;
			height: 3.5rem;
			border-bottom: 1px dashed #AAAAAA;
		}
			.person_ul li span {
				display: block;
				width: 7.5rem;
				float: left;
				text-align: right;
			}
</style>