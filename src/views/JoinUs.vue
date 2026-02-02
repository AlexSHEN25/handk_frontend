<template>
  <div class="join_us_container">
    <div class="breadcrumb_box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
<!--        <el-breadcrumb-item>加入我们</el-breadcrumb-item>-->
        <el-breadcrumb-item>获取账号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="ornament_img" :style="{backgroundImage: `url(${imageObj.image})`}"></div>
      <div class="form_box">
        <div class="nav">
          <div @click.stop="navChange(0)" class="nav_item" :class="{hover: navIndex == 0}">获取账号</div>
<!--          <div @click.stop="navChange(1)" class="nav_item" :class="{hover: navIndex == 1}">产品咨询</div>-->
        </div>
        <div class="inset">
          <p>请在下面的表格中填写必要的项目并发送。如果您在发送电子邮件后一周内没有收到回复，请通过电话与我们联系。</p>
          <template v-if="navIndex == 0">
            <ul>
              <li>
                <span class="title">*公司全称</span>
                <div class="value">
                  <div class="input_box"><input v-model="submitData0.company_name" type="text"></div>
                </div>
              </li>
              <li>
                <span class="title">*负责人姓名</span>
                <div class="value">
                  <div class="input_box"><input v-model="submitData0.principal" type="text"></div>
                </div>
              </li>
              <li>
                <span class="title">*联系方式</span>
                <div class="value">
<!--                  <label class="input_box"><em>手机号：</em><input v-model="submitData0.phone" type="text"></label>
                  <label class="input_box"><em>QQ号：</em><input v-model="submitData0.qq_num" type="text"></label>-->
                  <label class="input_box"><em>微信号：</em><input v-model="submitData0.wechat_num" type="text"></label>
<!--                  <label class="input_box"><em>*e-mail：</em><input v-model="submitData0.email" type="text"></label>-->
                </div>
              </li>
              <li>
                <span class="title">公司/店铺地址</span>
                <div class="value">
                  <label class="input_box"><input v-model="submitData0.company_address" type="text"></label>
                </div>
              </li>
              <li>
                <span class="title">*销售渠道</span>
                <div class="value">
                  <label class="input_box"><input v-model="submitData0.channel" type="text"></label>
                </div>
              </li>
              <li>
                <span class="title">*是否有进出口经验</span>
                <div class="value like_radio_box">
                  <el-radio v-model="submitData0.is_exp" :label="0">否</el-radio>
                  <el-radio v-model="submitData0.is_exp" :label="1">是</el-radio>
                </div>
              </li>
              <li>
                <span class="title">邮件内容</span>
                <div class="value">
                  <el-input
                      :rows="4"
                      type="textarea"
                      resize="none"
                      v-model="submitData0.email_content"
                      maxlength="500"
                      show-word-limit></el-input>
                </div>
              </li>
              <li>
                <span class="title"></span>
                <div class="value">
                  <div @click.stop="toSubmit(0)" class="btn send_btn">确认发送</div>
                </div>
              </li>
            </ul>
          </template>
          <template v-else-if="navIndex == 1">
            <ul>
              <li>
                <span class="title">*姓名</span>
                <div class="value">
                  <div class="input_box"><input v-model="submitData1.name" type="text"></div>
                </div>
              </li>
              <li>
                <span class="title">*所在省市</span>
                <div class="value address_box">
                  <SelectAddress @change="addressChange" :mode="[1, 1]"></SelectAddress>
                </div>
              </li>
              <li>
                <span class="title">*联系方式</span>
                <div class="value">
<!--                  <label class="input_box"><em>手机号：</em><input v-model="submitData1.phone" type="text"></label>-->
<!--                  <label class="input_box"><em>QQ号：</em><input v-model="submitData1.qq_num" type="text"></label>-->
                  <label class="input_box"><em>微信号：</em><input v-model="submitData1.wechat_num" type="text"></label>
<!--                  <label class="input_box"><em>*e-mail：</em><input v-model="submitData1.email" type="text"></label>-->
                </div>
              </li>
              <li>
                <span class="title">邮件内容</span>
                <div class="value">
                  <el-input
                      :rows="4"
                      type="textarea"
                      resize="none"
                      maxlength="500"
                      show-word-limit v-model="submitData1.email_content"></el-input>
                </div>
              </li>
              <li>
                <span class="title"></span>
                <div class="value">
                  <div @click.stop="toSubmit(1)" class="btn send_btn">确认发送</div>
                </div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {validateEmail, validateMobile} from '@/utils/validate'
import {consult, joinPage, joinUs} from '@/api/api'

import SelectAddress from '@/components/SelectAddress/index.vue'

export default {
  name: "AboutUs",
  components: {SelectAddress},
  props: {},
  data() {
    return {
      navIndex: 0,
      submitData0: {
        // "公司名称"
        company_name: '',
        // "负责人"
        principal: '',
        // "19105060708" 联系方式
        phone: '',
        // "1264930666" QQ号
        qq_num: '',
        // "kashing" 微信号
        wechat_num: '',
        // "1264930666@qq.com" e-mail
        email: '',
        // "公司地址"
        company_address: '',
        // "销售渠道"
        channel: '',
        // 是否有进出口经验:0=否,1=是
        is_exp: 0,
        // "邮箱内容"
        email_content: '',
      },
      submitData1: {
        // "姓名"
        name: '',
        // "福建省/厦门市" 所在省市
        area: '',
        // "19105060708" 联系方式
        phone: '',
        // "1264930666" QQ号
        qq_num: '',
        // "123456" 微信号
        wechat_num: '',
        // "1264930666@qq.com" 邮箱
        email: '',
        // "邮件内容"
        email_content: '',
      },
      imageObj: {},
      banner: []
    }
  },
  watch: {},
  computed: {},
  created() {
    this.joinPage();
  },
  methods: {
    navChange(i) {
      this.navIndex = i;
    },
    addressChange({p, c, a}) {
      this.submitData1.area = [p, c , a].join('/')
    },
    toSubmit(type) {
      const {submitData0: d0, submitData1: d1,} = this;

      let msg = '';
      switch (type) {
      	case 0:
          switch (true) {
            case d0.company_name == '':
              msg = '公司全称不能为空';
              break;
            case d0.principal == '':
              msg = '负责人姓名不能为空';
              break;
            case d0.wechat_num == '':
              msg = '微信号不能为空';
              break;
            // case d0.phone == '':
            //   msg = '手机号不能为空';
            //   break;
            // case !validateMobile(d0.phone):
            //   msg = '手机号格式错误';
            //   break;
            // case d0.qq_num == '' && d0.wechat_num == '':
            //   msg = 'QQ号和微信号至少填一个';
            //   break;
            // case d0.email == '':
            //   msg = '邮箱不能为空';
            //   break;
            // case !validateEmail(d0.email):
            //   msg = '邮箱格式错误';
            //   break;
            // case d0.company_address == '':
            //   msg = '地址不能为空';
            //   break;
            case d0.channel == '':
              msg = '销售渠道不能为空';
              break;
            // case d0.email_content == '':
            //   msg = '邮件内容不能为空';
            //   break;
          }
      		break;
      	case 1:
          switch (true) {
            case d1.name == '':
              msg = '姓名不能为空';
              break;
            case d1.area == '':
              msg = '请先选择所在省份';
              break;
            // case d1.phone == '':
            //   msg = '手机号不能为空';
            //   break;
            // case !validateMobile(d1.phone):
            //   msg = '手机号格式错误';
            //   break;
            case d1.wechat_num == '':
              msg = '微信号不能为空';
              break;
            // case d1.qq_num == '' && d1.wechat_num == '':
            //   msg = 'QQ号和微信号至少填一个';
            //   break;
            // case d1.email == '':
            //   msg = '邮箱不能为空';
            //   break;
            // case !validateEmail(d1.email):
            //   msg = '邮箱格式错误';
            //   break;
            // case d1.email_content == '':
            //   msg = '邮件内容不能为空';
            //   break;
          }
      		break;
      }
      if(!!msg) {
        this.$message.error(msg);
        return false;
      }

      const fn = type == 1 ? consult(d1) : joinUs(d0)

      fn.then(res => {
        this.$message.success(res.msg)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    joinPage() {
      joinPage().then(res => {
        const {banner, image} = res.data;
        this.banner =  banner;
        this.imageObj =  image;

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
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
.join_us_container {
  padding: 24px 0;
}

.breadcrumb_box {
  width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  height: 890px;
  margin-top: 24px;
}

.ornament_img {
  flex: 1;
  //background-image: url(https://img.js.design/assets/img/64c0be3a73a91c224c4a2a27.png#706b881bbdb5eceefea4a8f7eb0003b3);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.form_box {
  width: 960px;
  padding: 0 60px 45px;
  background-color: #000;

  .nav {
    display: flex;

    .nav_item {
      position: relative;
      margin-right: 20px;
      padding: 24px 0 12px;
      font-size: 24px;
      font-weight: 500;
      color: #fff;
      cursor: pointer;

      &.hover {
        color: #ff7d00;

        &:before {
          content: '';
          z-index: 1;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: #ff7d00;
        }
      }
    }
  }
}

.inset {
  padding-top: 32px;

  p {
    width: 540px;
    line-height: 28px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  ul {
    margin-top: 20px;

    li {
      display: flex;
      color: #fff;

      .title {
        display: flex;
        align-items: center;
        width: 144px;
        height: 32px;
        font-size: 14px;
        font-weight: 500;
      }

      .value {
        display: flex;
        flex-direction: column;
        width: 396px;

        .input_box {
          display: flex;
          align-items: center;
          height: 32px;
          padding: 0 17px;
          border-radius: 2px;
          border: 1px solid #fff;

          input {
            flex: 1;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            color: #fff;
          }

          &:nth-of-type(n + 2) {
            margin-top: 24px;
          }
        }

        ::v-deep {
          .el-textarea {

            textarea {
              //width: 396px;
              //height: 100px;
              padding: 7px 17px;
              border-radius: 2px;
              border: 1px solid #fff;
              background-color: transparent;
              font-size: 14px;
              font-weight: 500;
              color: #fff;
            }

            .el-input__count {
              background-color: transparent;
            }
          }
        }

        &.like_radio_box {
          flex-direction: row;

          ::v-deep {
            .el-radio {
              display: flex;
              align-items: center;
              color: #fff;
            }
          }
        }
      }

      &:nth-of-type(n + 2) {
        margin-top: 24px;
      }
    }
  }

  .send_btn {
    width: 112px;
    height: 39px;
    border-radius: 4px;
    background-color: #fff;
    font-size: 16px;
    font-weight: 500;
    color: #1d2129;
  }
}

.address_box {
  ::v-deep {
    .el-input__inner {
      background-color: transparent;
      color: #fff;
    }
  }
}

@media screen and (max-width: 1260px){
  .breadcrumb_box {
    width: auto;
    margin: 0 30px;
  }
}
/* 手机端适配 */
@media screen and (max-width: 768px) {

  .join_us_container {
    padding: 16px 10px;
  }

  .breadcrumb_box {
    width: 100%;
    margin: 0;
  }

  .content {
    flex-direction: column;
    height: auto;
    margin-top: 16px;
  }

  .ornament_img {
    width: 100%;
    height: 200px;
    margin-bottom: 16px;
    background-size: cover;
  }

  .form_box {
    width: 100%;
    padding: 20px;
  }

  .form_box .nav {
    flex-direction: row;
    flex-wrap: wrap;

    .nav_item {
      font-size: 18px;
      margin-right: 12px;
      padding: 12px 0 6px;
    }
  }

  .inset {
    padding-top: 16px;

    p {
      width: 100%;
      font-size: 12px;
      line-height: 20px;
    }

    ul li {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 16px;

      .title {
        width: 100%;
        margin-bottom: 6px;
        font-size: 12px;
      }

      .value {
        width: 100%;

        .input_box {
          height: 32px;
          padding: 0 10px;
          font-size: 12px;

          input {
            font-size: 12px;
          }

          &:nth-of-type(n + 2) {
            margin-top: 12px;
          }
        }

        &.like_radio_box {
          flex-direction: column;
          gap: 8px;
        }

        ::v-deep {
          .el-textarea textarea {
            font-size: 12px;
          }
        }
      }
    }

    .send_btn {
      width: 100%;
      height: 36px;
      font-size: 14px;
    }
  }

  .address_box {
    ::v-deep {
      .el-input__inner {
        font-size: 12px;
      }
    }
  }
}
</style>
