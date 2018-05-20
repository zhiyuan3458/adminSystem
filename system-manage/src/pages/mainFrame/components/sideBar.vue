<template>
<div class="side-bar-wrapper" ref="sideBarWrapper">
  <ul @mouseleave="handleImgHightlightHidden">
    <li v-for="(item, index) in menus.asideBarMenus" :key="index" @mouseenter="handleImgHightlightShow(index)">
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
            <span v-if="node.children">{{ node.label }}</span>
            <router-link v-else tag="span" :to="data.path">{{node.label}}</router-link>
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
import { deepClone } from '@/common/js/util';
export default {
  components: {
    hamburger
  },
  data () {
    return {
      // 侧导航栏的信息
      asideItems: [],
      treeArray: [],
      activeIndex: -1,
      // 是否让树形结构显示
      asideBarShow: false,
      // 树形高度
      treeHeight: 0,
      filterText: '',
      // 树形数据
      asideTreeData: [],
      defaultProps: {
        label: 'name'
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
      if (this.menus.treeMenus[index]) {
        this.asideTreeData = this.menus.treeMenus[index];
      } else {
        this.asideTreeData = [];
      }
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
      'currentRoute',
      'menus'
    ])
  },
  watch: {
    filterText (val) {
      this.$refs.asideTree.filter(val);
    }
//    currentRoute () {
//      console.log(4213);
//      let { id } = this.currentRoute[0];
//      this.asideItems = [];
//      this.treeArray = [];
//      getHttp('/api/front/carte/listcarte', { subsystemId: id }).then(res => {
//        if (res.data.code === this.ERR_OK) {
//          let data = res.data.data;
//          data.forEach(item => {
//            let obj = Object.assign({}, {
//              imgUrl: require(`@/pages/${item.iconUrl}-white.png`),
//              imgHoverUrl: require(`@/pages/${item.iconUrl}.png`)
//            });
//            this.asideItems.push(obj);
//            // 如果二级菜单栏有children，则递归
//            if (item.children) {
//              this.treeArray.push(item.children);
//              this.getLeave(item);
//            }
//          });
//          // 添加到vuex的addRouters
////          console.log(this.addRouters.find(item => item.id === id));
//          // addMenus把子路由信息添加进currentRoute中
////          this.$store.dispatch('addMenus', this.leaves);
////          this.$router.addRoutes(this.currentRoute);
//        }
//      });
//    }
  },
  created () {
    if (this.currentRoute.length !== 0) {
      // 获得第一个子系统的id
      let { id } = this.currentRoute[0];
      // 异步获取子系统的菜单信息
      getHttp('/api/front/carte/listcarte', { subsystemId: id }).then(res => {
        if (res.data.code === this.ERR_OK) {
          let data = res.data.data;
          data.forEach(item => {
            let obj = Object.assign({}, {
              imgUrl: require(`@/pages/${item.iconUrl}-white.png`),
              imgHoverUrl: require(`@/pages/${item.iconUrl}.png`)
            });
            this.asideItems.push(obj);
            // 如果二级菜单栏有children，则递归
            if (item.children) {
              this.treeArray.push(item.children);
              this.getLeave(item);
            }
          });
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

<style lang="less">
  /* 树形结构的节点 */
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
