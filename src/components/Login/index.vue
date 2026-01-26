<template>
  <div class="dialog_content">
    <el-dialog
        :show-close="true"
        :visible.sync="showLoginBox"
        width="530px"
        :center="true"
        :close-on-click-modal="false"
        :before-close="handleCloseBefore">
      <div class="content">
        <img src="@/assets/images/logo_login.png" alt="" class="logo">
        <div class="center">
          <ul>
            <li>
              <i class="el-icon-user"></i>
              <div class="value">
                <input v-model="submitData.account" type="text" placeholder="请输入账号">
              </div>
            </li>
            <li>
              <i class="el-icon-lock"></i>
              <div class="value">
                <input v-model="submitData.password" :type="showPwd ? 'text' : 'password'" placeholder="请输入密码">
                <span @click.stop="showPwd = !showPwd" class="btn"><img src="@/assets/images/icon_eye.png" alt=""></span>
              </div>
            </li>
          </ul>
          <div class="form_footer">
            <div @click.stop="rememberPwd = !rememberPwd" class="like_checkbox" :class="{hover: rememberPwd}"><em></em>记住密码</div>
            <div @click.stop="isAgree = !isAgree" class="like_checkbox" :class="{hover: isAgree}"><em></em>用户协议</div>
          </div>
          <!--<div class="form_footer">-->
          <!--  <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>-->
          <!--  <el-checkbox v-model="isAgree">经销商保密协议</el-checkbox>-->
          <!--</div>-->
        </div>
        <div class="footer">
          <div @click.stop="toLogin" class="btn">登录</div>
          <p>登录即代表同意<span>《 H＆K.co.,LTD隐私政策》</span></p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {login} from '@/api/api'
import {getLocal, setLocal} from '@/utils/auth'

export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      showPwd: false,
      rememberPwd: false,
      isAgree: false,
      submitData: {
        account: '',
        password: '',
      }
    }
  },
  watch: {},
  computed: {
    ...mapState('config', ['showLoginBox'])
  },
  created() {
    const d = getLocal('account') || {
      account: '',
      password: '',
    };

    this.submitData = d;
    this.rememberPwd = !!d.account && !!d.password;
  },
  methods: {
    ...mapActions('config', ['setShowLoginBox']),
    handleCloseBefore() {
      this.setShowLoginBox(false);
    },
    toLogin() {
      const {isAgree, rememberPwd, submitData: d} = this;

      let msg = '';
      switch (true) {
      	case d.account == '':
      		msg = '账号不能为空';
      		break;
      	case d.password == '':
      		msg = '密码不能为空';
      		break;
      	case !isAgree:
      		msg = '请先同意用户协议';
      		break;
      }
      if(!!msg) {
        this.$message.error(msg)
        return false;
      }

      login(d).then(res => {
        this.$store.dispatch('user/setUserInfo', res.data.userinfo)
        this.setShowLoginBox(false);

        if(rememberPwd) {
          setLocal('account', d)
        }
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.dialog_content {
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 624px;
    padding: 55px 36px 20px;
    border-radius: 18px;
    background: linear-gradient(204.26deg,#fff 0%, #dae8fc 100%);
    //border: 1px solid #fff;

    .logo {
      width: 350px;
      height: 80px;
      margin: 0 auto;
    }

    .center {
      ul {
        li {
          display: flex;
          align-items: center;
          height: 72px;
          padding-left: 20px;
          border-radius: 8px;
          background: #fff;
          border: 1.5px solid #eef4fc;

          i {
            font-size: 30px;
            color: #3d444d;
            font-weight: bold;
          }

          .value {
            flex: 1;
            display: flex;
            align-items: center;

            input {
              flex: 1;
              width: 100%;
              padding: 0 20px;
              font-size: 24px;
              font-weight: 400;

              &::-webkit-input-placeholder {
                color: #c2c7cc;
              }
            }

            span {
              height: 72px;
              padding: 0 24px;

              img {
                width: 30px;
                height: 30px;
              }
            }
          }

          &:nth-of-type(n + 2) {
            margin-top: 20px;
          }
        }
      }

      .form_footer {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    }

    .form_footer {
      .like_checkbox {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 400;
        cursor: pointer;

        em {
          position: relative;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 4px;
          background-color: #fff;
          border: 1px solid #ccc;
          transition: all .3s;

          &:before {
            content: '';
            z-index: 2050;
            position: absolute;
            top: 12px;
            left: 14px;
            width: 5px;
            height: 12px;
            border: 1px solid #fff;
            border-top: 0;
            border-left: 0;
            transform: translate(-50%, -50%) rotate(45deg) scale(0);
            transform-origin: center center;
            transition: all .3s;
          }
        }

        &.hover {
          em {
            border-color: #409eff;
            background-color: #409eff;

            &:before {
              transform: translate(-50%, -50%) rotate(45deg) scale(1);
            }
          }
        }
      }

      ::v-deep {
        .el-checkbox {
          display: flex;
          align-items: center;
        }

        .el-checkbox__inner {
          width: 30px;
          height: 30px;
        }

        .el-checkbox__label {
        }
      }
    }

    .footer {
      .btn {
        height: 72px;
        border-radius: 12px;
        background-color: #1d2129;
        box-shadow: 0px 6px 12px rgba(63, 159, 255, 0.2);
        font-size: 24px;
        font-weight: 400;
        color: #fff;
      }

      p {
        line-height: 25.2px;
        margin-top: 38px;
        font-size: 18px;
        font-weight: 400;
        color: #c2c7cc;
      }
    }
  }

  ::v-deep {
    .el-dialog {
      background-color: transparent;
    }

    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      padding: 0;
    }
  }
}
/* 手机端适配 */
/* 手机端适配 */
@media screen and (max-width: 768px) {

  /* 弹窗整体缩小并自动高度 */
  .dialog_content ::v-deep .el-dialog {
    width: 90% !important;
    max-height: 90vh;
    margin-top: 5vh !important;
    border-radius: 12px !important;
  }

  .dialog_content ::v-deep .el-dialog__body {
    padding: 0 !important;
  }

  /* 内容区域 */
  .dialog_content .content {
    height: auto !important;
    padding: 20px 16px;
    border-radius: 12px;
  }

  /* LOGO 缩小 */
  .dialog_content .logo {
    width: 160px;
    height: auto;
    margin-bottom: 10px;
  }

  /* 输入区域 */
  .dialog_content .center ul li {
    height: 46px;
    padding-left: 10px;
    border-radius: 6px;
  }

  .dialog_content .center ul li i {
    font-size: 18px;
  }

  .dialog_content .center ul li input {
    font-size: 15px !important;
    padding: 0 8px !important;
  }

  .dialog_content .center ul li span img {
    width: 20px;
    height: 20px;
  }

  /* 复选框区域 收紧布局 */
  .dialog_content .form_footer {
    align-items: flex-start;
    gap: 8px;
    margin-top: 12px;
  }

  .dialog_content .form_footer .like_checkbox {
    font-size: 14px !important;
  }

  .dialog_content .form_footer .like_checkbox em {
    width: 20px;
    height: 20px;
  }

  /* 登录按钮 */
  .dialog_content .footer .btn {
    height: 46px;
    font-size: 16px;
    border-radius: 8px;
    margin-top: 20px;
  }

  /* 底部协议 */
  .dialog_content .footer p {
    font-size: 12px;
    margin-top: 16px;
    line-height: 16px;
  }
}
</style>
