<template>
  <div class="collapsed-wrapper" ref="collapsedWrapper" :style="{width: collapsedWrapperWidth + 'px', height: computeCollapsedWrapperHeight, left: collapsedWrapperLeft + 'px'}">
    <div class="content-wrapper">
      <div class="top" v-if="collapsedWrapper.topShow"></div>
      <div class="main">
        <el-tree
          :data="data4"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
      <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button
          type="text"
          size="mini"
          @click="() => append(data)">
          Append
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="() => remove(node, data)">
          Delete
        </el-button>
      </span>
    </span>
        </el-tree>
      </div>
    </div>
    <div class="arrow-wrapper" :style="{height: computeCollapsedWrapperHeight}" @mousedown="drag">
      <div class="arrowIcon" :class="arrowClass" @click.stop="handleCollapse"></div>
    </div>
    <!--<div v-show="columnLine" class="column-line" :style="{height: computeCollapsedWrapperHeight}" ref="columnLine"></div>-->
  </div>
</template>

<script type="text/ecmascript-6">
let id = 1000;
export default {
  data () {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }];
    return {
      data4: JSON.parse(JSON.stringify(data)),
      collapsedWrapperHeight: 0,
      collapsedWrapperWidth: this.collapsedWrapper.width,
      collapsedWrapperLeft: 0,
      arrowClass: 'collapsed-arrow',
      collapsedWrapperWidthTemp: 0
    };
  },

  props: {
    collapsedWrapper: Object
  },

  created () {
    this.collapsedWrapperWidth = this.collapsedWrapper.width;
  },

  computed: {
    computeCollapsedWrapperHeight () {
      return document.body.offsetHeight - 73 + 'px';
    }
  },

  methods: {
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    // 拖拽函数
    drag (e) {
      if (e.target.className.indexOf('arrowIcon') >= 0) {
        return;
      }
      if (this.collapsedWrapper.draggable) {
        let that = this;
        document.onmousemove = function (e) {
          e.preventDefault();
          e.stopPropagation();
          let currentWidth = e.clientX - 51;
          let documentWidth = document.body.clientWidth;
          documentWidth = documentWidth - 100;
          if (currentWidth <= 30) {
            that.collapsedWrapperWidth = 30;
            that.$emit('getCollapsedWrapperWidth', {collapsedWrapperWidth: 30, left: 30});
            return;
          }
          if (currentWidth >= documentWidth) {
            that.collapsedWrapperWidth = documentWidth;
            that.$emit('getCollapsedWrapperWidth', {collapsedWrapperWidth: documentWidth, left: documentWidth});
            return;
          }
          // 把collapsedWrapperWidth提交到父组件
          that.$emit('getCollapsedWrapperWidth', {collapsedWrapperWidth: currentWidth, left: currentWidth});
          that.collapsedWrapperWidth = currentWidth;
        };

        document.onmouseup = function () {
          document.onmousemove = null;
        };
      } else {
        return false;
      }
    },

    // 点击侧导航栏的伸缩符可以伸缩侧导航栏
    handleCollapse () {
      if (this.collapsedWrapper.collapsable) {
        let collapsedWrapperLeft = this.collapsedWrapperLeft;
        if (collapsedWrapperLeft === 0) {
          this.collapsedWrapperLeft = -this.collapsedWrapperWidth;
          this.$emit('getCollapsedWrapperWidth', {collapsedWrapperWidth: 0, left: 0});
          this.arrowClass = 'open-arrow';
          this.collapsedWrapper.draggable = false;
        } else {
          this.collapsedWrapperLeft = 0;
          this.$emit('getCollapsedWrapperWidth', {collapsedWrapperWidth: this.collapsedWrapperWidth, left: this.collapsedWrapperWidth});
          this.arrowClass = 'collapsed-arrow';
          this.collapsedWrapper.draggable = true;
        }
      } else {

      }
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/fonts.css";
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.collapsed-wrapper {
  padding: 8px 4px 0 4px;
  position: relative;
  top: 0;
  bottom: 0;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  float: left;
  z-index: 1000000;

  .content-wrapper {
    height: 100%;
    overflow: hidden;
  }

  .top {
    height: 50px;

    ul {
      overflow: hidden;
      li {
        float: left;
      }
    }
  }

  .arrow-wrapper {
    width: 10px;
    position: absolute;
    top: 0;
    right: -10px;
    cursor: col-resize;

    .arrowIcon {
      width: 10px;
      height: 83px;
      position: absolute;
      right: 0px;
      top: 280px;
      cursor: pointer;
    }

    .collapsed-arrow {
      background: url('./img/arrow.png') no-repeat 0 0;
    }

    .open-arrow {
      background: url('./img/arrow.png') no-repeat -11px 0;
    }
  }
  // 竖线
  .column-line {
    width: 1px;
    background-color: black;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10000;
  }
}
</style>
