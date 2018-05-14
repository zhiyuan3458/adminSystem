// import router from './router';
// import store from './vuex';
// import { getHttp } from '@/api/api';
// import { deepClone } from '@/common/js/util';
//
// const _import = require('@/router/_import_' + process.env.NODE_ENV);
//
// router.beforeEach((to, from, next) => {
//   if (sessionStorage.getItem('routers')) {
//     getHttp('/api/project/list', '').then(res => {
//       if (res.data.code === 200) {
//         let data = res.data.data;
//         let addRoutes = [];
//         data.forEach(item => {
//           let route = Object.assign({}, {
//             id: 1,
//             name: item.name,
//             path: item.path,
//             component: _import('mainFrame/mainFrame'),
//             children: [
//               {
//                 name: item.name,
//                 path: item.children[0].path,
//                 component: _import(item.children[0].componentName)
//               }
//             ]
//           });
//           addRoutes.push(route);
//         });
//         router.addRoutes(addRoutes);
//         // 默认只显示第一个子系统
//         store.dispatch('addVisitedViews', deepClone(addRoutes[0]));
//         // 子系统信息列表
//         store.dispatch('showAllViews', deepClone(addRoutes));
//         // 路由列表
//         store.dispatch('setRouters', addRoutes);
//       }
//     });
//     // let routes = JSON.parse(sessionStorage.getItem('routers'));
//     // store.dispatch('setRouters', routes);
//     // router.addRoutes(routes);
//     // console.log(to.path);
//     next();
//   } else {
//     next({path: '/login'});
//   }
//   // router.addRoutes(store.getters.addRouters);
//   // next({ ...to, replace: true });
// });
