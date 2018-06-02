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
import {ERR_OK} from './common/js/common';
import '@/common/less/theme.less';
import '@/utils/util.js';

/* ztree插件 */
import $ from 'jquery';
import '../plugins/ztree/js/jquery.ztree.core.min.js';
import '../plugins/ztree/js/jquery.ztree.excheck.min.js';

/* Web uploader */
// import '@/components/uploader/webuploader.js';

const _import = require('./router/_import_' + process.env.NODE_ENV);

// getHttp('/api/subsystem', '').then(res => {
//   if (res.data.code === 200) {
//     let data = res.data.data;
//     let addRoutes = [];
//     data.forEach(item => {
//       let route = Object.assign({}, {
//         id: item.id,
//         name: item.name,
//         path: item.path,
//         redirect: item.path + '/index',
//         component: _import('mainFrame/mainFrame'),
//         children: [
//           {
//             name: item.name,
//             path: 'index',
//             component: _import(item.componentName)
//           }
//         ]
//       });
//       addRoutes.push(route);
//     });
//     router.addRoutes(addRoutes);
//     // 默认只显示第一个子系统
//     store.dispatch('addVisitedViews', deepClone(addRoutes[0]));
//     // 子系统信息列表
//     store.dispatch('showAllViews', deepClone(addRoutes));
//     // 路由列表
//     store.dispatch('setRouters', addRoutes);
//     // 设置token,模拟一下
//     store.dispatch('setToken', 'lvzhiyuan');
//     console.log(store.state.user);
//     sessionStorage.setItem('routers', JSON.stringify(addRoutes));
//   }
// });

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
