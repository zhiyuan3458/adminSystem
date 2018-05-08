import Vue from 'vue';
import Vuex from 'vuex';
import tagsView from './modules/tagsView';
import app from './modules/app/app';
import permission from './modules/permission/permission';
import getters from './getter';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tagsView,
    app,
    permission
  },
  getters
});

export default store;
