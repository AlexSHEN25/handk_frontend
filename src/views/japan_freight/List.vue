<template>
  <div class="japan_freight_list_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日本货运</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="keyword_box">
      <span class="label">文章关键字：</span>
      <ul>
        <template v-for="(item, index) in keywordList">
          <li @click.stop="selectKeyword(item)" :key="item.id">{{ item.name }}</li>
        </template>
      </ul>
    </div>
    <ul class="list">
      <template v-for="(item, index) in list">
        <li @click.stop="toDetail(item)" :key="item.id">
          <!--<img :src="item.image" alt="">-->
          <div class="info">
            <div class="text" style="position: relative;">
              <div v-if="item.is_new==1" class="new_tag">new</div>
              <h2>{{ item.name }}</h2>
              <span>{{ item.source }}</span>
            </div>
            <em>{{ item.release_time }}</em>
          </div>
        </li>
      </template>
    </ul>
    <Pagination @change="pageChange" :total="total"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import {articleKeyword, articleList} from '@/api/api'

export default {
  name: "JapanFreightList",
  components: {Pagination},
  props: {},
  data() {
    return {
      keywordList: [],
      banner: [],
      total: 10,
      list: [],
      limitData: {
        page: 1,
        keyword_id: ''
      }
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getList();
    this.getKeywords();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    getKeywords() {
      articleKeyword().then(res => {
        this.keywordList = res.data;
      }).catch(err=>{
          console.log(err);
        })
    },
    selectKeyword({id}) {
      this.limitData.keyword_id = id;
      this.getList()
    },
    getList() {
      const {limitData: d} = this;

      articleList(d).then(res => {
        const {banner, list: {total, data}} = res.data;

        this.total = total;
        this.list = data;

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    toDetail({id}) {
      this.$router.push({name: 'japan_freight_detail', params: {id}})
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.japan_freight_list_container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 12px;
}

.keyword_box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;

  .label {
    flex-shrink: 0;
    width: 90px;
    color: #666;
  }

  span {
    line-height: 28px;
    font-size: 14px;
    font-weight: 400;
    color: #1d2129;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-left: 8px;

    li {
      line-height: 28px;
      font-size: 14px;
      font-weight: 400;
      color: #165dff;
      cursor: pointer;

      &:not(:first-child) {
        margin-left: 8px;
        margin-top: 8px;
      }
    }
  }
}

.list {
  margin-top: 16px;

  li {
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid #C9CDD4;
    height: auto;
    cursor: pointer;

    img {
      width: 100px;
      height: 72px;
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 12px;

      .text {
        h2 {
          line-height: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        span {
          line-height: 18px;
          font-size: 12px;
          font-weight: 400;
          color: #86909c;
        }
      }

      em {
        line-height: 18px;
        font-size: 12px;
        font-weight: 400;
        color: #86909c;
        text-align: right;
      }
    }

    &:hover {
      background-color: #fafafa;
    }

    @media screen and (max-width: 768px) {
      padding: 16px 8px;
      flex-direction: column;
      align-items: flex-start;
      height: auto;

      img {
        width: 100%;
        height: auto;
        margin-bottom: 8px;
      }

      .info {
        padding: 0;
        .text h2 {
          font-size: 16px;
        }
        .text span {
          font-size: 14px;
        }
        em {
          font-size: 14px;
        }
      }
    }
  }
}
  .japan_freight_list_container {
    padding: 16px 8px;
  }

  .keyword_box {

    span {
      font-size: 12px;
      line-height: 24px;
    }

    ul {
      li {
        font-size: 14px;
        line-height: 26px;
        &:not(:first-child) {
          margin-left: 6px;
          margin-top: 6px;
        }
      }
    }
  }

  .list li {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 0;

    img {
      width: 100%;
      height: auto;
      margin-bottom: 8px;
    }

    .info {
      width: 100%;
      padding: 0;

      .text {
        position: relative;

        /* 有 new 标签时，给文字让位 */
        &:has(.new_tag) {
          padding-left: 52px; /* ≥ new_tag 宽度 */
        }

        .new_tag {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 5;

          padding: 2px 10px;
          height: 20px;
          line-height: 16px;

          background-color: #ff4d4f;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          border-radius: 10px;

          pointer-events: none;
          white-space: nowrap;
        }


        .text h2 {
          font-size: 16px;
          line-height: 22px;
        }

        .text span {
          font-size: 14px;
          line-height: 20px;
        }

        .text > div[v-if] {
          pointer-events: none;
          z-index: 0 !important;
        }

        em {
          font-size: 14px;
          line-height: 20px;
          text-align: left;
        }

        div[position="absolute"] {
          top: 0;
          left: 0;
        }
      }
    }

    /* 分页组件自适应屏幕 */
    .pagination_box {
      justify-content: center;

      .center {
        flex-direction: column;
        align-items: center;

        span {
          font-size: 12px;
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
