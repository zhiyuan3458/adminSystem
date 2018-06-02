import { type } from '@/vuex/modules/computeCollapseBarWidth/mutation-type.js';

export const changeCollaspeWrapperWidth = ({ commit }, collaspeWrapperWidth) => commit(type.GET_COLLAPSEBAR_WIDTH, collaspeWrapperWidth);
