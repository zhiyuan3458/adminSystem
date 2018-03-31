import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/vuex/index.js';
import ElementUI from 'element-ui';
import 'common/less/reset.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
