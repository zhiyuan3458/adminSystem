import Vue from 'vue';
import router from './router';
import store from './vuex';
import { getHttp } from '@/api/util';
import { deepClone } from '@/common/js/util';
import { ERR_OK } from './common/js/common';

const _import = require('@/router/_import_' + process.env.NODE_ENV);

// 递归获取叶子节点
let leaves = [];
function getLeaves (data, subSystemId) {
  if (data.constructor === Object) {
    if (data.children) {
      data.children.forEach(item => {
        return getLeaves(item, subSystemId);
      });
    } else {
      let obj = Object.assign({}, {
        name: data.name,
        path: data.path,
        component: _import(data.componentName),
        meta: {
          subSystemId: subSystemId
        }
      });
      leaves.push(obj);
    }
  }
}

/* 把菜单的树形组件的icon变成静态图片parentIcon与leaveIcon */
function getTreeMenu (data) {
  if (Array.isArray(data)) {
    data.forEach(item => {
      if (item.children) {
        // common.js规范，require直接传参数是不行的，只能用字符串加参数命名
        item.icon = require(`@/common/img/subSystem/${item.iconUrl}`);
        getTreeMenu(item.children);
      } else {
        item.icon = require(`@/${item.iconUrl}`);
      }
    });
  }
}

// src/src/
router.beforeEach((to, from, next) => {
  // 有token则直接查找子系统的菜单
  if (store.state.user.token) {
    if (to.meta.subSystemId === from.meta.subSystemId) {
      next();
    } else {
      // 有token但按了返回键
      if (to.meta.subSystemId !== from.meta.subSystemId && from.meta.subSystemId) {
        let toRoute = store.state.tagsView.projectList.find(item => item.id === to.meta.subSystemId);
        store.dispatch('setCurrrentRoute', toRoute);
        getHttp('/api/front/carte/listcarte', { subsystemId: to.meta.subSystemId }).then(res => {
          if (res.data.code === ERR_OK) {
            leaves = [];
            let data = res.data.data;
            let asideBarMenus = [];
            let treeMenus = [];
            data.forEach(item => {
              let obj = Object.assign({}, {
                imgUrl: require(`@/pages/${item.iconUrl}-white.png`),
                imgHoverUrl: require(`@/pages/${item.iconUrl}.png`)
              });
              asideBarMenus.push(obj);
              // 如果二级菜单栏有children，则递归
              if (item.children) {
                getTreeMenu(item.children);
                treeMenus.push(item.children);
                getLeaves(item, to.meta.subSystemId);
              }
            });
            // 提交菜单
            store.dispatch('showAsideBarMenus', asideBarMenus);
            store.dispatch('showTreeMenus', treeMenus);
            // addMenus把子路由信息添加进currentRoute中
            leaves.push(deepClone(store.state.permission.currentRoute[0].children.find(item => item.path === 'index')));
            store.dispatch('addMenus', leaves);
            router.addRoutes(store.state.permission.currentRoute);
            // sessionStorage.setItem('subSystemId', store.state.permission.currentRoute[0].id);
            next();
          }
        });
      } else {
        // 一开始初始化时
        getHttp('/api/front/carte/listcarte', { subsystemId: to.meta.subSystemId }).then(res => {
          if (res.data.code === ERR_OK) {
            leaves = [];
            let data = res.data.data;
            let asideBarMenus = [];
            let treeMenus = [];
            data.forEach(item => {
              let obj = Object.assign({}, {
                imgUrl: require(`@/pages/${item.iconUrl}-white.png`),
                imgHoverUrl: require(`@/pages/${item.iconUrl}.png`)
              });
              asideBarMenus.push(obj);
              // 如果二级菜单栏有children，则递归
              if (item.children) {
                getTreeMenu(item.children);
                treeMenus.push(item.children);
                getLeaves(item, to.meta.subSystemId);
              }
            });
            // 提交菜单
            store.dispatch('showAsideBarMenus', asideBarMenus);
            store.dispatch('showTreeMenus', treeMenus);
            // addMenus把子路由信息添加进currentRoute中
            leaves.push(deepClone(store.state.permission.currentRoute[0].children.find(item => item.path === 'index')));
            store.dispatch('addMenus', leaves);
            router.addRoutes(store.state.permission.currentRoute);
            sessionStorage.setItem('subSystemId', store.state.permission.currentRoute[0].id);
            next();
          }
        });
      }
    }
    // if (subSystemId !== store.state.permission.currentRoute[0].id) {
    //
    // } else {
    //   next();
    // }
  } else {
    // 设置token，模拟一下
    store.dispatch('setToken', 'lvzhiyuan');
    getHttp('/api/front/subsystem', '').then(res => {
      if (res.data.code === 200) {
        let data = res.data.data;
        let addRoutes = [];
        leaves = [];
        data.forEach(item => {
          let route = Object.assign({}, {
            id: item.id,
            name: item.name,
            path: item.path,
            redirect: item.path + '/index',
            component: _import('mainFrame/mainFrame'),
            iconUrl: item.iconUrl,
            children: [
              {
                name: item.name,
                path: 'index',
                component: _import(item.componentName),
                meta: {
                  subSystemId: item.id,
                  isIndex: true
                }
              }
            ]
          });
          addRoutes.push(route);
        });
        // 子系统信息列表
        let tt = deepClone(addRoutes);
        router.addRoutes(tt);
        store.dispatch('showAllViews', tt);
        // 如果f5刷新之后有sessionStorage有当前子系统id则添加子系统路由
        if (to.meta.subSystemId) {
          let subSystemId = to.meta.subSystemId;
          getHttp('/api/front/carte/listcarte', { subsystemId: subSystemId }).then(res => {
            if (res.data.code === ERR_OK) {
              let data = res.data.data;
              let asideBarMenus = [];
              let treeMenus = [];
              data.forEach(item => {
                let obj = Object.assign({}, {
                   imgUrl: require(`@/pages/${item.iconUrl}-white.png`),
                   imgHoverUrl: require(`@/pages/${item.iconUrl}.png`)
                });
                asideBarMenus.push(obj);
                // 如果二级菜单栏有children，则递归
                if (item.children) {
                  treeMenus = treeMenus.concat(item.children);
                  getLeaves(item, subSystemId);
                }
              });
              store.dispatch('showAsideBarMenus', asideBarMenus);
              store.dispatch('showTreeMenus', treeMenus);
              // 添加到vuex的addRouters
//          console.log(this.addRouters.find(item => item.id === id));
              // 当前高亮的路由列表
              let dd = deepClone(addRoutes.find(item => item.id === subSystemId));
              store.dispatch('setCurrrentRoute', dd);
              // addMenus把子路由信息添加进currentRoute中
              store.dispatch('addMenus', leaves);
              router.addRoutes(store.state.permission.currentRoute);
              let currentPath = store.state.permission.currentRoute[0].path;
              next({path: currentPath});
            }
          });
        } else {
          // 提交菜单
          getHttp('/api/front/carte/listcarte', { subsystemId: addRoutes[0].id }).then(res => {
            if (res.data.code === ERR_OK) {
              let data = res.data.data;
              let asideBarMenus = [];
              let treeMenus = [];
              data.forEach(item => {
                let obj = Object.assign({}, {
                  imgUrl: require(`@/pages/${item.iconUrl}-white.png`),
                  imgHoverUrl: require(`@/pages/${item.iconUrl}.png`)
                });
                asideBarMenus.push(obj);
                // 如果二级菜单栏有children，则递归
                if (item.children) {
                  treeMenus.push(item.children);
                  getLeaves(item, addRoutes[0].id);
                }
              });
              // 提交菜单
              store.dispatch('showAsideBarMenus', asideBarMenus);
              store.dispatch('showTreeMenus', treeMenus);
              // 添加到vuex的addRouters
//          console.log(this.addRouters.find(item => item.id === id));
              // 当前高亮的路由列表
              let dd = deepClone(addRoutes.find(item => item.id === addRoutes[0].id));
              store.dispatch('setCurrrentRoute', dd);
              router.addRoutes(store.state.permission.currentRoute);
              next({path: addRoutes[0].path});
            }
          });
        }
      }
    });
  }
  // if (sessionStorage.getItem('routers')) {
  //   console.log(JSON.parse(sessionStorage.getItem('routers')));
  //   let routes = JSON.parse(sessionStorage.getItem('routers'));
  //   // store.dispatch('setRouters', routes);
  //   // router.addRoutes(routes);
  //   console.log(router.options.routes);
  //   router.options.routes.push(routes);
  //   // router.options
  //   next();
  //   // console.log(123);
  //   // let routes = JSON.parse(sessionStorage.getItem('routers'));
  //   // store.dispatch('setRouters', routes);
  //   // router.addRoutes(routes);
  //   // next();
  // } else {
  //   next({path: '/login'});
  // }
  // router.addRoutes(store.getters.addRouters);
  // next({ ...to, replace: true });
});
