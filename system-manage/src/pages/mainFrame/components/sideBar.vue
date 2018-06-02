<template>
<div class="side-bar-wrapper" ref="sideBarWrapper">
  <ul @mouseleave="handleImgHightlightHidden" class="aside-bar-ul">
    <li class="aside-bar-li" v-for="(item, index) in menus.asideBarMenus" :key="index" @mouseenter="handleImgHightlightShow(index)" :class="{active: activeIndex === index}">
      <img :src="activeIndex === index ? item.imgHoverUrl : item.imgUrl" alt="" width="26"  height="26">
    </li>
    <div class="aside-content" :style="{height: treeHeight + 'px'}" v-show="asideBarShow">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <ul id="treeNavBar" class="ztree"></ul>
    </div>
  </ul>
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sideBar.opened"></hamburger>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getHttp } from '@/api/util';
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
      treeArray: [],
      // 是否让树形结构显示
      asideBarShow: false,
      filterText: '',
      // 树形高度
      treeHeight: 0,
      // 树形数据
      asideTreeData: [],
      setting: {
        callback: {
          onClick: this.handleClickNode
        }
      }
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
      $.fn.zTree.init($('#treeNavBar'), this.setting, this.asideTreeData);
    },
    // 鼠标移出去侧导航栏，树形组件消失
    handleImgHightlightHidden () {
      this.activeIndex = -1;
      this.asideBarShow = false;
    },

    // 点击树形结构节点触发
    handleClickNode (event, treeId, treeNode) {
      if (treeNode.path !== '') {
        this.$router.push(treeNode.path);
      }
      // this.$router.push(tree);
    },

    // 点击横竖三条触发动画
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar');
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
@import "../../../../plugins/ztree/css/zTreeStyle.css";
.side-bar-wrapper {
  width: 43px;
  background-color: #34495E;

  .aside-bar-ul {
    width: 100%;
    font-size: 26px;
    margin-top: 10px;
    position: relative;
    .aside-bar-li {
      height: 48px;
      text-align: center;
      line-height: 48px;
      color: #AEB6BE;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;

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
        border-left: 2px solid orange;
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

      #treeNavBar {
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
