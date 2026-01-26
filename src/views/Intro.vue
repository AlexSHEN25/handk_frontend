<template>
  <div class="intro_container">
    <h2>品牌介绍</h2>
    <div class="nav">
      <div @click.stop="navChange(0)" class="nav_item" :class="{hover: navIndex == 0}">品牌简介</div>
      <div @click.stop="navChange(1)" class="nav_item" :class="{hover: navIndex == 1}">产品资料</div>
    </div>
    <div v-if="navIndex == 0" class="intro_content" v-html="info.content"></div>
    <div v-else class="section_list">
      <div class="products_list">
        <ul>
          <template v-for="(item, index) in datas.product_info">
            <li @click.stop="toDetail(item)">
              <div class="icon" :style="{backgroundImage: `url(${require('@/assets/images/icon_folder.png')})`}"></div>
              <span class="beyond_oneline_omit">{{ item.name }}</span>
            </li>
          </template>
        </ul>
      </div>
      <div class="goods_list">
        <h2><em>热门</em>商品</h2>
        <template v-if="datas.goods.length >= 1">
          <ul>
            <template v-for="(item, index) in datas.goods">
              <li>
                <div class="images">
                  <img v-for="(img, j) in item.images" :src="img" style="object-fit: contain" alt="">
                </div>
                <div class="text">
                  <h3>{{ item.name }}</h3>
                  <em>产品描述</em>
                  <p>{{ item.describe }}</p>
                </div>
              </li>
            </template>
          </ul>
        </template>
        <template v-else><div class="not_data">暂无数据</div></template>
      </div>
    </div>
  </div>
</template>

<script>
import {brandInfo} from '@/api/api'

export default {
  name: "Intro",
  components: {},
  props: {},
  data() {
    return {
      navIndex: 0,
      productsList: 5,
      banner: [],
      info: {
        content: ''
      },
      datas: {
        product_info: [],
        goods: [],
      },
    }
  },
  watch: {},
  computed: {},
  created() {
    const {id} = this.$route.params;
    this.id = id;

    this.getDetail();
  },
  methods: {
    navChange(i) {
      this.navIndex = i;
    },
    getDetail() {
      const {id} = this;

      brandInfo({id}).then(res => {
        const {banner, info, datas} = res.data;
        this.banner = banner;
        this.info = info;
        this.datas = datas;
      }).catch(err=>{
          console.log(err);
        })
    },
    toDetail({id}) {
      this.$router.push('/brand_plist/' + id)
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.intro_container {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 148px;
  font-size: 26px;
  font-weight: 400;

  em {
    color: #ff7d00;
  }
}

.nav {
  display: flex;

  .nav_item {
    position: relative;
    line-height: 22.4px;
    padding-bottom: 12px;
    font-size: 16px;
    font-weight: 400;
    color: #4e5969;
    cursor: pointer;

    &:nth-of-type(n + 2) {
      margin-left: 24px;
    }

    &.hover {
      font-weight: 500;
      color: #ff7d00;

      &:before {
        content: '';
        z-index: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        border-radius: 8px;
        background-color: #ff7d00;
      }
    }
  }
}

.intro_content {
  margin-top: 30px;
}

.section_list {
  margin-top: 40px;

  .products_list {
    width: 1200px;
    overflow-x: auto;
    overflow-y: hidden;

    ul {
      display: flex;
      margin-bottom: 30px;
    }

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 256px;
      //height: 344px;

      .icon,
      img {
        width: 256px;
        height: 250px;
        border-radius: 4px;
      }

      .icon {
        background-size: 64px;
        background-position: center;
        background-repeat: no-repeat;
      }

      span {
        //flex: 1;
        //display: flex;
        //justify-content: center;
        //align-items: center;
        width: 200px;
        padding: 0 15px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }

      &:nth-of-type(n + 2) {
        margin-left: 57px;
      }
    }
  }

  .goods_list {
    border-top: 1px solid #c9cdd4;

    ul {
      li {
        display: flex;

        .images {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 598px;

          img {
            background-color: #f1f1f1;

            &:nth-of-type(1) {
              width: 600px;
              height: 400px;
            }

            &:nth-of-type(n + 2) {
              width: 186px;
              height: 145px;
              margin-top: 24px;
              border-radius: 4px;
            }
          }
        }

        .text {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 50px;

          h3 {
            line-height: 28px;
            font-size: 20px;
            font-weight: 500;
            color: #1d2129;
          }

          em {
            line-height: 28px;
            margin-top: 16px;
            font-size: 14px;
            font-weight: 500;
            color: #1d2129;
          }

          p {
            line-height: 28px;
            margin-top: 16px;
            font-size: 14px;
            font-weight: 400;
            color: #4e5969;
          }
        }

        &:nth-of-type(n + 2) {
          margin-top: 80px;
        }

        &:nth-of-type(even) {
          flex-direction: row-reverse;

          .text {
            padding: 0 50px 0 0;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1260px) {
  .intro_container {
    width: auto;
    margin: 0 30px;
  }
}

@media screen and (max-width: 768px) {
  .intro_container {
    width: 100%;
    margin: 0 10px;
    padding-bottom: 30px;

    h2 {
      font-size: 20px;
      height: auto;
      text-align: center;
    }

    .nav {
      flex-wrap: wrap;

      .nav_item {
        font-size: 14px;
        margin-left: 0;
        margin-right: 16px;
        padding-bottom: 8px;
      }
    }

    .intro_content {
      margin-top: 20px;
      font-size: 14px;
      line-height: 22px;
    }

    .section_list {
      margin-top: 20px;

      .products_list {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 16px;

        ul {
          display: flex;
          gap: 16px;
        }

        li {
          min-width: 180px;

          .icon,
          img {
            width: 180px;
            height: 140px;
          }

          span {
            font-size: 12px;
            width: 160px;
          }
        }
      }

      .goods_list {
        border-top: 1px solid #c9cdd4;
        ul {
          li {
            flex-direction: column !important;
            padding: 16px 0;

            .images {
              width: 100%;
              flex-wrap: wrap;

              img {
                width: 100% !important;
                height: auto !important;
                margin-top: 8px;
              }
            }

            .text {
              padding: 10px 0 0 0 !important;

              h3 {
                font-size: 16px;
              }

              em, p {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
