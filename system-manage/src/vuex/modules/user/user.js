const user = {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  }
};

export default user;
