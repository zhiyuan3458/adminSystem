const tagsView = {
  state: {
    /* 所有子系统列表 */
    projectList: [],
    /* 显示在底部导航栏的子系统列表 */
    visitedViews: [],
    cachedViews: [],
    menus: {
      asideBarMenus: [],
      treeMenus: []
    }
  },
  mutations: {
    /*  所有子系统的列表
    * 包括子系统的所有路由信息
    * 子系统id
    * 子系统name
    * 子系统path
    * 子系统redirect
    * */
    SHOW_ALL_VIEWS: (state, data) => {
      state.projectList = state.projectList.concat(data);
      state.visitedViews = state.projectList;
    },
    /*
     * 显示底部导航栏的所有子系统
     * */
    ADD_VISITED_VIEWS: (state, view) => {
      /*
        some表示检测数组的元素是否满足某个条件，比如数组中每个元素的name === view.name
        返回true或false
      */
      if (state.visitedViews.some(v => v.id === view.meta.subSystemId)) return;
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        meta: {
          subSystemId: view.meta.subSystemId
        }
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
    SHOW_ASIDEBAR_MENUS (state, data) {
      state.menus.asideBarMenus = data;
    },
    SHOW_TREE_MENUS (state, data) {
      state.menus.treeMenus = data;
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
    showAsideBarMenus ({ commit }, data) {
      commit('SHOW_ASIDEBAR_MENUS', data);
    },
    showTreeMenus ({ commit }, data) {
      commit('SHOW_TREE_MENUS', data);
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
