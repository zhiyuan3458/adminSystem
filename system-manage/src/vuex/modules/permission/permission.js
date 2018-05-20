import { commonRouters } from '@/router/index';

const permission = {
  state: {
    /* 当前路由
     * 路由id
     * 路由name
     * 路由redirect
     * 路由children
      * */
    currentRoute: [],
    /* 用来存储路由表 */
    addRouters: [],
    msg: [],
    test: []
  },
  mutations: {
    /* 设置当前的根路由，主页 */
    SET_CURRENT_ROUTER: (state, data) => {
      if (state.currentRoute.some(item => item.name === data.name)) return;
      let arr = [];
      arr.push(data);
      state.currentRoute = arr;
    },
    /* 添加子系统的菜单以及对应的路由信息 */
    ADD_MENUS: (state, data) => {
      state.currentRoute[0].children = data;
    },
    ADD_ROUTERS: (state, data) => {
      state.addRouters = commonRouters.concat(data);
    },
    REMOVE_CURRENT_ROUTES (state) {
      state.currentRoute = [];
    },
    ERR_MSG: (state, msg) => {
      state.msg = msg;
    },
    /* 测试 */
    TEST: (state, data) => {
      state.test = data;
    }
  },
  actions: {
    setCurrrentRoute ({commit}, data) {
      commit('SET_CURRENT_ROUTER', data);
    },
    /* 添加子系统的菜单以及对应的路由信息 */
    addMenus ({commit}, data) {
      commit('ADD_MENUS', data);
    },
    /* 清空currentRoute数据 */
    removeCurrentRoutes ({ commit }) {
      commit('REMOVE_CURRENT_ROUTES');
    },
    addRouters ({ commit }, data) {
      commit('ADD_ROUTERS', data);
    },
    err_msg ({ commit }, data) {
      commit('ERR_MSG', data);
    },
    /* 测试 */
    test ({ commit }, data) {
      commit('TEST', data);
    }
  }
};

export default permission;
