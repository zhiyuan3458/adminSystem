import Vue from 'vue';
import Router from 'vue-router';
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
import Login from '@/pages/login/login';
import lzyTree from '@/components/lzyTree/lzyTree.vue';
import diuniTree from '@/components/diuniTree/diuniTree.vue';
import swiper from '@/pages/swiper/swiper.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

export const commonRouters = [
  {
    path: '',
    name: 'MainFrame',
    component: swiper,
    meta: {
      title: 'mainFrame'
    }
  }
];

export default new Router({
  routes: commonRouters
});

export const aysncRouter = [
  {
    path: '/roadMaintenanceSystem',
    compnent: MainFrame
  }
];

// routes: [
//   {
//     path: '/',
//     name: 'MainFrame',
//     component: MainFrame,
//     redirect: '/table',
//     meta: {
//       title: 'mainFrame'
//     },
//     children: [
//       {
//         path: '/table',
//         'name': '表格',
//         component: _import('roadProtectSystem', 'index'),
//         meta: {
//           title: '项目管理系统'
//         }
//       }
//     ]
//   },
//   {
//     path: '/login',
//     name: '登录',
//     component: Login
//   },
//   {
//     path: '/lzytree',
//     name: '树形结构',
//     component: lzyTree
//   }
// ]
