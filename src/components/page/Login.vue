<template>
    <div class="login-wrap">
        <div class="ms-title">幂动广告平台管理后台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
                <!-- submitForm('ruleForm') -->
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                // hostname: "http://ad.api.com",
                // hostname: "http://ad.midongtech.com"
            }
        },
        methods: {
            submitForm() {
                var that = this;
                that.$http.post(that.hostname+"/api/dev/login",{username: that.ruleForm.username,password: that.ruleForm.password}).then(function(response){
                    // console.log(response.data.data.token);
                    if(response.data.code == 1) {
                        that.$cookies.set('token',response.data.data.token,0) 
                        localStorage.setItem('ms_username',that.ruleForm.username)
                        // sessionStorage.setItem("name", res.data.name)   //sessionStorage储存，关闭浏览器即删除 
                        that.$router.push('/readme')
                    }else {
                        this.$message.error(response.data.msg);
                    }  
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>