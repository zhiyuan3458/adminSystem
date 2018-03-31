import { type } from './mutation-type';

const state = {
  collaspeWrapperWidth: 0,
  lzyTableWrapperWidth: 0
};

const getters = {
  collaspeWrapperWidth: state => state.collaspeWrapperWidth
};

const mutations = {
  [type.CHANGE_COLLAPSEBAR_WIDTH] (state, collaspeWrapperWidth) {
    state.collaspeWrapperWidth = collaspeWrapperWidth;
  },
  [type.CHANGE_LZY_TABLE_WARPPER_WIDTH] (state, lzyTableWrapperWidth) {
    state.lzyTableWrapperWidth = lzyTableWrapperWidth;
  }
};

export default {
  state,
  getters,
  mutations
};
