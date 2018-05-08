<template>
  <div class="collapsed-wrapper" ref="collapsedWrapper" :style="{width: collapsedWrapperWidth + 'px', marginLeft: collapsedWrapperMarginLeft + 'px'}">
    <slot name="header"></slot>
    <slot name="content"></slot>
    <div class="arrow-wrapper" @mousedown="drag">
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
        iconGroupShow: false,
        children: [{
          id: 9,
          label: '三级 1-1-1',
          iconGroupShow: false
        }, {
          id: 10,
          label: '三级 1-1-2',
          iconGroupShow: false
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      iconGroupShow: false,
      children: [{
        id: 5,
        label: '二级 2-1',
        iconGroupShow: false
      }, {
        id: 6,
        label: '二级 2-2',
        iconGroupShow: false
      }]
    }, {
      id: 3,
      label: '一级 3',
      iconGroupShow: false,
      children: [{
        id: 7,
        label: '二级 3-1',
        iconGroupShow: false
      }, {
        id: 8,
        label: '二级 3-2',
        iconGroupShow: false
      }]
    }];
    return {
      data4: JSON.parse(JSON.stringify(data)),
      collapsedWrapperHeight: 0,
      collapsedWrapperWidth: this.collapsedWrapper.width,
      collapsedWrapperMarginLeft: 0,
      arrowClass: 'collapsed-arrow',
      collapsedWrapperWidthTemp: 0,
      expandShow1: this.expandShow
    };
  },

  props: {
    collapsedWrapper: Object,
    expandShow: Boolean
  },

  watch: {
    expandShow: function () {
      this.expandShow1 = this.expandShow;
    }
  },

  created () {
    this.collapsedWrapperWidth = this.collapsedWrapper.width;
  },

  methods: {
    // 新增树组件的指定结点
    append (data) {
      const newChild = { id: id++, label: 'testtest', iconGroupShow: false, children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    // 移除树组件的指定结点
    remove (node, data) {
      console.log(node);
      console.log(data);
      return;
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    // 递归，使得data数组的所有iconGroupShow变为false
    setIconGroupShow (children) {
      if (Array.isArray(children)) {
        children.forEach(item => {
          item.iconGroupShow = false;
          if (item.children) {
            this.setIconGroupShow(item.children);
          } else {}
        });
      } else {
        return false;
      }
    },

    // 点击树组件的某个结点把添加、编辑和删除按钮显示出来
    handleClickText (node, data) {
      this.setIconGroupShow(this.data4);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(item => item.id === data.id);
      let obj = Object.assign({}, children[index], {iconGroupShow: true});
      children.splice(index, 1, obj);
    },
    // 拖拽可伸缩侧导航栏函数
    drag (e) {
      // 如果是按了箭头收缩的话，就不给拉动
      if (e.target.className.indexOf('arrowIcon') >= 0) {
        return;
      }
      // 看传入的draggable值是否为true才给拉伸
      if (this.collapsedWrapper.draggable) {
        let that = this;
        document.onmousemove = function (e) {
          e.preventDefault();
          e.stopPropagation();
          let currentMarginWidth = e.clientX - 51;
          let documentWidth = document.body.clientWidth;
          console.log(documentWidth);
          documentWidth = documentWidth - 500;
          if (currentMarginWidth <= 30) {
            that.collapsedWrapperWidth = 30;
            that.$emit('getLzyTableWrapperMarginLeft', {left: 30});
            return;
          }
          if (currentMarginWidth >= documentWidth) {
            that.collapsedWrapperWidth = documentWidth;
            that.$emit('getLzyTableWrapperMarginLeft', {left: documentWidth});
            return;
          }
          // 把collapsedWrapperWidth提交到父组件
          that.$emit('getLzyTableWrapperMarginLeft', {left: currentMarginWidth});
          that.collapsedWrapperWidth = currentMarginWidth;
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
        let collapsedWrapperMarginLeft = this.collapsedWrapperMarginLeft;
        if (collapsedWrapperMarginLeft === 0) {
          this.collapsedWrapperMarginLeft = -this.collapsedWrapperWidth;
          this.$emit('getLzyTableWrapperMarginLeft', {left: 0});
          this.arrowClass = 'open-arrow';
          this.collapsedWrapper.draggable = false;
        } else {
          this.collapsedWrapperMarginLeft = 0;
          this.$emit('getLzyTableWrapperMarginLeft', {left: this.collapsedWrapperWidth});
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
@import "./less/style.css";
.collapsed-wrapper {
  height: 100%;
  padding: 8px 4px 0 4px;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  float: left;

  .arrow-wrapper {
    width: 10px;
    height: 100%;
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
}
</style>
