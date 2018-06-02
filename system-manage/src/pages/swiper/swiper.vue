<template>
  <div class="tags-view-container">
    <!-- 横竖三点 -->
    <div class="select-project">
      <div class="three-point"></div>
        <div class="project-model">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>1</swiper-slide>
            <swiper-slide>2</swiper-slide>
            <swiper-slide>3</swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
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
      // visible: false,
      // navBarVisible: true,
      // contextMenuVisible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      swiperOption: {
        autoplay: true,
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
    opened () {
      return this.sideBar.opened;
    },
    ...mapGetters([
      'sideBar',
      'visitedViews',
      'projectList',
      'currentRoute'
    ])
  },

  watch: {
    // 就是$route: function()简写
    $route (to, from) {
    },
    opened () {
//      $('.tags-view-container').animate({
//        bottom: this.sideBar.bottomValue
//      }, 1000);
    }
    /*
      value是visible现在的值
      true表示要右键选项卡出来了，要监听右键menu的事件
      false表示要右键选项卡隐藏，取消要监听右键menu的事件
    */
//    visible (value) {
//      if (value) {
//        document.body.addEventListener('click', this.closeMenu);
//      } else {
//        document.body.removeEventListener('click', this.closeMenu);
//      }
//    }
  },

  methods: {
    addToNavBar (subSystemName) {
      // 清空currentRoutes
      this.$store.dispatch('removeCurrentRoutes');
      const currentRoute = this.projectList.find(item => subSystemName === item.name);
      // 设置新的子系统的路由首页信息
      this.$store.dispatch('setCurrrentRoute', currentRoute);
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
      return route.id === this.$route.meta.subSystemId;
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
//    openMenu (tag, e) {
//      this.contextMenuVisible = true;
//      this.selectedTag = tag;
//      this.left = e.clientX;
//      this.top = e.clientY;
//    },
    // 关闭选中的选项卡
//    closeSelectedTag (view) {
//      this.$store.dispatch('delVisitedViews', view).then(views => {
//        const lastView = views.slice(-1)[0];
//        if (lastView) {
//          this.$router.push(lastView.path);
//        } else {
//          this.$router.push('/');
//        }
//      });
//    },
    // 关闭选中之外的选项卡
//    closeOthersTags () {
//      this.$router.push(this.selectedTag.path);
//      this.$store.dispatch('delOthersViews', this.selectedTag).then(views => {
//        this.moveToCurrentTag();
//      });
//    },
    // 关闭所有选项卡
//    closeAllTags () {
//      this.$store.dispatch('delAllViews');
//      this.$router.push('/');
//    }
  },
  mounted () {
    // this.addViewTags();
  }
};
</script>

<style lang="less" scoped>
  @import "../../pages/mainFrame/less/mainFrame.less";
.tags-view-container {
  position: relative;
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
      background: url('../../pages/mainFrame/img/blackPoint.png') no-repeat;

      .project-model {
        width: 600px;
        height: 300px;
        display: none;
        position: absolute;
        top: 50px;
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
      background: url('../../pages/mainFrame/img/whitePoint.png') no-repeat;
    }
  }
}
</style>
