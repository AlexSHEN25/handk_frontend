<template>
  <div class="rich_container">
    <h1>{{detail.name}}</h1>
    <div class="time">{{detail.createtime}}</div>
    <h2>{{detail.describe}}</h2>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script>
import {aboutUs, helpInfo} from '@/api/api'

export default {
  name: "Rich",
  components: {},
  props: {},
  data() {
    return {
      // 内容类型 0-帮助详情
      type: 0,
      id: 0,
      detail: {
        name: '',
        describe: '',
        content: '',
        createtime: '',
      },
      banner: []
    }
  },
  watch: {},
  computed: {},
  created() {
    const {params: {type}, query: {id}} = this.$route
    this.type = type * 1;
    this.id = id;

    this.getDetail();
  },
  methods: {
    getDetail() {
      const {type, id} = this;

      switch (type) {
        case 0:
          helpInfo({id}).then(res => {
            const {info, banner} = res.data;
            this.detail = info;

            this.$store.dispatch('config/setBanner', banner)
          }).catch(err=>{
          console.log(err);
        })
          break;
        case 1:
          break;
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
.rich_container {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
  text-align: center;

  h1 {
    font-size: 20px;
    font-weight: 400;
  }

  .time {
    margin-top: 15px;
    font-size: 14px;
    color: #999;
  }

  h2 {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
  }

  .content {
    margin-top: 30px;
    text-align: left;
  }
}

@media screen and (max-width: 1260px){
  .rich_container {
    width: auto;
    margin: 0 30px;
  }
}

@media screen and (max-width: 768px) {
  .rich_container {
    width: 100%;
    margin: 0 10px;
    padding: 20px 0;

    h1 {
      font-size: 18px;
      line-height: 1.4;
    }

    .time {
      margin-top: 10px;
      font-size: 12px;
    }

    h2 {
      margin-top: 15px;
      font-size: 14px;
    }

    .content {
      margin-top: 20px;
      font-size: 14px;

      p {
        line-height: 1.6;
        word-break: break-word;
      }

      img, table, iframe {
        max-width: 100%;
        height: auto;
      }
    }
  }
}
</style>
