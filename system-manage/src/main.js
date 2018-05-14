import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/vuex/index.js';
import ElementUI from 'element-ui';
import 'common/less/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '@/components/global.js';
import './permission';
import { getHttp } from '@/api/api';
import {ERR_OK} from './common/js/flag';
import { deepClone } from '@/common/js/util';

const _import = require('./router/_import_' + process.env.NODE_ENV);

getHttp('/api/project/list', '').then(res => {
  if (res.data.code === 200) {
    let data = res.data.data;
    let addRoutes = [];
    data.forEach(item => {
      let route = Object.assign({}, {
        id: 1,
        name: item.name,
        path: item.path,
        component: _import('mainFrame/mainFrame'),
        children: [
          {
            name: item.name,
            path: item.children[0].path,
            component: _import(item.children[0].componentName)
          }
        ]
      });
      console.log(123);
      console.log(route);
      addRoutes.push(route);
    });
    router.addRoutes(addRoutes);
    // 默认只显示第一个子系统
    store.dispatch('addVisitedViews', deepClone(addRoutes[0]));
    // 子系统信息列表
    store.dispatch('showAllViews', deepClone(addRoutes));
    // 路由列表
    store.dispatch('setRouters', addRoutes);
  }
});
// axios.get('/api/project/list').then(res => {
//   let code = res.data.code;
//   if (code === 0) {
//     let data = res.data.data;
//     let routers = [];
//     data.forEach(item => {
//      // item.component = Object.assign({}, _import('mainFrame/mainFrame'));
//       // console.log(Object.assign({}, _import(`${item.componentName}/${item.componentName}`)));
//      // item.children[0].component = _import(item.component);
//     let router = {
//       name:item.name,
//       path:item.path,
//       component: _import('mainFrame/mainFrame'),
//       children: [
//        {
//          name: item.name + '首页',
//          path: item.children[0].path,
//          component: _import(item.children[0].componentName)
//        }
//       ]
//     };
//      // alert(JSON.stringify(router));
//       routers.push(router);
//     });
//
//     router.addRoutes(routers);
//     store.dispatch('showAllViews', routers);
//     console.log(router);
//     router.push(routers[0].path);
//   }
// });
Vue.prototype.$axios = axios;
Vue.prototype.ERR_OK = ERR_OK;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
