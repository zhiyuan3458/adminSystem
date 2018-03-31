<template>
  <div class="main-frame">
    <!-- 头部导航栏 -->
    <header class="header">
      <el-row>
        <el-col :span="6">
          <img class="logo" src="./img/logo.png" alt="">
          <span class="main-title">系统管理平台</span>
        </el-col>
        <el-col :span="10">
          <div class="top-nav-bar-wrapper">
            <ul>
              <li class="active">电子招标系统</li>
              <li>道路养护系统</li>
              <li>桥梁检测系统</li>
              <li>项目管理系统</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4" :offset="4">
          <div class="top-icon-wrapper">
            <el-dropdown class="icon" trigger="hover" placement="top-end">
              <span class="icon-home iconStyle"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="icon" trigger="hover" placement="top-end">
              <span class="icon-bell iconStyle"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息1</el-dropdown-item>
                <el-dropdown-item>设置1</el-dropdown-item>
                <el-dropdown-item divided>退出登录1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="icon" trigger="hover" placement="top-end">
              <span class="icon-question iconStyle"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息1</el-dropdown-item>
                <el-dropdown-item>设置1</el-dropdown-item>
                <el-dropdown-item divided>退出登录1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown class="icon" trigger="hover" placement="top-end">
              <span class="icon-user iconStyle"></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息1</el-dropdown-item>
                <el-dropdown-item>设置1</el-dropdown-item>
                <el-dropdown-item divided>退出登录1</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </header>

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
export default {
  data () {
    return {};
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
    /* 头部 */
    .header {
      height: @top-side-bar-height;
      background: @top-side-bar-bg-color;

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

      .top-nav-bar-wrapper {
        margin-top: 11px;
        ul {
          overflow: hidden;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          li {
            width: 100px;
            padding: 10px;
            float: left;
            cursor: pointer;

            &.active {
              color: @top-navbar-color;
              .border-1px(@top-navbar-color);
            }
          }
        }
      }

      .top-icon-wrapper {
        float: right;
        overflow: hidden;
        margin-top: 9px;
        .icon {
          margin: 5px 10px 0 0;
          cursor: pointer;
          float: left;

          .iconStyle {
            font-size: 22px;
            color: white;
          }
        }
      }
    }

    /* 侧导航栏 */
    .aside-bar {
      width: 40px;
      position: absolute;
      top: 47px;
      bottom: 26px;
      left: 0;
      margin: auto;
      background-color: @side-bar-bg-color;
      z-index: 1000;

      ul {
        width: 100%;
        font-size: 26px;
        margin-top: 10px;
        li {
          height: 48px;
          text-align: center;
          line-height: 48px;
          color: @side-bar-icon-color;

          &.active {
            background: @side-bar-active-bg-color;
          }
        }
      }
    }

    /* 主要内容 */
    .main-content {
      width:100%;
      position: absolute;
      top: 47px;
      bottom: 26px;
      left: 40px;
    }

    /* 尾部 */
    .footer {
      width: 100%;
      height: @footer-height;
      line-height: @footer-height;
      padding-left: 10px;
      position: fixed;
      color: #333;
      bottom: 0;
      font-size: 12px;
      background-color: @footer-bg-color;
    }
  }
</style>
