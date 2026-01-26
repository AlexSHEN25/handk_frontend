<template>
  <div class="store_container">
    <div class="search_box">
      <div class="inset">
        <div class="classify_select">
          <span>{{ typeIndex >= 1 ? typeList[typeIndex].name : '商品分类' }}</span>
          <img src="@/assets/images/icon_search.png" alt="">
          <el-select v-model="typeIndex" placeholder="请选择">
            <el-option
                v-for="(item, index) in typeList"
                :key="item.id"
                :label="item.name"
                :value="index">
            </el-option>
          </el-select>
        </div>
        <div class="bulletin_board">
          <span>公告栏：</span>
          <el-carousel height="55px" direction="vertical" :autoplay="true">
            <el-carousel-item v-for="item in helpList" :key="item.id">
              <h3 @click.stop="toHelpDetail(item)" class="medium">{{ item.name }}</h3>
            </el-carousel-item>
          </el-carousel>
          <em @click.stop="helperCenter">More+</em>
        </div>
      </div>
    </div>
    <router-view @change="getConfigData" :typeSubList="goods_brand" :typeData="typeData"></router-view>
  </div>
</template>

<script>
import {helpCenter, shopPage} from '@/api/api'

export default {
  name: "Store",
  components: {},
  props: {},
  data() {
    return {
      banner: [],
      helpList: [],
      typeList: [],
      goods_brand: [],
      typeIndex: 0,
      cart_num: 0
    }
  },
  watch: {},
  computed: {
    typeData({typeList: l, typeIndex: i}) {
      return l[i];
    },
  },
  created() {
    this.getConfigData();
    // this.getHelpList();
  },
  methods: {
    // getHelpList() {
    //   helpCenter({page: 1, row: 9999}).then(res => {
    //     const {list: {data, total}, banner} = res.data;
    //     this.helpList = data.filter(item => item.is_shopshow == 1);
    //   })
    // },
    getConfigData() {
      shopPage().then(res => {
        const {goods_type, banner, cart_num, notice, goods_brand} = res.data;
        goods_type.unshift({
          id: 0,
          name: '全部',
        })
        goods_brand.unshift({
          id: 0,
          name: '全部',
        })

        this.typeList = goods_type;
        this.goods_brand = goods_brand;
        this.cart_num = cart_num;
        this.helpList = notice.filter(item => item.is_shopshow == 1);

        // this.$emit('change', goods_type)

        this.$store.dispatch('config/setCartNum', cart_num)

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    helperCenter() {
      this.$router.push('/helper')
    },
    toHelpDetail({id}) {
      this.$router.push({
        name: 'rich',
        query: {id},
        params: {type: 0}
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
.store_container {
  padding-top: 24px;

  .search_box {
    border-bottom: 1px solid #c9cdd4;
    padding: 0 12px;

    .inset {
      display: flex;
      align-items: center;
      flex-wrap: wrap; /* 手机端换行 */
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .classify_select {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 142px;
      height: 60px;
      background-color: #ff7d00;
      color: #fff;
      margin-bottom: 8px;

      span {
        font-size: 16px;
        font-weight: 500;
      }

      ::v-deep {
        .el-select {
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .el-input__inner {
          width: 100%;
          height: 100%;
        }
      }

      img {
        width: 14px;
        height: 10px;
        margin-left: 8px;
      }
    }

    .bulletin_board {
      flex: 1;
      display: flex;
      align-items: center;
      height: 55px;
      padding: 0 12px;
      border-radius: 4px;
      background-color: #f5f5f5;
      cursor: pointer;
      margin-left: 8px;
      margin-bottom: 8px;
      overflow: hidden;

      span {
        font-size: 16px;
        font-weight: 500;
        margin-right: 4px;
      }

      ::v-deep {
        .el-carousel {
          flex: 1;
        }
        .el-carousel__indicators {
          display: none;
        }
      }

      .medium {
        display: flex;
        align-items: center;
        height: 55px;
        padding-left: 8px;
        font-size: 16px;
        font-weight: 500;
        color: #165dff;
        cursor: pointer;
      }

      em {
        font-size: 14px;
        color: #c9cdd4;
        margin-left: auto;
        cursor: pointer;

        &:hover {
          font-weight: bolder;
        }
      }
    }
  }
}

/* 轮播高度适配 */
.el-carousel, .el-carousel__item {
  height: 55px !important;
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .store_container {
    padding-top: 0;
  }

  .search_box {
    position: sticky;
    top: 56px;
    z-index: 80;
    background: #fff;

    .inset {
      flex-direction: column;
      align-items: stretch;
    }

    /* 商品分类按钮：高度变小 + 靠左 */
    .classify_select {
      width: 100%;
      height: 44px;                 /* 原来 50px → 更紧凑 */
      justify-content: flex-start;  /* 关键：靠左 */
      padding-left: 12px;           /* 左边留手指空间 */
      box-sizing: border-box;

      span {
        font-size: 14px;
      }

      img {
        width: 12px;
        height: 8px;
        margin-left: 6px;
      }
    }

    .bulletin_board {
      width: 100%;
      height: 44px;                 /* 同步高度，看起来更整齐 */
      padding: 0 8px;

      span,
      .medium,
      em {
        font-size: 14px;
      }

      .medium {
        padding-left: 6px;
      }
    }
  }

  .el-carousel,
  .el-carousel__item {
    height: 44px !important;
  }
}
</style>
