<template>
  <div class="about_us_container">
    <h2>H&K介绍</h2>
    <ul>
      <li>
        <span class="title">商号</span>
        <div class="text">{{ detail.firm }}</div>
      </li>
      <li>
        <span class="title">住所</span>
        <div class="text">{{ detail.residence }}</div>
      </li>
      <li>
        <span class="title">Tel</span>
        <div class="text">{{ detail.tel }}</div>
      </li>
      <li>
        <span class="title">代表者</span>
        <div class="text">{{ detail.principal }}</div>
      </li>
      <li>
        <span class="title">取引先银行</span>
        <div class="text">{{ detail.bank }}</div>
      </li>
      <li>
        <span class="title">資本金</span>
        <div class="text">{{ detail.money }}</div>
      </li>
      <li>
        <span class="title">事業内容</span>
        <div class="text">{{ detail.cause_content }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {aboutUs} from '@/api/api'

export default {
  name: "AboutUs",
  components: {},
  props: {},
  data() {
    return {
      detail: {

      },
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      aboutUs().then(res => {
        const {about_us, banner} = res.data;
        this.detail = about_us;

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
.about_us_container {
  width: 1200px;
  margin: 0 auto;
  padding: 60px 0 78px;

  h2 {
    line-height: 28px;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
  }

  ul {
    margin-top: 22px;

    li {
      display: flex;
      line-height: 28px;
      font-size: 16px;
      font-weight: 400;

      .title {
        width: 170px;
        color: #86909c;
      }

      .text {
        flex: 1;
        color: #1d2129;
      }

      &:nth-of-type(n + 2) {
        margin-top: 16px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .about_us_container {
    width: auto;
    margin: 0 30px;
  }
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .about_us_container {
    width: 100%;
    margin: 0 10px;
    padding: 30px 10px 40px;

    h2 {
      font-size: 20px;
      line-height: 24px;
    }

    ul {
      margin-top: 16px;

      li {
        flex-direction: column;
        align-items: flex-start;
        line-height: 22px;
        font-size: 14px;

        .title {
          width: 100%;
          margin-bottom: 4px;
          color: #86909c;
        }

        .text {
          width: 100%;
          color: #1d2129;
        }

        &:nth-of-type(n + 2) {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
