<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nowPath: '',
                items: [
                    {
                        icon: 'iconfont el-icons-home',
                        index: 'readme',
                        title: '首页'
                    },
                     {
                         icon: 'el-icon-menu',
                         index: '1',
                         title: '应用中心',
                         subs: [
                             {
                                 index: 'applist',
                                 title: '应用列表'
                             },
                             {
                                 index: 'setAd',
                                 title: '广告设置'
                             },
                         ]
                     },
                     {
                         icon: 'iconfont el-icons-datas',
                         index: '2',
                         title: '数据中心',
                         subs: [
                             {
                                 index: 'Income',
                                 title: '收入报表'
                             },
                             {
                                 index: 'Application',
                                 title: '应用报表'
                             },
                         ]
                     },
                    {
                        icon: 'iconfont el-icons-personal',
                        index: '4',
                        title: '个人中心',
                        subs: [
                            {
                                index: 'personal',
                                title: '基本信息'
                            },
                            {
                                index: 'init_passworld',
                                title: '修改密码'
                            }
                        ]
                    },
                    {
                        icon: 'iconfont el-icons-countCenter',
                        index: '3',
                        title: '财务中心',
                        subs: [
                            {
                                index: 'account',
                                title: '财务记录'
                            },
                            {
                                index: 'cash',
                                title: '申请提款'
                            }
                        ]
                    },
                   
                ]
            }
        },
        mounted() {
            this.inits();
        },
        computed:{
            onRoutes(){
                this.nowPath = this.$route.path.replace('/','');

                if(this.nowPath == "personal_Edit") {
                    this.nowPath = "personal";
                }
                return this.nowPath
            }
        },
        methods: {
            inits() {
               var that = this;
                that.$http.jsonp(that.hostname+"/api/dev/userinfo"+this.url_token()).then(function(response){
                    // console.log(response.data)
                    if(response.data.code == 1) {
                        that.ruleForm = response.data.data;
                        if(that.ruleForm.pay_type == 3) {
                            that.items[4].subs[1].title = "申请预付"
                        }else {
                            that.items[4].subs[1].title = "申请提款"
                        }
                    }else {
                        that.$router.replace('/login');
                        that.$notify.error({
                            title: '温馨提示',
                            message: '您的账号在别处登录，请重新登录',
                        })
                    }
                }); 
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
