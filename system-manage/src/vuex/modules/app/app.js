const bottomHideValue = -46;
const app = {
  state: {
    sideBar: {
      opened: true,
      bottomValue: 0
    }
  },

  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sideBar.opened = !state.sideBar.opened;
      if (state.sideBar.opened) {
        state.sideBar.bottomValue = 0;
      } else {
        state.sideBar.bottomValue = bottomHideValue;
      }
    }
  },

  actions: {
    toggleSideBar ({commit}) {
      commit('TOGGLE_SIDEBAR');
    }
  }
};

export default app;
