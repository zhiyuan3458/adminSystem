<template>
  <div>
    <!-- 头部导航栏 -->
    <header class="header">
      <el-row>
        <div class="logo-wrapper">
          <img class="logo" src="../img/logo.png" alt="">
          <span class="main-title">系统管理平台</span>
        </div>
        <div class="top-nav-bar-wrapper">
        <ul>
        <li v-for="(item, index) in currentProjects" :key="index" :class="{active:index === nowIndex}" @click="handleClickTopNav(index)" @mouseenter="handleMouseEnterTopNav(index)" @mouseleave="handleMouseLeaveTopNav(index)">
        {{item.name}}
          <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
        </li>
        <li>
        <el-dropdown placement="bottom-start" @command="handleSelect" :show-timeout="500">
        <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in dropdownItems" :key="index" :command="item">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </li>
        </ul>
        </div>
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
          <el-select v-model="projectName" filterable placeholder="请选择项目名" @change="handleSelectProject">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-row>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      currentProjects: [
        {
          name: '项目管理系统'
        },
        {
          name: '新平台系统'
        },
        {
          name: '道路养护系统'
        },
        {
          name: '道路病害系统'
        }
      ],
      dropdownItems: [
        {
          name: '我的系统'
        },
        {
          name: '代码管理系统'
        },
        {
          name: '桥梁检测系统'
        }
      ],
      nowIndex: 0,
      itemHoverIndex: -1,
      iconMouseEnterLiIndex: -1,
      iconMouseEnterSpanIndex: -1,
      options: [{
        value: '/table',
        label: '道路养护系统'
      }, {
        value: '/charts',
        label: '项目管理系统'
      }],
      projectName: '' // 选择框的v-model值
    };
  },

  methods: {
    // 点击select框中的项目名触发
    handleSelectProject (projectName) {
      this.projectName = '';
      this.$router.push(projectName);
    },
    handleMouseEnterTopNav () {},
    handleMouseLeaveTopNav () {},
    handleSelect () {},
    handleClickTopNav (index) {
      this.nowIndex = index;
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

  .top-nav-bar-wrapper {
    position: relative;
    float: left;
    ul {
      position: relative;
      top: 10px;
      color: white;
      overflow: hidden;
      list-style: none;

      li {
        width: 135px;
        font-family: @title-font-family;
        font-weight: 700;
        cursor: pointer;
        padding: 10px 6px;
        box-sizing: border-box;
        float: left;

        &:last-of-type {
          width: inherit;
        }

        .el-icon-close {
          display: none;
        }

        &:hover .el-icon-close {
          display: block;
        }

        &.active {
          color: #333;
          border: 1px solid white;
          border-radius: 3px;
          background: white;
        }
      }
    }
  }

  .select-wrapper {
    line-height: 45px;
    float: right;

    .el-input__suffix {
      top: 1px;
    }

    .el-input__inner {
      height: 33px;
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

<style lang="less">
  //reset element css of el-icon-close
  .top-nav-bar-wrapper {
      .el-icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        float: right;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: 0px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
  }
</style>
