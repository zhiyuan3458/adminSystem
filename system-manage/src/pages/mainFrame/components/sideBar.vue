<template>
<div class="side-bar-wrapper" ref="sideBarWrapper">
  <ul>
    <li @mouseover="handleAsideBarShow" @mouseout="handleAsideBarHidden">
      <i class="el-icon-menu"></i>
      <div class="aside-content" v-show="asideBarShow" :style="{height: treeHeight + 'px'}">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="asideTreeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="asideTree"
          @node-click="handleClickTree">
        </el-tree>
      </div>
    </li>
    <li>
      <i class="el-icon-location-outline"></i>
    </li>
    <li>
      <i class="el-icon-setting"></i>
    </li>
    <li>
      <i class="el-icon-upload"></i>
    </li>
    <li>
      <i class="el-icon-document"></i>
    </li>
  </ul>
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sideBar.opened"></hamburger>
</div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex';
import hamburger from '@/components/hamburger/hamburger.vue';
export default {
  components: {
    hamburger
  },
  data () {
    return {
      asideBarShow: false,
      treeHeight: 0,
      filterText: '',
      asideTreeData: [
        {
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1',
            path: '/setting'
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
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    // 把鼠标移进去导航栏
    handleAsideBarShow () {
      this.asideBarShow = true;
    },
    // 鼠标移出去侧导航栏，树形组件消失
    handleAsideBarHidden () {
      this.asideBarShow = false;
    },
    // 树形结构查询
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    // 点击树形结构节点触发
    handleClickTree (data, node, component) {
      if (node.isLeaf) {
        this.$router.push(node.data.path);
      } else {

      }
    },
    // 点击横竖三条触发动画
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar');
    }
  },
  computed: {
    // sideBar的横竖三条属性和navBar展开与隐藏
    ...mapGetters([
      'sideBar'
    ])
  },
  watch: {
    filterText (val) {
      this.$refs.asideTree.filter(val);
    }
  },
  created () {
    this.$nextTick(() => {
      this.treeHeight = this.$refs.sideBarWrapper.offsetHeight - 1;
    });
  }
};
</script>

<style lang="less">
@import "../../../common/less/theme.less";
.side-bar-wrapper {
  width: 43px;
  background-color: #34495E;

  ul {
    width: 100%;
    font-size: 26px;
    margin-top: 10px;
    li {
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #AEB6BE;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;
      transition: all .8s;

      &:hover {
        color: white;
        background: #243342;
      }

      &.active {
        background: #243342;
      }
      .aside-content {
        width: 200px;
        height: 100%;
        position: absolute;
        z-index: 10000;
        top: -10px;
        left: 41px;
        background: #F1F1F1;
        box-shadow: 5px 10px 6px #ddd;

        .el-tree {
          background: #F1F1F1;
          .content;
        }
      }
    }
  }

  /*  横竖三条 */
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    position: absolute;
    bottom: 5px;
    padding: 0 10px;

    svg {
      fill: white;
    }
  }
}
</style>
