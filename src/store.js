import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueCookies from 'vue-cookies';
Vue.use(Vuex)
const moduleA = new Vuex.Store ({
    state: { 
      hostname: "http://testad.midongtech.com", 
      options: [],
      appVal: '',
      tokens: VueCookies.get('token')
    },
    //同步
    mutations: { 
      appInit() {
        var that = this;
        axios.get(that.state.hostname+"/api/dev/getApps?token="+that.state.tokens).then(function(res) {
          that.state.options = res.data.data;
          // that.state.appVal = that.state.options[0].id;
        }).catch(function(err) {
          console.log(err);
        })
        // that.$http.get(that.hostname+"/api/dev/getApps"+this.url_token()).then(function(res){
        //   console.log(res);
        //   that.state.options = res.body.data;
        //   that.state.appVal = that.appInitVal || that.options[0].id;
        // })
    }
    },  
    //异步
    actions: { 
      // appInit()
    },    
    getters: { /**方法**/ }
  })
  
  const moduleB = {
    state: { /*data**/ },
    mutations: { /**方法**/ },
    actions: { /**方法**/ },
    getters: { /**方法**/ }
  }
  
  moduleA.commit('appInit');

  export default moduleA
  // export default new Vuex.Store({
  //   modules: {
  //     a: moduleA,
  //     b: moduleB
  //   }
  // })
