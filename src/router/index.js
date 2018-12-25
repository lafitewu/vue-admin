import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/personal',
                    component: resolve => require(['../components/page/personal/personal.vue'], resolve)    // 基本信息
                },
                {
                    path: '/personal_Edit',
                    component: resolve => require(['../components/page/personal/personalEdit.vue'], resolve)    // 基本信息编辑页面
                },
                {
                    path: '/init_passworld',
                    component: resolve => require(['../components/page/init_passworld.vue'], resolve)    
                },
                {
                    path: '/applist',
                    component: resolve => require(['../components/page/appCenter/appList'], resolve)  //应用列表
                },
                {
                    path: '/setAd',
                    component: resolve => require(['../components/page/appCenter/setAd'], resolve)  // 广告设置
                },
                {
                    path: '/adDetails',
                    component: resolve => require(['../components/page/appCenter/detailMsg'], resolve)  
                },
                {
                    path: '/adList',
                    component: resolve => require(['../components/page/appCenter/adList'], resolve)  
                },
                {
                    path: '/account',
                    component: resolve => require(['../components/page/accountCenter/accountAll'], resolve)  
                },
                {
                    path: '/cash',
                    component: resolve => require(['../components/page/accountCenter/cash'], resolve)  //提现页面
                },
                {
                    path: '/Income',
                    component: resolve => require(['../components/page/dataCenter/Income'], resolve)  //收入报表
                },
                {
                    path: '/Application',
                    component: resolve => require(['../components/page/dataCenter/application'], resolve)  //收入报表
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
