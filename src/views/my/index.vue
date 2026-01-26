<template>
  <div class="my_container">
    <div class="breadcrumb_box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="my_main">
      <ul class="nav">
        <template v-for="(item, index) in navList">
          <router-link :to="{path: item.name}" tag="li" active-class="hover">
            <img class="icon" :src="item.icon" alt="">
            <img class="icon1" :src="item.icon1" alt="">
            <span>{{item.title}}</span>
          </router-link>
        </template>
      </ul>
      <div class="my_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      navIndex: 0,
      navList: [
        {
          title: '账户安全',
          name: '/my/account',
          icon: require('@/assets/images/icon_account_safe.png'),
          icon1: require('@/assets/images/icon_account_safe1.png')
        },
        {
          title: '订单列表',
          name: '/my/order',
          icon: require('@/assets/images/icon_order_list.png'),
          icon1: require('@/assets/images/icon_order_list1.png')
        },
        {
          title: '产品册收藏',
          name: '/my/p_collect',
          icon: require('@/assets/images/icon_colllect.png'),
          icon1: require('@/assets/images/icon_colllect1.png')
        },
        {
          title: '文章收藏',
          name: '/my/a_collect',
          icon: require('@/assets/images/icon_article.png'),
          icon1: require('@/assets/images/icon_article1.png')
        }
      ]
    }
  },
  watch: {},
  computed: {},
  created() {

  },
  methods: {
    navChange(i) {
      this.navIndex = i;
    }
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.my_container {
  flex: 1;
  padding: 24px 0 25px;
  background-color: #f5f5f5;
}

.breadcrumb_box {
  width: 1200px;
  margin: 0 auto;
}

.my_main {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 20px auto 0;

  .nav {
    width: 165px;
    max-height: 632px;
    padding: 34px 0;
    border-radius: 4px;
    background-color: #fff;

    li {
      display: flex;
      align-items: center;
      height: 32px;
      padding-left: 22px;
      border-left: 4px solid transparent;
      cursor: pointer;

      img {
        width: 14px;

        &.icon {
          display: block;
        }

        &.icon1 {
          display: none;
        }
      }

      span {
        margin-left: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #c9cdd4;
      }

      &:nth-of-type(n + 2) {
        margin-top: 18px;
      }

      &.hover {
        border-left-color: #1d2129;

        img {
          &.icon1 {
            display: block;
          }

          &.icon {
            display: none;
          }
        }

        span {
          color: #1d2129;
        }
      }

      &:hover {
        border-left-color: #1d2129;
      }
    }
  }

  .my_content {
    flex: 1;
    //width: 1016px;
    margin-left: 20px;
    //background-color: #fff;
  }
}

@media screen and (max-width: 1260px) {
  .my_main {
    width: auto;
    margin: 20px 30px 0;
  }

  .breadcrumb_box {
    width: auto;
    margin: 0 30px;
  }
}

@media screen and (max-width: 768px) {
  .my_container {
    padding: 16px 10px 20px;
  }

  .breadcrumb_box {
    width: 100%;
    margin: 0;
    padding: 0 10px;
  }

  .my_main {
    flex-direction: column;
    width: 100%;
    margin: 10px 0 0;

    .nav {
      width: 100%;
      max-height: none;
      display: flex;
      overflow-x: auto;
      padding: 10px 0;
      border-radius: 4px;
      background-color: #fff;

      li {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: auto;
        padding: 10px 16px;
        margin: 0 10px;
        border-left: none;
        border-bottom: 2px solid transparent;

        img {
          width: 24px;

          &.icon {
            display: block;
          }

          &.icon1 {
            display: none;
          }
        }

        span {
          margin-left: 0;
          margin-top: 6px;
          font-size: 14px;
        }

        &.hover {
          border-bottom-color: #1d2129;

          img.icon1 {
            display: block;
          }

          img.icon {
            display: none;
          }

          span {
            color: #1d2129;
          }
        }
      }
    }

    .my_content {
      flex: 1;
      width: 100%;
      margin-left: 0;
      margin-top: 20px;
    }
  }
}
</style>
