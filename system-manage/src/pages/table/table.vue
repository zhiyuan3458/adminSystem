<template>
  <div class="main-table-content-wrapper" ref="tableWrapper">
    <collapse-bar :collapsedWrapper="collapsedWrapper" @getLzyTableWrapperMarginLeft="getLzyTableWrapperMarginLeft" :expand-show="expandShow">
        <div class="group" slot="topContent" v-for="(item, index) in collapsedWrapper.iconContent" :key="index">
          <a
            :class="item.iconClass"
            @click="clickTopBtn"
          ></a>
          <img src="./img/resultset_down.png" v-if="!item.iconClass.indexOf('icon-expand-tree')" alt="">
        </div>
    </collapse-bar>
    <lzy-table-wrapper :lzyTableWrapper="lzyTableWrapper"></lzy-table-wrapper>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    let collapsedWrapperWidth = 260;
    return {
      // 侧边可收缩导航栏的设置
      expandShow: false, // 默认树组件不展开
      collapsedWrapper: {
        width: collapsedWrapperWidth, // 设置初始宽度
        draggable: true, // 是否可拖拽
        collapsable: true, // 是否可伸缩
        topShow: true, // 是否显示上部按钮
        iconContent: [
          {
            iconClass: 'icon-return icon',
            text: ''
          },
          {
            iconClass: 'icon-expand-tree icon',
            text: ''
          },
          {
            iconClass: 'icon-collapse-tree icon',
            text: ''
          }
        ],
        data: [] // 需要显示的内容
      },
      // 右边table的wrapper展示包括table以及table的一系列操作
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
    // 通过CollapseBar子组件的getLzyTableWrapperMarginLeft事件传递子组件一个参数给父组件，从而求出tableWrapper的marginLeft
    // 这是vue的子组件传递给父组件一种方法
    getLzyTableWrapperMarginLeft (...data) {
      this.lzyTableWrapper.marginLeft = data[0].left;
    },

    // 点击侧导航栏的上部图标触发
    clickTopBtn (e) {
      let iconClass = e.target.className;
      if (iconClass.indexOf('el-icon-back') >= 0) {
        return false;
      } else if (iconClass.indexOf('icon-folder-open') >= 0) {
        this.expandShow = true;
        // console.log(this.expandShow);
      } else {
        this.expandShow = false;
        // console.log(this.expandShow);
      }
    }
  },

  mounted () {
    this.lzyTableWrapper.marginLeft = this.collapsedWrapper.width;
  }
};
</script>

<style lang="less">
  @import "../../common/less/fonts.css";
  @import "../../common/less/theme";
  .main-table-content-wrapper {
    height: 100%;
    position: relative;
    overflow: hidden;

    .group {
      float: left;
      margin-left: 0;
      padding-right: 12px;
      padding-left: 12px;
      position: relative;
      border-right: 1px solid #ddd;
      .icon {
        height: 23px;
        line-height: 23px;
        color: #000;
        cursor: pointer;
        padding-left: 20px;
        text-decoration: none;
        height: 23px;
        line-height: 23px;
        float: left;
      }

      .icon-return {
        background: url('./img/go-back.png') no-repeat;
      }

      .icon-expand-tree {
        background: url('./img/expandTree.png') no-repeat;

        &:after {
          content: '';
        }
      }

      .icon-collapse-tree {
        background: url('./img/collapseTree.png') no-repeat;
      }
    }
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
