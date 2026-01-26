<template>
  <div class="japan_freight_list_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>帮助中心</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="list">
      <template v-for="(item, index) in list">
        <li @click.stop="toDetail(item)" :key="item.id">
          <div class="info">
            <div class="text">
              <h2>{{ item.name }}</h2>
              <span>{{ item.describe }}</span>
            </div>
            <em>{{ item.createtime }}</em>
          </div>
        </li>
      </template>
    </ul>
    <Pagination @change="pageChange" :total="total"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import {helpCenter} from '@/api/api'

export default {
  name: "Helper",
  components: {Pagination},
  props: {},
  data() {
    return {
      page: 1,
      total: 0,
      list: [],
      banner: [],
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    getList() {
      const {page, row} = this;
      helpCenter({page, row}).then(res => {
        const {list: {data, total}, banner} = res.data;
        this.list = data;
        this.total = total;

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    toDetail({id}) {
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
.japan_freight_list_container {
  width: 1200px;
  margin: 0 auto;
  padding: 34px 0 24px;
}

.list {
  margin-top: 27px;

  li {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #C9CDD4;
    height: 118px;
    cursor: pointer;

    .info {
      flex: 1;
      display: flex;
      padding: 0 23px 0 40px;

      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        h2 {
          line-height: 22.4px;
          font-size: 16px;
          font-weight: 500;
        }

        span {
          line-height: 22.4px;
          font-size: 16px;
          font-weight: 400;
          color: #86909c;
        }
      }

      em {
        align-self: flex-end;
        line-height: 22.4px;
        font-size: 16px;
        font-weight: 400;
        color: #86909c;
      }
    }

    &:hover {
      background-color: #fafafa;
    }
  }
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .japan_freight_list_container {
    width: 100%;
    margin: 0 10px;
    padding: 20px 10px;

    .list {
      margin-top: 16px;

      li {
        flex-direction: column;
        height: auto;
        padding: 12px 10px;
        border-bottom: 1px solid #e0e0e0;

        .info {
          flex-direction: column;
          padding: 0;

          .text {
            h2 {
              font-size: 14px;
              line-height: 20px;
            }

            span {
              font-size: 12px;
              line-height: 18px;
              color: #86909c;
            }
          }

          em {
            align-self: flex-start;
            font-size: 12px;
            margin-top: 6px;
            color: #86909c;
          }
        }
      }
    }
  }
}
</style>
