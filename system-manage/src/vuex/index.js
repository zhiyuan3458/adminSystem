import Vue from 'vue';
import Vuex from 'vuex';
import computeCollapseBarWidth from '@/vuex/modules/computeCollapseBarWidth/computeCollapseBarWidth.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    computeCollapseBarWidth
  }
});

export default store;
