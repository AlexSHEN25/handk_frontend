<template>
  <div class="account_container">
    <div class="info">
      <el-upload
          class="avatar-uploader"
          :action="UPLOAD_URL"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
        <img :src="imageUrl" class="avatar">
      </el-upload>
      <ul>
        <template v-for="(item, index) in formData">
          <li>
            <span class="title">{{ item.title }}：</span>
            <div class="content">
              <div class="value">
                <template v-for="(v, j) in item.value">
                  <template v-if="item.flag == 'is_exp'">
                    <div v-if="item.isEdit" class="like_radio_box">
                      <el-radio v-model="is_exp" :label="0">否</el-radio>
                      <el-radio v-model="is_exp" :label="1">是</el-radio>
                    </div>
                    <el-input v-else :style="{width: textWidth(v.text)}" disabled type="text" :value="is_exp == 1 ? '是' : '否'"></el-input>
                  </template>
                  <el-input v-else :style="{width: textWidth(v.text)}" :maxlength="item.flag == 'phone' ? 13 : ''" :disabled="!item.isEdit" type="text" v-model="v.text"></el-input>
                </template>
              </div>
              <template v-if="item.allowEdit">
                <div v-if="item.isEdit" @click.stop="confirmEdit(item, index)" class="btn">完成</div>
                <div v-else @click.stop="editItem(item)" class="btn">修改</div>
              </template>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="set">
      <h2>账号设置</h2>
      <div class="content">
        <h3>
          <span>登录密码</span>
          <p>已设置。密码至少8位字符，支持数字、字母和除空格外的特殊字符。</p>
          <div v-if="!isEditPwd" @click.stop="toEditPwd" class="btn">修改</div>
        </h3>
        <div v-if="isEditPwd" class="form">
          <ul>
            <li>
              <input v-model="editPwdData.newpassword" type="password" placeholder="新密码">
            </li>
            <li>
              <input v-model="editPwdData.confirmpassword" type="password" placeholder="确认密码">
            </li>
          </ul>
          <div class="btns">
            <div @click.stop="confirmEditPwd" class="btn confirm_btn">确认修改</div>
            <div @click.stop="cancelEditPwd" class="btn cancel_btn">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {UPLOAD_URL} from '@/api/config'
import {editUser, resetpwd, userInfo} from '@/api/api'

export default {
  name: "Account",
  components: {},
  props: {},
  data() {
    return {
      UPLOAD_URL,
      imageUrl: '',
      userInfo: {},
      formData: [
        {
          title: '账号',
          allowEdit: false,
          isEdit: false,
          value: [
            // {
            //   text: 'zyy'
            // }
          ]
        },
        {
          title: '经销商等级',
          allowEdit: false,
          isEdit: false,
          value: [
            // {
            //   text: '大型'
            // }
          ]
        },
        {
          title: '公司名称',
          allowEdit: true,
          isEdit: false,
          flag: 'company_name',
          value: [
            // {
            //   text: '株式会社四国ナニワ'
            // }
          ]
        },
        {
          title: '负责人',
          allowEdit: true,
          isEdit: false,
          flag: 'principal',
          value: [
            // {
            //   text: 'zyy'
            // }
          ]
        },
        {
          title: '联系方式',
          allowEdit: true,
          isEdit: false,
          flag: 'phone',
          value: [
            // {
            //   text: '13799284733'
            // }
          ]
        },
        {
          title: '公司地址',
          allowEdit: true,
          isEdit: false,
          flag: 'company_address',
          value: [
            // {
            //   text: '香川県観音寺市豊浜町姫浜1022-2'
            // }
          ]
        },
        {
          title: '常用收货地址',
          allowEdit: false,
          isEdit: false,
          value: [
            // {
            //   text: '香川県観音寺市豊浜町姫浜1022-2'
            // }
          ]
        },
        {
          title: '销售渠道',
          allowEdit: true,
          isEdit: false,
          flag: 'channel',
          value: [
            // {
            //   text: 'www.taobao.com'
            // },
            // {
            //   text: 'www.taobao.com'
            // },
            // {
            //   text: 'www.taobao.com'
            // },
            // {
            //   text: 'www.taobao.com'
            // },
          ]
        },
        {
          title: '有无进出口经验',
          allowEdit: true,
          isEdit: false,
          flag: 'is_exp',
          value: [
            {
              text: '有'
            }
          ]
        },
      ],
      company_name: '',
      principal: '',
      phone: '',
      company_address: '',
      channel: '',
      is_exp: 0,
      isEditPwd: false,
      editPwdData: {
        newpassword: '',
        confirmpassword: '',
      }
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getInfo();
  },
  methods: {
    ...mapActions('config', ['setShowLoginBox']),
    getInfo() {
      userInfo().then(res => {
        const d = res.data;
        this.userInfo = d;

        this.imageUrl = d.avatar_text;
        this.formData[0].value = [{text: d.account}];
        this.formData[1].value = [{text: d.dealer_level}];
        this.formData[2].value = [{text: d.company_name}];
        this.formData[3].value = [{text: d.principal}];
        this.formData[4].value = [{text: d.phone}];
        this.formData[5].value = [{text: d.company_address}];
        this.formData[6].value = [{text: d.user_address}];
        this.formData[7].value = [{text: d.channel}];
        this.formData[8].value = [{text: d.is_exp_text}];

        this.company_name = d.company_name;
        this.principal = d.principal;
        this.phone = d.phone;
        this.company_address = d.company_address;
        this.channel = d.channel;
        this.is_exp = d.is_exp;
      }).catch(err=>{
          console.log(err);
        })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //获取文本宽度
    textWidth(text){
      text = text.replace(/\\s/g, 's');// 半角空格转换为全角空格,或者替换为单个字母或者汉字都可以
      const pre = document.getElementById('pre');

      if(!pre) {
        return 0
      }

      pre.innerText = text;
      let width = pre.clientWidth;
      // document.body.removeChild(pre);
      return width + 50 + 'px';
    },
    confirmEdit(item) {
      const {is_exp} = this;
      let d = {};
      switch (item.flag) {
        case 'is_exp':
          d.is_exp = is_exp;
          break;
        default:
          d[item.flag] = item.value[0].text;
          break;
      }

      editUser(d).then(res => {
        item.isEdit = false;
        this.$message.success(res.msg)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    editItem(item) {
      item.isEdit = true;
    },
    toEditPwd() {
      this.isEditPwd = true;
    },
    confirmEditPwd() {
      const {editPwdData: d} = this;

      let msg = '';
      switch (true) {
      	case d.newpassword == '':
      		msg = '新密码不能为空';
      		break;
      	case d.confirmpassword == '':
      		msg = '确认密码不能为空';
      		break;
      	case d.newpassword != d.confirmpassword:
      		msg = '两次密码不一致';
      		break;
      }
      if(!!msg) {
        this.$message.error(msg);
        return false;
      }

      resetpwd(d).then(res => {
        this.$message.success(res.msg);
        this.cancelEditPwd();
        this.setUserInfo({})
        this.setShowLoginBox(true);
      }).catch(res => {
        this.$message.error(res.msg);
      })
    },
    cancelEditPwd() {
      this.isEditPwd = false;
      this.editPwdData = {
        newpassword: '',
        confirmpassword: ''
      }
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">


.info {
  display: flex;
  align-items: flex-start;
  padding: 24px 38px 16px;
  border-radius: 4px;
  background-color: #fff;

  .avatar {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    border-radius: 50%;
  }

  ul {
    flex: 1;
    margin-left: 15px;

    li {
      display: flex;
      align-items: center;
      min-height: 36px;
      padding: 0 15px;

      .title {
        display: flex;
        align-items: center;
        width: 128px;
        height: 36px;
        font-size: 14px;
        font-weight: 400;
        color: #1d2129;
      }

      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .value {
          display: flex;
          flex-direction: column;

          ::v-deep {
            .el-input {
              max-width: 600px;

              &.is-disabled {
                .el-input__inner {
                  background-color: transparent;
                  border: 0;
                }
              }
            }
          }

          input {
            height: 25px;
            font-size: 14px;
            font-weight: 400;
            color: #1d2129;

            &:nth-of-type(1) {
              margin-top: 5px;
            }

            &:nth-of-type(n + 2) {
              margin-top: 10px;
            }

            &:not([disabled]) {
              padding: 0 15px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
          }

          .like_radio_box {
            display: flex;
            align-items: center;
            height: 36px;

            ::v-deep {
              .el-radio {
                display: flex;
                align-items: center;
                //color: #fff;
              }
            }
          }
        }

        .btn {
          height: 36px;
          margin-left: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #d6363b;
        }
      }

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}

.set {
  //height: 162px;
  margin-top: 16px;
  padding: 24px;
  border-radius: 4px;
  background-color: #fff;

  h2 {
    line-height: 22.4px;
    font-size: 16px;
    font-weight: 500;
  }

  h3 {
    display: flex;
    margin-top: 17px;
    line-height: 19.6px;
    font-size: 14px;
    font-weight: 500;

    span {
      color: #1d2129;
    }

    p {
      margin-left: 16px;
      color: #86909c;
    }

    .btn {
      margin-left: 38px;
      color: #d6363b;
    }
  }

  .form {
    margin: 16px 0 0 73px;

    ul {
      width: 254px;

      li {
        display: flex;
        align-items: center;
        height: 34px;
        border: 1px solid #c9cdd4;

        input {
          flex: 1;
          width: 100%;
          padding: 0 10px;
        }

        &:nth-of-type(n + 2) {
          margin-top: 16px;
        }
      }
    }

    .btns {
      display: flex;
      margin-top: 16px;

      .btn {
        width: 64px;
        height: 34px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #fff;

        &.confirm_btn {
          background-color: #165DFF;
        }

        &.cancel_btn {
          margin-left: 8px;
          background-color: #C9CDD4;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {

  /* ======================
     全局容器
  ====================== */
  .account_container {
    padding: 0;
    background: #f7f8fa;
  }

  /* ======================
     顶部信息区
  ====================== */
  .info {
    flex-direction: column;
    padding: 16px;
    background: transparent;
  }

  /* 头像 */
  .avatar-uploader {
    margin: 0 auto 16px;
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin: 0;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .12);
  }

  /* ======================
     信息列表（卡片化）
  ====================== */
  .info ul {
    width: 100%;
    margin: 0;
  }

  .info ul li {
    position: relative;
    display: block;
    margin-bottom: 12px;
    padding: 12px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .04);
  }

  /* 去掉 PC hover */
  .info ul li:hover {
    background: #fff;
  }

  /* 标题（字段名） */
  .info ul li .title {
    width: 100%;
    height: auto;
    margin-bottom: 4px;
    font-size: 12px;
    color: #86909c;
  }

  /* 内容区 */
  .info ul li .content {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  /* 值区域 */
  .info ul li .value {
    width: 100%;
    font-size: 15px;
    color: #1d2129;
  }

  /* ======================
     el-input 统一移动端样式
  ====================== */
  ::v-deep .el-input {
    width: 100% !important;
    max-width: 100% !important;
  }

  ::v-deep .el-input__inner {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    font-size: 15px;
    box-sizing: border-box;
  }

  /* 未编辑状态 → 看起来像纯文本 */
  ::v-deep .el-input.is-disabled .el-input__inner {
    padding: 0;
    height: auto;
    background: transparent;
    border: none;
    color: #1d2129;
  }

  /* ======================
     单选（是否有经验）
  ====================== */
  .like_radio_box {
    width: 100%;
    height: auto;
    margin-top: 4px;
  }

  ::v-deep .el-radio {
    margin-right: 16px;
  }

  /* ======================
     编辑 / 完成按钮
  ====================== */
  .info ul li .btn {
    margin-top: 10px;
    align-self: flex-start;
    padding: 6px 14px;
    font-size: 13px;
    border-radius: 20px;
    background: #f2f3f5;
    color: #165dff;
  }

  /* 可编辑项：右侧箭头提示 */
  .info ul li::after {
    content: '›';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #c9cdd4;
  }

  /* ======================
     账号设置区
  ====================== */
  .set {
    margin: 12px 0 0;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
  }

  .set h2 {
    font-size: 15px;
  }

  .set h3 {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 12px;
  }

  .set h3 span {
    font-size: 14px;
  }

  .set h3 p {
    margin: 6px 0 0;
    font-size: 12px;
    color: #86909c;
  }

  .set h3 .btn {
    margin: 8px 0 0;
    font-size: 13px;
    color: #165dff;
  }

  /* ======================
     修改密码表单
  ====================== */
  .set .form {
    margin: 16px 0 0;
  }

  .set .form ul {
    width: 100%;
  }

  .set .form ul li {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #e5e6eb;
  }

  .set .form ul li input {
    width: 100%;
    padding: 0 12px;
    font-size: 14px;
  }

  .set .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  .set .btns .btn {
    width: 48%;
    height: 36px;
    border-radius: 18px;
    font-size: 13px;
  }
}
</style>
