<template>
  <div class="notice-modal">
      <div class="notice-modal-header">
          <i :class="iconClass" class="icon"></i>
          <span>{{header}}</span>
      </div>
      <div class="content">
          <ul>
              <li v-for="(item, index) in content" :key="index">
                  <a class="itemName" href="item.href">{{item.name}}</a>
                  <span class="time">{{item.time}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    header: String,
    content: Array,
    iconClass: String,
    time: String
  },
  data () {
    return {
    };
  }
};
</script>

<style lang="less">
@import "../../common/less/base.less";
/*@media only screen and (min-device-width: 1920px) {*/
  /*.notice-modal {*/
    /*width: 600px;*/
  /*}*/
/*}*/

/*@media only screen and (min-device-width: 1366px) and (max-device-width: 1368px) {*/
  /*.notice-modal {*/
    /*width: 350px;*/
  /*}*/
/*}*/

/*@media only screen and (min-device-width: 1279px) and (max-device-width: 1282px) {*/
  /*.notice-modal {*/
    /*width: 300px;*/
  /*}*/
/*}*/

.notice-modal {
    width: 100%;
    min-height: 280px;
    box-sizing: border-box;
    padding: 10px 8px;
    border: 1px solid #EAEAEA;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    .notice-modal-header {
        padding-bottom: 10px;
        box-sizing: border-box;
        .border-px(1px, rgba(7,17,27,0.1));
        font-family: 'Adobe 黑体 Std R';
        font-weight: 700;

        .icon {
            color: #6B6B6B;
        }
    }

    .content {
        ul {
            li {
                padding: 12px 0;
                overflow: hidden;
                border-bottom: 1px solid #F5F5F5;

                &:last-of-type {
                  border-bottom: 0;
                }
                .itemName {
                    width: 46%;
                    float: left;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    text-decoration: none;
                    color: #6B6B6B;
                }

                .time {
                    float: right;
                }
            }
        }
    }
}
</style>
