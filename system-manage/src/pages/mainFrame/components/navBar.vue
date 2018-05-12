<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link
        ref="tag"
        :to="tag.path"
        class='tags-view-item'
        :class="isActive(tag)? 'active': ''"
        v-for="tag in Array.from(visitedViews)"
        :key="tag.path"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{tag.name}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <!-- 横竖三点 -->
    <div class="select-project">
      <div class="three-point">
        <div class="project-model">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(swiper, index) in swiperViews" :key="index">
              <ul class="project-lists">
                <router-link
                  tag="li"
                  v-for="item in swiper"
                  :key="item.path"
                  :to="item.path"
                  @click.native="addToNavBar"
                >
                  <img src="../img/project.png" alt="">
                  <p class="project-name">{{item.name}}</p>
                </router-link>
              </ul>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
    <ul class="context-menu" v-show="visible" :style="{top: top + 'px', left: left + 'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import scrollPane from '@/components/scrollPane/scrollPane.vue';
export default {
  components: {
    scrollPane,
    swiper,
    swiperSlide
  },
  data () {
    return {
      visible: false,
      navBarVisible: true,
      contextMenuVisible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    };
  },

  computed: {
    /* 显示在底部导航栏的子系统 */
    visitedViews () {
      return this.$store.state.tagsView.visitedViews;
    },
    /* 显示在swiper的列表 */
    swiperViews () {
      let projectList = [];
      const swiperItemSizes = 8;
      let swiperNum = this.projectList.length % swiperItemSizes === 0 ? Math.floor(this.projectList.length / swiperItemSizes) : Math.floor(this.projectList.length / swiperItemSizes) + 1;
      for (let i = 0; i < swiperNum; i++) {
        let arr = [];
        if (this.projectList.length < swiperItemSizes) {
          projectList.push(this.projectList);
        } else {
          for (let j = i * swiperItemSizes; j < swiperItemSizes; j++) {
            arr.push(this.projectList[j]);
          }
          projectList.push(arr);
        }
      }
      return projectList;
    },
    swiper () {
      return this.$refs.mySwiper.swiper;
    },
    ...mapGetters([
      'sideBar',
      'visitedViews',
      'projectList'
    ])
  },

  watch: {
    // 就是$route: function()简写
//    $route () {
//      this.addViewTags();
//      this.moveToCurrentTag();
//    },
    /*
      value是visible现在的值
      true表示要右键选项卡出来了，要监听右键menu的事件
      false表示要右键选项卡隐藏，取消要监听右键menu的事件
    */
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    }
  },

  methods: {
    addToNavBar () {
      this.addViewTags();
    },
    // 判断该路由是否有路由名字
    generateRoute () {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    // 新增一个到导航栏并且给它一个active的class
    addViewTags () {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch('addVisitedViews', route);
    },
    // 判断传值进来的路由是否为当前路由
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name;
    },
    // 由于上面新增了一个route，所以要移除原有的导航栏的样式以及信息
    moveToCurrentTag () {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            // 子组件引用父组件方法的一种，还可以用emit触发事件
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    // 右键打开项目的选项卡
    openMenu (tag, e) {
      this.contextMenuVisible = true;
      this.selectedTag = tag;
      this.left = e.clientX;
      this.top = e.clientY;
    },
    // 关闭选中的选项卡
    closeSelectedTag (view) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        const lastView = views.slice(-1)[0];
        if (lastView) {
          this.$router.push(lastView.path);
        } else {
          this.$router.push('/');
        }
      });
    },
    // 关闭选中之外的选项卡
    closeOthersTags () {
      this.$router.push(this.selectedTag.path);
      this.$store.dispatch('delOthersViews', this.selectedTag).then(views => {
        this.moveToCurrentTag();
      });
    },
    // 关闭所有选项卡
    closeAllTags () {
      this.$store.dispatch('delAllViews');
      this.$router.push('/');
    }
  },
  mounted () {
    // this.addViewTags();
  }
};
</script>

<style lang="less" scoped>
@import "../less/mainFrame.less";
.tags-view-container {
  position: relative;
  .tags-view-wrapper {
    background: #fff;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .12);
    .tags-view-item {
      text-decoration: none!important;
      display: inline-block;
      position: relative;
      height: 36px;
      line-height: 36px;
      border: 1px solid #d8dce5;
      color: white;
      background: #34495E;
      padding: 0 8px;
      margin-left: 5px;
      margin-top: 1px;
      border-radius: 3px;
      .nav-bar-item;
      &:last-of-type {
        margin-right: 28px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  /*  横竖三点 */
  .select-project {
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    &:before {
      content: '';
      height: 80%;
      position: absolute;
      top: 5px;
      left: -2px;
      border-left: 1px solid #ddd;
    }

    &:hover {
      background: #282828;
      border: 1px solid orange;
      border-top: 0;
    }

    .three-point {
      width: 25px;
      height: 5px;
      margin-top: 10px;
      background: url('../img/blackPoint.png') no-repeat;

      .project-model {
        width: 600px;
        height: 300px;
        display: none;
        position: absolute;
        top: -299px;
        right: -1px;
        padding: 15px;
        box-sizing: border-box;
        background: white;
        border: 1px solid orange;
        cursor: default;
      }
    }

    &:hover .project-model {
        display: block;
    }

    &:hover .three-point {
      background: url('../img/whitePoint.png') no-repeat;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="less">
  //reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 0;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
  ul.project-lists {
    overflow: hidden;
    li {
      width: 120px;
      text-align: center;
      float: left;
      cursor: pointer;

      .project-name {
        margin: -10px 0 0 5px;
      }
    }
  }
</style>
