import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import global_ from './Base.vue'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;

// axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
