<template>
  <li class="tree-item">
    <span class="item-icon" :class="[isParent ? 'parent' : 'leave', open ? 'open' : 'closed']"  @click="toggleIcon"></span>
    <a href="" class="item-content">
      <span class="context-icon" :class="isParent ? 'organization-fa' : 'organization'"></span>
      {{treeData.name}}
    </a>
    <ul class="children-tree" v-show="open">
      <tree-item v-for="(item, index) in treeData.children" :key="index" :treeData="item"></tree-item>
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'treeItem',
  data () {
    return {
      open: true
    };
  },
  props: {
    treeData: Object
  },
  computed: {
    isParent () {
      return this.treeData.children && this.treeData.children.length;
    }
  },
  methods: {
    toggleIcon (e) {
      e.preventDefault();
      if (this.isParent) {
        this.open = !this.open;
      }
    }
  },
  mounted () {
    // 返回Tree的根,即递归Tree时的最顶层那个vue-drag-tree组件
    let ok = false;
    let that = this;
    while (!ok) {
      // 如果父组件有data属性，说明当前组件是Tree组件递归调用发生时的第一个组件。
      // Warning: 因为是判断data属性是否存在，所有在别人使用该组件时，属性名必须得是data
      // v1.0.9-update: add another judgement method.
      if (that.$parent.treeData) {
        ok = true;
        // 交换两者的数据
        break;
      }
      that = that.$parent;
    }
    console.log(that.treeData);
    return that;
  }
};
</script>

<style lang="less">
a {
  text-decoration: none;
}
.tree-item {
  color: #333;
  padding: 0;
  margin: 0;
  list-style: none;
  line-height: 22px;
  text-align: left;
  white-space: nowrap;
  outline: 0;
  .item-icon {
    width: 18px;
    height: 18px;
    min-width: 0;
    line-height: 0;
    margin: 0 2px 0 0;
    display: inline-block;
    vertical-align: middle;
    border: 0 none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-attachment: scroll;
    &.parent {
      &.open {
        background-image: url(../img/zTreeStandard.png);
        background-position: -92px -18px;
      }
      &.closed {
        background-image: url(../img/zTreeStandard.png);
        background-position: -75px -18px;
      }
    }
    &.leave {
      background-position: -56px -18px;
      background-image: url(../img/zTreeStandard.png);
    }
  }
  .item-content {
    color: #333;
    font-size: 12px;
    outline: none;
    line-height: 22px;
    text-align: left;
    white-space: nowrap;
    font-family: "宋体", Arial, sans-serif;
    .context-icon {
      min-width: 0;
      line-height: 0;
      margin: 0 2px 0 0;
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
      border: 0 none;
      cursor: pointer;
      outline: none;

      &.organization-fa {
        background: url(../img/organization_fa.png) no-repeat center !important;
      }
      &.organization {
        background: url(../img/organization.png) no-repeat center !important;
      }
    }
  }
  .children-tree {
    margin: 0;
    padding: 0 0 0 18px;
    line-height: 22px;
    text-align: left;
    white-space: nowrap;
    background: url(../img/line_conn.gif) 0 0 repeat-y;
    background-position: -2px -3px;
  }

  &:last-of-type span {
    background-position: -57px -36px;
    background-image: url(../img/zTreeStandard.png);
  }
}
</style>
