<template>
  <div class="home_container">
    <div class="noticeboard">
      <el-carousel height="60px" direction="vertical" :autoplay="true" loop indicator-position="none">
        <el-carousel-item v-for="item in homeData.from_japan" :key="item.id">
          <!--<div class="img" :style="{backgroundImage: `url(${item.image.replace('https:', 'http:')})`}"></div>-->
          <div @click.stop="toCarouselDetail(item)" class="info">
            <h2>{{item.source}}</h2>
            <p>{{ item.describe }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div @click.stop="toJapan" class="btn more_btn">更多></div>
    </div>
    <div class="section_list">
      <section class="list">
        <h2><span>产品</span><em>资讯</em></h2>
        <ul>
          <template v-for="(item, index) in homeData.brand">
            <li @click.stop="toDetail(item)" :key="item.id" :style="{backgroundImage: `url(${item.image})`}">
              <div class="products_info">
                <h3>{{ item.name }}</h3>
                <span>{{ item.english_name }}</span>
                <div class="btn">Move</div>
              </div>
            </li>
          </template>
        </ul>
      </section>
      <section class="information">
        <h2><span>新闻</span><em>资讯</em></h2>
        <div class="content" :style="{width: (infomationWidth + 30) + 'px'}" :class="{hover: allNews}">
          <ul>
            <template v-for="(item, index) in homeData.news_inform">
              <li>
                <h3>{{ item.title }}</h3>
                <p>{{item.content}}</p>
                <div class="other">
                  <em>{{ item.createtime | formatTime }}</em>
                  <!--<span>MOVE<i class="el-icon-arrow-right"></i></span>-->
                </div>
              </li>
            </template>
          </ul>
          <div class="more_info_btn">
            <div @click.stop="allNews = !allNews" class="btn">{{ allNews ? '收起' : '更多资讯' }}<i class="el-icon-arrow-down"></i></div>
          </div>
        </div>
      </section>
      <section class="about">
        <h2><span style="color: #1d2129;">关于</span><em>H&K</em></h2>
        <div class="content" :style="{width: (infomationWidth + 30) + 'px'}">
          <div class="text">
            <!--<h3>当社について</h3>-->
            <!--<span>About H&K</span>-->
            <p v-html="homeData.about_us.content"></p>
          </div>
          <div class="dark"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import {homeData} from '@/api/api'

  export default {
    name: 'Home',
    components: {},
    props: {},
    data() {
      return {
        allNews: false,
        infomationWidth: 0,
        homeData: {
          banner: [],
          from_japan: [],
          brand: [],
          news_inform: [],
          about_us: {
            content: ''
          }
        }
      }
    },
    watch: {},
    computed: {},
    beforeMount() {

    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setSectionW)
    },
    mounted() {

    },
    created() {
      this.setSectionW();
      this.getHomeData();

      window.addEventListener('resize', this.setSectionW)
    },
    methods: {
      setSectionW() {
        const W = window.innerWidth;
        this.infomationWidth = (W - 1200) / 2 + 1200;
      },
      getHomeData() {
        homeData().then(res => {
          const d = res.data
          this.homeData = d;

          this.$store.dispatch('config/setBanner', d.banner)
          this.$store.dispatch('config/setHeaderData', {home: d.top_content})
        }).catch(err=>{
          console.log(err);
        })
      },
      toDetail({id}) {
        this.$router.push('/intro/' + id)
      },
      toCarouselDetail({id}) {
        this.$router.push({name: 'japan_freight_detail', params: {id}})
      },
      toJapan() {
        this.$router.push({name: 'japan_freight'})
      },
    },
  }
</script>

<style scoped lang="scss">
.home_container {
  padding: 28px 0 108px;
}

.noticeboard {
  position: relative;
  width: 1080px;
  height: 60px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #f2f2f2;

  ::v-deep {
    .el-carousel__item {
      display: flex;
      justify-content: stretch;
      align-items: center;
      height: 60px;
      //padding: 20px 0;
      cursor: pointer;
    }
  }

  .img {
    width: 143px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 40px;

    h2 {
      line-height: 22.4px;
      font-size: 16px;
      font-weight: 500;
    }

    p {
      line-height: 22.4px;
      margin-top: 2px;
      font-size: 16px;
      font-weight: 400;
      color: #86909c;
    }
  }

  .more_btn {
    z-index: 10;
    position: absolute;
    top: 0;
    right: 0;
    line-height: 22.4px;
    padding: 20px;
    font-size: 16px;
    font-weight: 500;
    color: #4e5969;
  }
}

.section_list {
  margin-top: 50px;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 163px;
    font-size: 36px;
    font-weight: 400;

    span {
      color: #ff7d00;
    }

    em {
      color: #1d2129;
    }
  }

  section {
    &.list {
      width: 1080px;
      margin: 0 auto;

      h2 {
        height: auto;
        padding: 17px 0 62px;
      }

      ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 60px 90px;

        li {
          position: relative;
          width: 300px;
          height: 456px;
          border-radius: 20px;
          //background-image: url(https://img.js.design/assets/img/64c0a0cf0f679dad6029b954.png#bd7d67e85da10956ea0e52ad1f6b942e);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          overflow: hidden;

          .products_info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 30px 0 36px;
            background-color: rgba(0, 0, 0, .8);
            transform: translateY(-456px);
            transition: all .3s;
            color: #fff;

            h3 {
              align-self: flex-start;
              line-height: 29.43px;
              padding: 0 30px;
              font-size: 26px;
              font-weight: 400;
            }

            span {
              line-height: 74.71px;
              padding: 0 10px;
              font-size: 66px;
              font-weight: 400;
              word-break: break-word;
              text-align: center;
            }

            .btn {
              width: 84px;
              height: 28px;
              border-radius: 50px;
              background-color: rgba(255, 255, 255, .3);
            }
          }

          &:hover {
            .products_info {
              transform: translateY(0);
            }
          }
        }
      }
    }

    &.information {
      .content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: #000;
        color: #fff;

        ul {
          width: 1200px;max-height: 60vh;
          padding: 45px 30px 0 0;
          overflow-x: hidden;
          overflow-y: auto;

          li {
            h3 {
              line-height: 33.6px;
              font-size: 24px;
              font-weight: 400;
            }

            p {
              line-height: 19.6px;
              margin-top: 16px;
              font-size: 14px;
              font-weight: 400;
            }

            .other {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 16px;
              font-size: 14px;
              font-weight: 400;

              span {
                display: flex;
                align-items: center;
                cursor: pointer;

                i {
                  font-size: 20px;
                }
              }
            }

            &:nth-of-type(n + 2) {
              margin-top: 24px;
            }

            &:nth-of-type(n + 3) {
              display: none;
            }
          }
        }

        .more_info_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1200px;

          .btn {
            padding: 28px 0 16px;
            font-size: 14px;
            font-weight: 400;
          }

          i {
            margin-left: 8px;
            font-size: 20px;
          }
        }

        &.hover {
          ul {
            li {
              &:nth-of-type(n + 3) {
                display: block;
              }
            }
          }

          .more_info_btn {
            i {
              transform: rotate(180deg);
            }
          }
        }
      }
    }

    &.about {
      display: flex;
      flex-direction: column;

      .content {
        align-self: flex-end;
        position: relative;
        padding: 40px 30px 44px;
        background-image: url(@/assets/images/banner_about.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: #fff;
      }

      .dark {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
      }

      .text {
        z-index: 2;
        position: relative;
        width: 1200px;

        h3 {
          line-height: 33.6px;
          font-size: 24px;
          font-weight: 500;
        }

        span {
          line-height: 19.6px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        p {
          line-height: 28px;
          margin-top: 20px;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}

@media screen and (max-width: 1260px){
  .section_list {
    section {
      &.information {
        .content {
          width: auto!important;
          padding-left: 30px;

          ul,
          .more_info_btn {
            align-self: stretch;
            width: auto;
          }
        }
      }
      &.about {
        .content {
          width: auto!important;
          padding-left: 30px;

          .text {
            width: auto;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1080px) {
  .noticeboard {
    width: auto;
  }

  .section_list {
    section {
      &.list {
        width: auto;
        margin: 0 30px;

        ul {
          gap: 30px 30px;
        }
      }
    }
  }
}
/* 手机端适配：核心断点 768px */
@media screen and (max-width: 768px) {

  .home_container {
    padding: 20px 0 40px;
  }

  .noticeboard {
    width: 100%;
    height: auto;
    padding: 10px 12px;

    .info {
      padding-left: 10px;

      h2 {
        font-size: 14px;
        line-height: 18px;
      }

      p {
        font-size: 12px;
        margin-top: 2px;
        color: #86909c;
      }
    }

    .more_btn {
      padding: 10px;
      font-size: 12px;
    }
  }

  /* 整个 section_list 变成单列 */
  .section_list {
    padding: 0 16px;
    box-sizing: border-box;

    h2 {
      height: auto;
      padding: 20px 0;
      font-size: 22px;
    }

    section.list {
      width: 100%;
      margin: 0;                 /* 清掉 */
      box-sizing: border-box;

      ul {
        display: grid;
        grid-template-columns: 1fr; /* 单列 */
        gap: 20px;

        li {
          width: 100%;
          height: 456px; /* 比 PC 版短一些 */
          border-radius: 12px;

          .products_info {
            padding: 20px 0 20px;

            h3 {
              font-size: 18px;
              padding: 0 20px;
            }

            span {
              font-size: 36px;
              line-height: 40px;
            }

            .btn {
              width: 60px;
              height: 24px;
            }
          }
        }
      }
    }

    /* 新闻资讯：宽度撑满，字号缩小 */
    section.information {
      .content {
        width: auto !important;
        padding: 20px 12px;

        ul {
          width: 100%;
          padding: 0;

          li {
            h3 {
              font-size: 18px;
              line-height: 24px;
            }

            p {
              font-size: 12px;
              line-height: 18px;
              margin-top: 10px;
            }

            .other {
              font-size: 12px;
            }
          }
        }

        .more_info_btn {
          width: 100%;
        }
      }
    }

    /* 关于我们 */
    section.about {
      .content {
        width: auto !important;
        padding: 20px 12px;
      }

      .text {
        width: 100%;

        h3 {
          font-size: 18px;
        }

        p {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
