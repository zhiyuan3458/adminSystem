const tagsView = {
  state: {
    /* 所有子系统列表 */
    projectList: [],
    /* 显示在底部导航栏的子系统列表 */
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    SHOW_ALL_VIEWS: (state, data) => {
      state.projectList = state.projectList.concat(data);
    },
    ADD_VISITED_VIEWS: (state, view) => {
      /*
        some表示检测数组的元素是否满足某个条件，比如数组中每个元素的path === view.path
        返回true或false
      */
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push({
        name: view.name,
        path: view.path
      });
      // if (!view.meta.noCache) {
      //   state.cachedViews.push(view.name);
      // }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    // 修改过，兼容ie
    DEL_OTHERS_VIEWS: (state, view) => {
      for (let i = 0; i < state.visitedViews; i++) {
        if (state.visitedViews[i].path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, i + 1);
          break;
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];
    }
  },
  actions: {
    showAllViews ({ commit }, data) {
      commit('SHOW_ALL_VIEWS', data);
    },
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    },
    delVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delAllViews ({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS');
        resolve([...state.visitedViews]);
      });
    }
  }
};

export default tagsView;
