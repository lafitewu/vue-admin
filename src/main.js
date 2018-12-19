import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import  VueResource  from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import VueCookies from 'vue-cookies';
import './assets/icon/index.css';

Vue.use(VueCookies)

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.prototype.$axios = axios;

// 兼容请求两次接口options
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;

Vue.prototype.url_token = function() {
	return "?token="+this.$cookies.get('token');
}
// 定义全局hostname
Vue.prototype.hostname = "http://ad.midongtech.com";  //http://testad.midongtech.com   http://ad.midongtech.com

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');