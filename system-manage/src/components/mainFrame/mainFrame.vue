<template>
  <div class="main-frame">
    <!-- 头部导航栏 -->
    <v-header></v-header>
    <!--<header class="header">-->
      <!--<el-row>-->
        <!--<div class="logo-wrapper">-->
          <!--<img class="logo" src="./img/logo.png" alt="">-->
          <!--<span class="main-title">系统管理平台</span>-->
        <!--</div>-->
          <!--<div class="top-nav-bar-wrapper">-->
            <!--<ul>-->
              <!--<li v-for="(item, index) in currentProjects" :key="index" :class="{active:index === nowIndex}" @click="handleClickTopNav(index)" @mouseenter="handleMouseEnterTopNav(index)" @mouseleave="handleMouseLeaveTopNav(index)">-->
                <!--{{item.name}}-->
                <!--<span :class="{'el-icon-close': index === iconMouseEnterLiIndex, 'el-icon-error':index === iconMouseEnterSpanIndex}" @mouseover="handleMouseEnterCloseBtn(index)" @mouseleave="handleMouseLeaveCloseBtn(index)" @click="handleClose(index)"></span>-->
              <!--</li>-->
              <!--<li>-->
                <!--<el-dropdown placement="bottom-start" @command="handleSelect" :show-timeout="500">-->
                  <!--<span class="el-dropdown-link">-->
                    <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right" style="color: white;"></i>-->
                  <!--</span>-->
                  <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item v-for="(item, index) in dropdownItems" :key="index" :command="item">{{item.name}}</el-dropdown-item>-->
                  <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<div class="top-icon-wrapper">-->
            <!--<el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(0)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 0}">-->
              <!--<span class="home iconStyle"></span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>我的消息</el-dropdown-item>-->
                <!--<el-dropdown-item>设置</el-dropdown-item>-->
                <!--<el-dropdown-item divided>退出登录</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->

            <!--<el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(1)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 1}">-->
              <!--<span class="bell iconStyle"></span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>我的消息1</el-dropdown-item>-->
                <!--<el-dropdown-item>设置1</el-dropdown-item>-->
                <!--<el-dropdown-item divided>退出登录1</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->

            <!--<el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(2)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 2}">-->
              <!--<span class="question iconStyle"></span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>我的消息1</el-dropdown-item>-->
                <!--<el-dropdown-item>设置1</el-dropdown-item>-->
                <!--<el-dropdown-item divided>退出登录1</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->

            <!--<el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(3)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 3}">-->
              <!--<span class="user iconStyle"></span>-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item>我的消息1</el-dropdown-item>-->
                <!--<el-dropdown-item>设置1</el-dropdown-item>-->
                <!--<el-dropdown-item divided><span @click="logout">退出登录1</span></el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          <!--</div>-->
      <!--</el-row>-->
    <!--</header>-->

    <!-- 侧导航栏 -->
    <div class="aside-bar">
      <ul>
        <li class="active">
          <i class="el-icon-menu"></i>
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
    </div>

    <!-- 主要内容 -->
    <div class="main-content">
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
        <router-view></router-view>
      </transition>
    </div>
    <!-- 尾部版权 -->
    <footer class="footer">
      版权所有：广东诚泰交通科技发展有限公司
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
import header from '@/components/mainFrame/components/header';
import lzyDropdown from '@/components/lzyDropdown/lzyDropdown.vue';
export default {
  components: {
    'v-header': header,
    lzyDropdown
  },
  data () {
    return {
      nowIndex: 0,
      dropdownItems: [
        {
          id: 1,
          name: '项目管理系统'
        },
        {
          id: 2,
          name: '电子招标系统'
        },
        {
          id: 3,
          name: '道路养护系统'
        },
        {
          id: 4,
          name: '桥梁检测系统'
        },
        {
          id: 5,
          name: '病害研究系统'
        },
        {
          id: 6,
          name: '彩虹桥检测系统'
        },
        {
          id: 7,
          name: '新平台'
        }
      ],
      currentProjects: []
    };
  },
  methods: {
    handleClickTopNav (index) {
      this.nowIndex = index;
    },
    handleMouseEnterTopNav (index) {
      this.iconMouseEnterLiIndex = index;
    },
    handleMouseLeaveTopNav () {
      this.iconMouseEnterLiIndex = -1;
    },
    handleMouseEnterCloseBtn (index) {
      this.iconMouseEnterLiIndex = -1;
      this.iconMouseEnterSpanIndex = index;
    },
    handleMouseLeaveCloseBtn (index) {
      this.iconMouseEnterSpanIndex = -1;
      this.iconMouseEnterLiIndex = index;
    },
    handleClose (index) {
      this.currentProjects.splice(index, 1);
    },
    handleSelect (command) {
      console.log(this.iconMouseEnterLiIndex);
      console.log(this.iconMouseEnterSpanIndex);
      if (this.currentProjects.indexOf(command) >= 0) {
        this.nowIndex = this.currentProjects.indexOf(command);
        return;
      }
      if (this.currentProjects.length >= 4) {
        this.nowIndex = 3;
        this.currentProjects.splice(3, 1, command);
      } else {
        this.nowIndex = 3;
        this.currentProjects.push(command);
      }
      // this.forthLi = command;
    },
    // 登出
    logout () {
      this.$router.push('/login');
    },
    // 移动进右上角的四个图标触发
    handleEnter (index) {
      this.itemHoverIndex = index;
    },
    // 移动出去右上角的四个图标触发
    handleLeave () {
      this.itemHoverIndex = 5;
    }
  },
  created () {
    this.currentProjects = this.dropdownItems.slice(0, 4);
  }
};
</script>
<style lang="less">
  @import "../../common/less/theme";
  @import "../../common/less/fonts.css";
  @import "../../common/less/border1px.less";

  .main-frame {
    width: 100%;
    height: 100%;
    position: relative;

    /* 侧导航栏 */
    .aside-bar {
      width: 40px;
      position: absolute;
      top: 47px;
      bottom: 26px;
      left: 0;
      margin: auto;
      background-color: #34495E;
      z-index: 1000;

      ul {
        width: 100%;
        font-size: 26px;
        margin-top: 10px;
        li {
          height: 48px;
          text-align: center;
          line-height: 48px;
          color: #AEB6BE;

          &.active {
            background: #243342;
          }
        }
      }
    }

    /* 主要内容 */
    .main-content {
      max-width:100%;
      bottom: 26px;
      margin: 3px 0 0 40px;
    }

    /* 尾部 */
    .footer {
      width: 100%;
      height: 26px;
      line-height: 26px;
      padding-left: 10px;
      position: fixed;
      color: #333;
      bottom: 0;
      font-size: 12px;
      background-color: #e1edf9;
      z-index: 100000;
    }
  }

  .el-dropdown-menu {
    max-height: 250px;
    overflow-y: auto;
  }
</style>
