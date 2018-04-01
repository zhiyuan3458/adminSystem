<template>
  <div class="main-table-content-wrapper" ref="tableWrapper">
    <collapse-bar :collapsedWrapper="collapsedWrapper" @getLzyTableWrapperMarginLeft="getLzyTableWrapperMarginLeft"></collapse-bar>
    <lzy-table-wrapper :lzyTableWrapper="lzyTableWrapper"></lzy-table-wrapper>
  </div>
</template>

<script type="text/ecmascript-6">
import CollapseBar from '@/components/collapseBar/collapseBar.vue';
import LzyTableWrapper from '@/components/lzyTableWrapper/lzyTableWrapper.vue';

export default {
  data () {
    let collapsedWrapperWidth = 260;
    return {
      collapsedWrapper: {
        width: collapsedWrapperWidth,
        draggable: true, // 是否可拖拽
        collapsable: true, // 是否可伸缩
        topShow: false, // 是否显示上部按钮
        data: []
      },
      lzyTableWrapper: {
        marginLeft: collapsedWrapperWidth
      }
    };
  },

  components: {
    CollapseBar,
    LzyTableWrapper
  },

  methods: {
    getLzyTableWrapperMarginLeft (...data) {
      this.lzyTableWrapper.marginLeft = data[0].left;
    }
  },

  mounted () {
    this.lzyTableWrapper.marginLeft = this.collapsedWrapper.width;
  }
};
</script>

<style lang="less">
  @import "../../common/less/fonts.css";
  .main-table-content-wrapper {
    position: relative;
    overflow: hidden;
  }

  @keyframes collapse-in {
    0% {
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
