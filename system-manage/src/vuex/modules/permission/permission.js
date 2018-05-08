import axios from 'axios';
const permission = {
  state: {
    addRouters: [],
    msg: ''
  },
  mutations: {
    GET_ROUTES: (state, data) => {
      state.addRouters = data;
    },
    ERR_MSG: (state, msg) => {
      state.msg = msg;
    }
  },
  actions: {
    getRouters ({commit}) {
      axios.get('/api/project/list').then(res => {
        let code = res.code;
        if (code === 0) {
          let addRouters = res.data;
          commit('GET_ROUTES', addRouters);
        } else {
          let msg = res.msg;
          commit('ERR_MSG', msg);
        }
      });
    }
  }
};

export default permission;
