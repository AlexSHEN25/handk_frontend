<template>
  <div class="custom_header_container" :class="['custom_header_' + headerType, { hover: hideHeader }]" @click.stop="isShow = false">
    <nav :style="headerStyle">
      <div class="nav">
        <img @click.stop="toHome" :src="logo" alt="" class="logo" title="返回首页">
        <div class="btns">
          <div v-if="showCart" @click.stop="toCart" class="btn cart">
            <el-badge :value="cartNum" :max="99" class="item">
              <i class="el-icon-shopping-cart-1"></i>
            </el-badge>
            <span>购物车</span>
          </div>
         <div  class="btn" style="width: 50px;position: relative;display: flex;"  @click.stop="openMsg" :style="{backgroundColor:isShow?'#293F49':''}">
        <div style="display: flex;">  <img src="../../assets/images/i1.png" alt="" style="height: 25px;">
            <div style="font-size: 19px;">
            <div v-if="msgList.message_num" style="position: absolute;height: 25px;width: 20px;text-align: center; border-radius: 50%;background-color: red;color: white;right: -2px;top: -2px;">{{ msgList.message_num }}</div>
            </div>
        </div>
          <div class="msg-panel" style="width: 400px; background-color: #293F49;position: absolute;top:46px;padding: 20px;" v-if="isShow" >
          <div v-for="(a,i) in msgList.list" style="color: white;position: relative;z-index: 100;margin-bottom: 20px;" @click.stop="opens(a)" :key="i">
           <div style="display: flex; align-items: center;color: white;position: relative;z-index: 100;font-size: 18px;" >
            <img src="../../assets/images/i2.png" alt="" style="width: 25px;margin-right: 15px;">
          <div style="width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ a.message }}</div>
          <div>{{ a.createtime }}</div>
          </div></div>
          </div> .
          </div>
<!--          <div @click.stop="toJoinUs" class="btn">
            <img src="@/assets/images/icon_share.png" alt="">
          </div>-->
          <div @click.stop="toJoinUs" class="btn join-btn">
            <img src="@/assets/images/icon_share.png" alt="">
          </div>
          <div @click.stop="toShowMenu" class="btn">
            <img src="@/assets/images/more_btn.png" alt="">
          </div>
        </div>
      </div>
    </nav>
    <div v-if="!hideHeader" class="header_content">
      <el-carousel height="550px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <div class="like_img" :style="{ backgroundImage: `url(${item.image})` }"></div>
        </el-carousel-item>
      </el-carousel>
      <div class="head_text">
        <template v-if="headerType == 'home'">
          <div class="company_name">
            <span>株式</span>
            <span>会社</span>
          </div>
          <p>H&K</p>
          <em>包丁をはじめMADE IN JAPANのキッチンツールを海外へ紹介、輸出</em>
          <h3>{{ headerData.home.title }}</h3>
          <h4>{{ headerData.home.describe }}</h4>
        </template>
        <!--<template v-else-if="headerType == 'intro'">-->
        <!--  <span>藤次郎TOJIRO</span>-->
        <!--  <p>藤次郎的工匠依據日本刀刃的製作精隨「自由鍛造」(即日本刀的真正價值)手工製作每把廚刀。手工訂製的廚刀除了刀身及刀柄的材質能自行挑選之外,在收到客人訂單後每把廚刀從製作開始到完成全部由同一位工匠負責製作。刀具工作室內所生產的手工訂製廚刀為藤次郎產品中最高級且極富創意的產品。</p>-->
        <!--</template>-->
        <!--<template v-else-if="japanNames.includes(headerType)">-->
        <!--  <span>From Japan</span>-->
        <!--</template>-->
        <!--<template v-else-if="headerType == 'helper'">-->
        <!--  <span>帮助中心</span>-->
        <!--</template>-->
        <!--<template v-else-if="headerType == 'join_us'">-->
        <!--  <span>加入我们</span>-->
        <!--</template>-->
      </div>
    </div>
    <div v-if="showDark" class="dark"></div>
    <el-drawer :visible.sync="isShowMenu" :size="360" :with-header="false">
      <div class="drawer_header">
        <div v-if="!!userInfo.token" @click.stop="toMyCenter" class="nickname">个人中心</div>
        <img v-else src="@/assets/images/logo_white.png" alt="" class="logo">
        <span @click.stop="toHideMenu" class="close_btn btn perfect_center_y"><i class="el-icon-close"></i></span>
      </div>
      <ul>
        <template v-for="(item, index) in menu">
          <router-link v-if="item.isResident || !!userInfo.token" :to="item.path" tag="li" active-class="hover">
            <div style="position: relative;">{{ item.meta.title }}
                <div
                style="position: absolute;top: -12px;right: -50px; color: white;padding:0px 8px;background-color: red;border-radius: 20px;"
                v-if="index == 1 &&getNew.goods==1"> <span>new</span> </div>
                <div
                style="position: absolute;top: -12px;right: -50px; color: white;padding:0px 8px;background-color: red;border-radius: 20px;"
                v-if="index == 2 &&getNew.article==1"> <span>new</span> </div>
                <div
                style="position: absolute;top: -12px;right: -50px; color: white;padding:0px 8px;background-color: red;border-radius: 20px;"
                v-if=" index == 3  &&getNew.product==1"> <span>new</span> </div>
            </div>
          </router-link>
        </template>
        <li v-if="!!userInfo.token" @click.stop="toExit">退出登录</li>
        <li v-else @click.stop="toLogin">用户登录</li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { userInfo, haveNew,messageList } from '@/api/api'

export default {
  name: "CustomHeader",
  components: {},
  props: {
    // 各个页面 如果传空字符串，则不显示header_content
  },
  data() {
    return {
      isShow:false,
      getNew: {},
      showDark: false,
      showCart: false,
      hideHeader: false,
      headerType: '',
      headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
      },
      japanNames: [
        'japan_freight_list',
        'japan_freight_detail',
      ],
      msgList:{
        list:[]
      },
      isShowMenu: true,
      menu: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页' },
          isResident: true
        },
        // {
        //   path: '/about_us',
        //   name: 'about_us',
        //   meta: {title: '关于我们'},
        //   isResident: true
        // },
        /* {
          path: '/about_us',
          name: 'about_us',
          meta: {title: '新闻资讯'},
          isResident: true
        }, */
        {
          path: '/store',
          name: 'store',
          meta: { title: '国内商城' },
        },
        {
          path: '/my',
          name: 'my',
          meta: {title: '我的订单'},
        },
        {
          path: '/japan_freight',
          name: 'japan_freight',
          meta: { title: 'From Japan' },
        },
        {
          path: '/products_list',
          name: 'products_list',
          meta: { title: '产品册资料' },
        },
        {
          path: '/join_us',
          name: 'join_us',
          meta: { title: '联系我们' },
          isResident: true
        },
        {
          path: '/helper',
          name: 'helper',
          meta: { title: '帮助中心' },
        }
      ],
      currentUserInfo: {

      }
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler(name) {
        this.headerType = name;

        this.toHideMenu();
      },
    },
    headerType: {
      immediate: true,
      handler(type) {
        console.log('type-->>', type);

        this.showDark = ![
          'store_list',
          'store_detail',
          'products_list',
          'products_info',
          'order_detail',
        ].includes(type);
          this.showCart = [
          'store_list',
          'store_detail',
          'products_list',
          'products_info',
          'order_detail',
        ].includes(type);
        this.hideHeader = [
          'account',
          'order_list',
          // 'order_detail',
          'p_collect',
          'a_collect',
          'cart',
        ].includes(type);
      }
    },
    userInfo: {
      immediate: true,
      handler({ token }) {
        if (!!token) {
          this.getUserInfo();
        }
      }
    },
    hideHeader: {
      immediate: true,
      handler(flag) {
        if (flag) {
          this.headerStyle = {
            backgroundColor: 'rgba(0, 0, 0, 1)'
          }
        }
      }
    },
  },
  computed: {
    ...mapState('config', ['logo', 'cartNum', 'banner', 'headerData']),
    ...mapState('user', ['userInfo']),
    cartNum() {
      return this.$store.state.config.cartNum
    }
  },
  created() {
    window.addEventListener('scroll', this.updateNavStyle)

  },
  mounted() {
    this.getNewInfo()
    this.getMsg()
  },
  methods: {
    openMsg(){
      if(!this.msgList.list.length){
        this.$message.warning('暂无消息')
        return
      }
      this.isShow=!this.isShow

    },
    opens(a){
      if(a.type==1){
        this.$router.push('/store')
      }else if(a.type==3){
        this.$router.push(
        "/products_list"
        )
      }else if(a.type==2){
        this.$router.push(
        "/japan_freight/list"
        )
      }
    },
    getMsg(){

      messageList({}).then(res => {
      this.msgList = res.data
      console.log(this.msgList,'this.msgList');
      }).catch(err => {

      })
    },
    ...mapActions('config', ['setShowLoginBox']),
    ...mapActions('user', ['setUserInfo']),
    toHome() {
      this.$router.push('/')
    },
    getNewInfo() {
      haveNew({}).then(res => {
        const d = res.data;
        this.getNew = d;
      }).catch(err => {

      })
    },
    toJoinUs() {
      this.$router.push('/join_us')
    },
    getUserInfo() {
      userInfo().then(res => {
        const d = res.data;
        this.currentUserInfo = d;
      }).catch(err => {
        console.log(err);
      })
    },
    updateNavStyle() {
      if (this.hideHeader) {
        return false;
      }

      const top = document.documentElement.scrollTop;
      const o = top / 450;
      this.headerStyle = {
        backgroundColor: `rgba(0, 0, 0, ${o > 1 ? 1 : o})`,
        // boxShadow: `0 0 5px rgba(0, 0, 0, ${o >= 1 ? '.2' : '0'})`
      }
    },
    toCart() {
      this.$router.push({ name: 'cart' })
    },
    toLogin() {
      this.setShowLoginBox(true);
    },
    toExit() {
      this.setUserInfo({})
      this.toLogin();
    },
    toShowMenu() {
      this.isShowMenu = true;
    },
    toHideMenu() {
      this.isShowMenu = false;
    },
    toMyCenter() {
      this.$router.push('/my/Account')
    },
  },
  beforeMount() {

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updateNavStyle)
  }
}
</script>
<style scoped lang="scss">
.el-dropdown-menu{
  width: 350px;
}
</style>
<style scoped lang="scss">
/* ===== 干掉消息按钮右下角白点 ===== */
.btns .btn:not(.cart) {
  ::v-deep .el-badge__content {
    display: none !important;
  }
}
.custom_header_container {

  .btn.join-btn {
    width: 45px;
    height: 45px;

    border-radius: 0px;
    background-color: #000;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: none;
    }

    &::after {
      content: '加入\A我们';   /* ← 正确换行 */
      white-space: pre-line;   /* ← 关键 */

      display: block;
      text-align: center;

      color: #fff;
      font-size: 11px;
      font-weight: 500;
      line-height: 1.2;
    }
  }

  position: relative;
  //padding-top: 100px;

  .dark {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
  }

  nav {
    z-index: 12;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1200px;
      height: 100px;
      margin: 0 auto;

      .logo {
        width: 200px;
        cursor: pointer;
      }

      .btns {
        display: flex;
        flex-wrap: wrap;         // 不换行
        justify-content: flex-end; // 按钮靠右
        align-items: center;
        gap: 2px;                  // 按钮间距
        overflow: visible;         // 防止被遮挡
        .btn {
          width: 45px;
          height: 45px;
          background-color: #000;
          color: #c4c4c4;

          i {
            font-size: 20px;
          }

          span {
            color: #999;
            font-size: 8px;
          }

          img {
            width: 25px;
            //height: 20px;
          }

          &:nth-of-type(n + 2) {
            margin-left: 8px;
          }

          &.cart {
            flex-direction: row;
            background-color: transparent;
            width: auto;
            margin-right: 33px;

            i {
              font-size: 30px;
              color: #fff;
            }

            span {
              margin-left: 15px;
              color: #fff;
              font-size: 16px;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .header_content {
    z-index: 11;
    position: relative;
    height: 550px;
    color: #fff;

    .like_img {
      height: 550px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &.custom_header_home {
    .header_content {
      .head_text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 12;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .company_name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 144px;
        height: 144px;
        border-radius: 2px;
        background-color: rgba(255, 255, 255, .2);
        border: 0.5px solid rgba(255, 255, 255, .2);
        backdrop-filter: blur(1px);

        span {
          line-height: 47.54px;
          font-size: 42px;
          font-weight: 400;
          font-family: HGRHKFSJ;
        }
      }

      p {
        line-height: 48.51px;
        margin-top: 16px;
        font-size: 42px;
        font-weight: 400;
        //font-family: Yeseva One;
      }

      em {
        width: 265px;
        line-height: 16.17px;
        margin-top: 16px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }

      h3 {
        line-height: 28px;
        margin-top: 32px;
        font-size: 20px;
        font-weight: 500;
      }

      h4 {
        line-height: 22.4px;
        margin-top: 16px;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  &.custom_header_intro {
    .header_content {
      span {
        line-height: 86.88px;
        font-size: 60px;
        font-weight: 400;
      }

      p {
        width: 677px;
        line-height: 28px;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }
  }

  &[class*=custom_header_japan_freight],
  &.custom_header_helper,
  &.custom_header_join_us {
    font-size: 60px;
    font-weight: 400;
  }

  &.hover {
    padding-top: 100px;

    .dark {
      background-color: rgba(0, 0, 0, 0);
    }

    .header_content {
      display: none;
    }
  }

  ::v-deep {
    .el-drawer__body {
      padding: 48px 40px;
      background-color: #000;
      color: #fff;

      .drawer_header {
        display: flex;
        justify-content: space-between;
        position: relative;

        .logo {
          width: 215px;
          height: 50px;
        }

        .nickname {
          line-height: 33.6px;
          font-size: 24px;
          font-weight: 400;
          cursor: pointer;

          &:hover {
            font-weight: bold;
          }
        }

        span {
          z-index: 2020;
          right: -20px;
          padding: 20px;

          i {
            font-size: 20px;
          }

          &:hover {
            font-weight: bold;
          }
        }
      }

      ul {
        margin-top: 20px;

        li {
          display: flex;
          align-items: center;
          position: relative;
          height: 63px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;

          &:before {
            content: '';
            z-index: 2021;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 6px;
            border-radius: 10px;
            background-color: #ff7d00;
            transition: all .3s;
          }

          &.hover {
            color: #ff7d00;

            &:before {
              width: 262px;
            }
          }

          &:hover {
            &:before {
              width: 262px;
            }
          }
        }
      }
    }
  }
}

.msg-panel {
  width: 400px;
  background-color: #293F49;
  position: absolute;
  top: 46px;
  right: 0;

  padding: 20px;
  box-sizing: border-box;

  max-height: 360px;
  overflow-y: auto;
}

@media screen and (max-width: 1260px) {
  .custom_header_container {
    nav {
      .nav {
        width: auto;
        margin: 0 30px;
      }
    }
  }
}

/* 手机端适配 */
/* ================== 手机端适配 ================== */
@media screen and (max-width: 768px) {
  .custom_header_container {

    /* ===== 消息下拉面板 ===== */
    .btns {

      /* 消息面板本体 */
      > .btn div[style*="width: 400px"] {
        width: calc(100vw - 24px) !important;
        max-width: 360px;

        position: fixed !important;
        top: 80px !important;
        right: 12px !important;

        padding: 12px !important;

        background-color: #293F49;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

        z-index: 5000;
      }
    }


    /* 单条消息 */
    .btns .btn div[style*="color: white"] {
      margin-bottom: 12px !important;
      padding: 10px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
    }

    .btns .btn div[style*="background-color: red"] {
      top: -4px !important;
      right: -4px !important;
      font-size: 12px;
      line-height: 18px;
      min-width: 18px;
      height: 18px;
    }

    /* 消息内容行 */
    .btns .btn div[style*="align-items: center"] {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 6px;

      font-size: 14px;
    }

    /* 消息文本 */
    .btns .btn div[style*="overflow: hidden"] {
      width: 100% !important;
      white-space: normal !important;
      line-height: 1.4;
    }

    /* 时间 */
    .btns .btn div[style*="{{ a.createtime }}"] {
      font-size: 12px;
      opacity: 0.7;
    }


    .btn.join-btn {
      width: 46px;
      height: 46px;

      &::after {
        font-size: 10px;
        line-height: 1.15;
      }
    }
    /* ---------- 顶部 nav ---------- */
    nav {
      height: 64px;
      z-index: 100;
      .nav {
        height: 64px;
        margin: 0 12px;

        .logo {
          width: 140px;
        }

        /* ===== 右侧悬浮按钮（竖排） ===== */
        .btns {
          position: fixed;
          top: env(safe-area-inset-top, 10px);
          right: 12px;
          z-index: 1000;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;

          padding: 10px;
          border-radius: 16px;

          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(6px);

          z-index: 3000 !important;

          width: auto;
          height: auto;
          flex: none;
        }

        .btns .btn {
          width: 46px;
          height: 46px;

          display: flex;
          align-items: center;
          justify-content: center;

          background-color: #000;
          border-radius: 12px;
        }

        /* 购物车：只留图标 */
        .btns .btn.cart {
          width: 46px;
          margin-right: 0;
          background-color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btns .btn.cart span {
          display: none;
        }

        .btns .btn i {
          font-size: 22px;
          color: #fff;
        }

        .btns .btn img {
          width: 22px;
        }

        /* 红点位置修正 */
        .btns .btn div[style*="background-color: red"] {
          top: -6px !important;
          right: -6px !important;
        }
      }
    }

    /* ---------- 大背景区域 ---------- */
    .header_content {
      height: auto;
      min-height: 420px;
      position: relative;
      z-index: 50;
    }

    .dark {
      z-index: 40;
    }

    /* ===== 背景图：不裁切，左右留白 ===== */
    .like_img {
      height: 420px;

      background-size: contain;   /* 核心：完整显示 */
      background-position: center;
      background-repeat: no-repeat;

      padding: 0 16px;
      box-sizing: border-box;
      position: relative;
    }

    /* 可选：提升文字可读性 */
    .like_img::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.25),
              rgba(0, 0, 0, 0.45)
      );
      pointer-events: none;
    }

    /* ---------- 首页文字区域 ---------- */
    &.custom_header_home {

      .header_content {

        .head_text {
          position: absolute;
          inset: 0;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          padding: 0 20px;     /* 左右安全区 */
          box-sizing: border-box;
          text-align: center;

          z-index: 2;
        }

        .company_name {
          width: 110px;
          height: 110px;

          span {
            font-size: 28px;
            line-height: 34px;
          }
        }

        p {
          margin-top: 12px;
          font-size: 28px;
          line-height: 34px;
        }

        em {
          width: 100%;
          margin-top: 12px;
          font-size: 13px;
          line-height: 18px;
        }

        h3 {
          margin-top: 20px;
          font-size: 18px;
          line-height: 24px;
        }

        h4 {
          margin-top: 12px;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
}
.msg-panel {
  width: 230px;
  max-height: 300px;
  padding: 12px;

  top: 56px;
  right: 0;
  left: auto;

  border-radius: 12px;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
