<template>
<div class="side-bar-wrapper" ref="sideBarWrapper">
  <ul @mouseout="handleImgHightlightHidden">
    <li v-for="(item, index) in asideItems" :key="index" @mouseover="handleImgHightlightShow(index)">
      <img :src="activeIndex === index ? item.imgHoverUrl : item.imgUrl" alt="" width="26"  height="26">
    </li>
    <div class="aside-content" :style="{height: treeHeight + 'px'}" v-show="asideBarShow">
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
          <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
      </span>
      </el-tree>
    </div>
  </ul>
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sideBar.opened"></hamburger>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getHttp } from '@/api/api';
import hamburger from '@/components/hamburger/hamburger.vue';
const _import = require('@/router/_import_' + process.env.NODE_ENV);

export default {
  components: {
    hamburger
  },
  data () {
    return {
      // 侧导航栏的信息
      asideItems: [],
      activeIndex: -1,
      // 是否让树形结构显示
      asideBarShow: false,
      // 树形高度
      treeHeight: 0,
      filterText: '',
      // 树形数据
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
      },
      // 用来记住递归获取到的叶子节点
      leaves: []
    };
  },
  methods: {
    // 把鼠标移进去导航栏
    handleImgHightlightShow (index) {
      this.activeIndex = index;
      this.asideBarShow = true;
    },
    // 鼠标移出去侧导航栏，树形组件消失
    handleImgHightlightHidden () {
      this.activeIndex = -1;
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
    },
    // 递归获取叶子节点
    getLeave (data) {
      if (data.constructor === Object) {
        if (data.children) {
          data.children.forEach(item => {
            return this.getLeave(item);
          });
        } else {
          let obj = Object.assign({}, {
            name: data.name,
            path: data.path,
            component: _import(data.componentName)
          });
          this.leaves.push(obj);
        }
      }
    }
  },
  computed: {
    // sideBar的横竖三条属性和navBar展开与隐藏
    ...mapGetters([
      'sideBar',
      'projectList',
      'addRouters'
    ])
  },
  watch: {
    filterText (val) {
      this.$refs.asideTree.filter(val);
    }
  },
  created () {
    if (this.projectList.length !== 0) {
      let id = this.projectList[0].id;
      getHttp('/api/project/menu', { id: id }).then(res => {
        if (res.data.code === this.ERR_OK) {
          let data = res.data.data;
          data.forEach(item => {
            let obj = Object.assign({}, {
              imgUrl: require(`@/common/img/roadMaintainceSystem/${item.imgUrl}-white.png`),
              imgHoverUrl: require(`@/common/img/roadMaintainceSystem/${item.imgUrl}.png`)
            });
            this.asideItems.push(obj);
            this.getLeave(item);
          });
          // this.addRouters.find(item => item.id === this.projectList[0].id).children = this.addRouters.find(item => item.id === this.projectList[0].id).children.concat(this.leaves);
        }
      });
    }
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
    position: relative;
    li {
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #AEB6BE;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;

      .hide-img {
        position: absolute;
        right: 8px;
        bottom: 14px;
      }

      &:hover {
        background: #243342;
        border-left: 2px solid orange;
      }

      &.active {
        background: #243342;
      }
    }
    .aside-content {
      width: 200px;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: -11px;
      left: 43px;
      background: #F1F1F1;
      box-shadow: 5px 10px 6px #ddd;

      .el-tree {
        background: #F1F1F1;
        .content;
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
