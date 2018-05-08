<template>
  <div
    class="scroll-container"
    ref="scrollContainer"
    @wheel.prevent="handleScroll"
    >
    <div class="scroll-wrapper" ref="scrollPane" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const padding = 15;
export default {
  name: 'scrollPane',
  data () {
    return {
      left: 0
    };
  },
  methods: {

    // 滚动鼠标时导航栏左右移动
    handleScroll (e) {
      // wheelDelta兼容chrome，向上滚动表示+120，向下则-120
      // wheelDelta兼容chrome，向上滚动表示+120，向下则-120
      // deltaY兼容火狐，向上滚动表示+3，向下则-3
      // deltaY兼容火狐，向上滚动表示+3，向下则-3
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      const $container = this.$refs.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $wrapper = this.$refs.scrollPane;
      const $wrapperWidth = $wrapper.offsetWidth;

      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta);
      } else { // 鼠标滚轮往下移动时
        // 当标签撑爆了container宽度时
        if ($containerWidth - padding < $wrapperWidth) {
          // 最后一个标签出现（滚动到尽头）时，限制不能再滚动
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left;
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding);
          }
        } else {
          this.left = 0;
        }
      }
    },
    moveToTarget ($target) {
      const $container = this.$refs.scrollContainer;
      const $containerWidth = $container.offsetWidth;
      const $targetLeft = $target.offsetLeft;
      const $targetWidth = $target.offsetWidth;

      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding;
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding);
      }
    }
  }
};
</script>

<style lang="less">
.scroll-container {
  width: 100%;
  height: 46px;
  line-height: 46px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  transition: all .8s;

  .scroll-wrapper {
    position: absolute;
  }

  .tool-wrapper {
    float: right;
    line-height: 35px;
    margin-right: 15px;

    .el-icon-menu, .el-icon-arrow-up {
      padding: 5px;
      cursor: pointer;
    }

    .el-icon-menu {
      position: relative;
      .project-list {
        list-style-type: none;
        position: absolute;
        top: 10px;
        right: 10px;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
      }
    }
  }
}
</style>
