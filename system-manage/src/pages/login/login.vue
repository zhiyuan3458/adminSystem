<template>
<div class="login-wrapper">
  <div class="title-wrapper">
    <img class="logo" src="./img/logo.png" alt="">
    <span class="system-manage">系统管理平台</span>
  </div>
  <div class="main-wrapper">
    <div class="login-box">
      <div class="title">
        <ul>
          <li :class="{active:0 === nowIndex}" @click="handleClick(0)">用户登录</li>
          <li :class="{active:1 === nowIndex}" @click="handleClick(1)">动态密码登录</li>
        </ul>
      </div>
      <form action="" v-show="userLoginShow">
        <div class="input-group">
          <span class="icon">@</span>
          <input type="text" class="login-input">
        </div>
        <div class="input-group">
          <span class="icon">@</span>
          <input type="text" class="login-input">
        </div>
        <div class="input-group validate-code-wrapper">
          <span class="icon">@</span>
          <input type="text" class="login-input">
          <img class="validate-code" src="./img/validateCode.png" alt="">
        </div>
        <el-checkbox v-model="checked">记住用户名与密码</el-checkbox>
        <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
      </form>
      <form action="" class="mobile-login-form" v-show="mobileLoginShow">
        <div class="input-group">
          <span class="icon">@</span>
          <input type="text" class="login-input" placeholder="请输入手机号">
        </div>
        <div class="input-group">
          <span class="icon">获取验证码</span>
          <input type="text" class="login-input" placeholder="请输入验证码">
        </div>
        <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
      </form>
    </div>
  </div>
  <div class="footer">
    <div class="copy-right">
      版权所有@Copyright 广东诚泰交通科技发展有限公司
    </div>
    <div class="erwei-code-wrapper">
      <img class="img" src="./img/erweiCode-ios.png" alt="">
      <img class="img" src="./img/erweiCode-android.png" alt="">
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      userLoginShow: true,
      mobileLoginShow: false,
      nowIndex: 0,
      checked: false
    };
  },

  methods: {
    handleLogin () {
      this.$router.push('/table');
    },
    handleClick (index) {
      this.nowIndex = index;
      switch (index) {
        case 0: { this.userLoginShow = true; this.mobileLoginShow = false; break; }
        case 1: { this.userLoginShow = false; this.mobileLoginShow = true; break; }
      }
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/border1px";
.login-wrapper {
  max-width: 100%;
  .title-wrapper {
      height: 80px;
      line-height: 80px;
      margin: 0 0 0 120px;
      .logo {
        display: inline-block;
        vertical-align: text-bottom;
      }
    .system-manage {
      font-size: 26px;
      font-weight: 700;
    }
  }

  .main-wrapper {
    background: url("./img/loginBg.jpg") no-repeat;
    padding: 38% 0 0;
    background-position:center center;
    background-size: cover;
    position: relative;

    .login-box {
      width: 350px;
      top: calc(50% - 27%);
      right: 15%;
      position: absolute;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 3px;
      border: 1px solid #ddd;
      background: white;

      &:after {
        content: ' ';
        width: 46px;
        height: 46px;
        position: absolute;
        top: 0;
        right: 0;
        background: url('./img/erweiqu.png') no-repeat;
        cursor: pointer;
      }

      .title {
        margin-bottom: 20px;
        padding-top: 15px;
        ul {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #ddd;

          &:after {
            content: ' ';
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            border-bottom: 1px solid #ddd;
          }
          li {
            position: relative;
            float: left;
            margin-right: 10px;
            padding-bottom: 8px;
            cursor: pointer;

            &.active {
              color: #FD9063;
              .border-1px(#FD9063);
            }
          }
        }
      }

      .input-group {
        width: 90%;
        margin-bottom: 20px;
        position: relative;
        display: table;
        border-collapse: separate;

        .icon {
          display: table-cell;
          padding: 4px 12px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
          color: #555;
          text-align: center;
          background-color: #eee;
          border: 1px solid #ccc;
          border-radius: 4px;
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          width: 1%;
          white-space: nowrap;
          vertical-align: middle;
        }

        .login-input {
          display: table-cell;
          position: relative;
          z-index: 2;
          float: left;
          width: 100%;
          margin-bottom: 0;
          height: 34px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          color: #555;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
          border-radius: 4px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background-color: white;
          -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
          -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
          -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
          box-sizing: border-box;
        }

        &.validate-code-wrapper {
          width: 55%;
          position: relative;

          .validate-code {
            width: 95px;
            height: 32px;
            position: absolute;
            top: 2px;
          }
        }
      }

      .login-btn {
        width: 100%;
        margin: 20px 0;
      }
    }
  }

  .footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .copy-right {
      font-size: 18px;
    }

    .erwei-code-wrapper {

      img {
        display: inline-block;
        margin-right: 15px;
        max-width: 95px;
        height: auto;
      }
    }
  }
}
</style>
