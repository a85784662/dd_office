// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(VueResource);
Vue.use(MintUI);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*Vue.prototype.apiurl = 'http://183.66.213.82:3000';*/
Vue.prototype.apiurl = 'http://172.168.10.21:3001';