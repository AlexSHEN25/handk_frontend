<template>
  <div class="japan_freight_detail_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'japan_freight' }">日本货运</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>{{ detail.name }}</h1>
    <div class="text_btn">
      <div class="time">{{ detail.release_time }} 来源：{{ detail.source }}</div>
      <div @click.stop="toCollect" class="btn collect_btn" :class="{hover: detail.is_collect == 1}">{{ detail.is_collect == 1 ? '已收藏' : '收藏文章' }}</div>
    </div>
    <div class="content" v-html="detail.content"></div>
    <div class="btns">
      <div v-if="!type" @click.stop="toBack" class="btn back_btn">返回列表</div>
    </div>
  </div>
</template>

<script>
import {articleInfo, collectArticle, collectPamphlet} from '@/api/api'

export default {
  name: "JapanFreightDetail",
  components: {},
  props: {},
  data() {
    return {
      id: 0,
      // 来源 center-从个人中心的文章收藏列表跳转过来的
      type: '',
      banner: [],
      detail: {
        name: '',
        article_keyword: []
      }
    }
  },
  watch: {},
  computed: {},
  created() {
    const {params: {id}, query: {type}} = this.$route;
    this.id = id;
    this.type = type;

    this.getDetail();
  },
  methods: {
    getDetail() {
      const {id} = this;

      articleInfo({id}).then(res => {
        const {info, banner} = res.data;
        this.detail = info;

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    toBack() {
      this.$router.back();
    },
    toCollect() {
      const {id} = this;
      collectArticle({id}).then(res => {
        this.detail.is_collect = this.detail.is_collect == 1 ? 0 : 1;
        this.$message.success(res.msg);
      }).catch(res => {
        this.$message.error(res.msg);
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
.japan_freight_detail_container {
  padding: 24px 0 18px;
}

h1 {
  line-height: 33.6px;
  margin-top: 24px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}

.text_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  .collect_btn {
    width: 88px;
    height: 38px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;
    margin-left: 40px;
    background-color: #f5f5f5;
    color: #1d2129;

    &.hover {
      background-color: #165dff;
      color: #fff;
    }
  }
}

.time {
  line-height: 28px;
  font-size: 14px;
  font-weight: 500;
  color: #4e5969;
  text-align: center;
}
.content {
  line-height: 28px;
  margin-top: 24px;
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  .btn {
    width: 88px;
    height: 38px;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 400;

    &.back_btn {
      background-color: #ff7d00;
      color: #fff;
    }

    &:nth-of-type(n + 2) {
      margin-left: 24px;
    }
  }
}
@media screen and (max-width: 768px) {
  .japan_freight_detail_container {
    padding: 16px 12px 12px;
  }

  h1 {
    font-size: 20px;
    line-height: 28px;
    margin-top: 16px;
    text-align: left;
  }

  .text_btn {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 16px;

    .time {
      text-align: left;
      font-size: 12px;
      line-height: 20px;
    }

    .collect_btn {
      width: 100%;
      max-width: 160px;
      height: 36px;
      margin-left: 0;
      margin-top: 8px;
      font-size: 13px;
    }
  }

  .content {
    font-size: 13px;
    line-height: 22px;
    margin-top: 16px;
  }

  .btns {
    flex-direction: column;
    align-items: stretch;
    margin-top: 16px;

    .btn {
      width: 100%;
      height: 36px;
      font-size: 14px;
      &:nth-of-type(n + 2) {
        margin-left: 0;
        margin-top: 8px;
      }
    }
  }

  el-breadcrumb {
    font-size: 12px;

    ::v-deep .el-breadcrumb__item {
      margin-right: 4px;
    }
  }
}

@media screen and (max-width: 768px) {
  .japan_freight_detail_container {
    padding: 16px 12px 12px;
  }

  h1 {
    font-size: 20px;
    line-height: 28px;
    margin-top: 16px;
    text-align: left;
  }

  .text_btn {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 16px;

    .time {
      text-align: left;
      font-size: 12px;
      line-height: 20px;
    }

    .collect_btn {
      width: 100%;
      max-width: 160px;
      height: 36px;
      margin-left: 0;
      margin-top: 8px;
      font-size: 13px;
    }
  }

  .content {
    font-size: 13px;
    line-height: 22px;
    margin-top: 16px;
  }

  .btns {
    flex-direction: column;
    align-items: stretch;
    margin-top: 16px;

    .btn {
      width: 100%;
      height: 36px;
      font-size: 14px;
      &:nth-of-type(n + 2) {
        margin-left: 0;
        margin-top: 8px;
      }
    }
  }

  el-breadcrumb {
    font-size: 12px;

    ::v-deep .el-breadcrumb__item {
      margin-right: 4px;
    }
  }
}
</style>
