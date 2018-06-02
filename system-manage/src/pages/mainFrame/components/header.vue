<template>
  <div>
    <!-- 头部导航栏 -->
    <header class="header">
      <el-row>
        <div class="logo-wrapper">
          <img class="logo" src="../img/logo.png" alt="">
          <span class="main-title">系统管理平台</span>
        </div>
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
        <div class="top-icon-wrapper">
          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(0)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 0}">
            <span class="home iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(1)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 1}">
            <span class="bell iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息1</el-dropdown-item>
              <el-dropdown-item>设置1</el-dropdown-item>
              <el-dropdown-item divided>退出登录1</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(2)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 2}">
            <span class="question iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息1</el-dropdown-item>
              <el-dropdown-item>设置1</el-dropdown-item>
              <el-dropdown-item divided>退出登录1</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="icon" trigger="hover" placement="top-end" @mouseenter.native="handleEnter(3)" @mouseleave.native="handleLeave" :class="{active:itemHoverIndex === 3}">
            <span class="user iconStyle"></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息1</el-dropdown-item>
              <el-dropdown-item>设置1</el-dropdown-item>
              <el-dropdown-item divided><span @click="logout">退出登录1</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="select-wrapper">
          <el-input
            size="mini"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="globalSearch">
          </el-input>
        </div>
      </el-row>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      itemHoverIndex: -1,
      iconMouseEnterLiIndex: -1,
      iconMouseEnterSpanIndex: -1,
      options: [{
        value: '/table',
        label: '项目管理系统'
      }, {
        value: '/charts',
        label: '道路病害系统'
      }],
      globalSearch: '' // 选择框的v-model值
    };
  },

  methods: {
    // 点击select框中的项目名触发
    handleSelectProject (projectName) {
      this.projectName = '';
      this.$router.push(projectName);
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
  }
};
</script>

<style lang="less">
@import "../../../common/less/theme";
@import "../../../common/less/fonts.css";
@import "../../../common/less/border1px.less";
  /* 头部 */
  .header {
    background: #56A2E8;

    .logo-wrapper {
      float: left;
      margin-right: 17px;
      .logo {
        margin: 8px 0 0 5px;
      }

      .main-title {
        display: inline-block;
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 5px;
        vertical-align: super;
        font-weight: 600;
      }
    }

    .select-wrapper {
      line-height: 45px;
      float: right;

      .el-input__inner {
        width: 100%;
        height: 28px;
        line-height: 28px;
        -webkit-appearance: none;
        background-color: #56A2E8;
        border-radius: 15px;
        border: 1px solid white;
        box-sizing: border-box;
        color: white!important;
      }
    }

    .top-icon-wrapper {
      float: right;
      overflow: hidden;

      .home {
        display: inline-block;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -110px -6px no-repeat;
        margin: 0 auto;
      }

      .bell {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -284px -7px no-repeat;
      }

      .question {
        display: inline-block;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -205px -6px no-repeat;
      }

      .user {
        display: inline-block;
        width: 40px;
        height: 35px;
        background: url('../img/head_icon.png') -246px -6px no-repeat;
      }

      .icon {
        height: 47px;
        box-sizing: border-box;
        padding: 3px 10px;
        cursor: pointer;
        float: left;

        &.active {
          background: #3C4B5E;
        }

        .iconStyle {
          font-size: 20px;
          color: white;
        }
      }
    }
  }
</style>
