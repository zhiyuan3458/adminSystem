<template>
<div class="lzy-table-wrapper" :style="{marginLeft: marginLeft + 'px'}">
  <div class="tool-wrapper" v-if="toolShow">
    <slot name="tool-wrapper"></slot>
  </div>
  <div class="table-container" v-if="tableShow">
    <slot name="table"></slot>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    marginLeft: Number,
    toolShow: Boolean
  },
  data () {
    return {
      tableShow: true
    };
  }
};
</script>

<style lang="less">
.lzy-table-wrapper {
  height: 100%;
}
</style>
