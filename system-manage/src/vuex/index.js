import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user/user';
import tagsView from './modules/tagsView';
import app from './modules/app/app';
import permission from './modules/permission/permission';
import getters from './getter';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    tagsView,
    app,
    permission
  },
  getters
});

export default store;
