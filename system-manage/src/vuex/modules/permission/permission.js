import { commonRouters } from '@/router/index';

const permission = {
  state: {
    /* 用来存储路由表 */
    addRouters: [],
    msg: ''
  },
  mutations: {
    SET_ROUTERS: (state, data) => {
      state.addRouters = commonRouters.concat(data);
    },
    ADD_ROUTERS: (state, data) => {
      state.addRouters = commonRouters.concat(data);
    },
    ERR_MSG: (state, msg) => {
      state.msg = msg;
    }
  },
  actions: {
    setRouters ({commit}, data) {
      commit('SET_ROUTERS', data);
    },
    addRouters ({ commit }, data) {
      commit('ADD_ROUTERS', data);
    }
  }
};

export default permission;
