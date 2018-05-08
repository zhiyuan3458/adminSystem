<template>
<div class="main-frame">
  <!-- 头部 -->
  <v-header class="header"></v-header>
  <div class="body-wrapper">
    <!-- 侧导航栏 -->
    <side-bar class="side-bar" :style="{height: sideBarHeight + 'px'}"></side-bar>
    <!-- 右侧主内容和项目导航栏 -->
    <div class="main">
      <div class="main-container-wrapper" :style="{height: mainContentHeight + 'px'}" ref="mainContainerWrapper">
        <router-view></router-view>
      </div>
      <!-- 项目导航栏 -->
      <nav-bar class="navBar" :style="{bottom: sideBar.bottomValue + 'px'}"></nav-bar>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import header from '@/pages/mainFrame/components/header.vue';
import navBar from '@/pages/mainFrame/components/navBar.vue';
import sideBar from '@/pages/mainFrame/components/sideBar.vue';
const headerHeight = 47;
const navBarHeight = 46;

export default {
  components: {
    'v-header': header,
    sideBar,
    navBar
  },
  computed: {
    sideBarHeight () {
      return document.body.offsetHeight - headerHeight;
    },
    mainContentHeight () {
      if (this.sideBar.opened) {
        return document.body.offsetHeight - headerHeight - navBarHeight;
      } else {
        return document.body.offsetHeight - headerHeight;
      }
    },
    ...mapGetters([
      'sideBar'
    ])
  }
};
</script>

<style lang="less">
.main-frame {
  max-width: 100%;

  & > .header {
    height: 47px;
  }

  .body-wrapper {
    overflow: hidden;
    .side-bar {
      float: left;
      z-index: 1000;
    }

    .main {
      overflow: hidden;
      .main-container-wrapper {
        height: 100%;
        overflow: auto;
      }
      .navBar {
        width: 100%;
        height: 46px;
        line-height: 46px;
        position: relative;
        bottom: 0;
        z-index: 1;
      }
    }
  }
}
</style>
