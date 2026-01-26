<template>
  <div class="a_collect_container">
    <h2>文章收藏</h2>
    <template v-if="list.length >= 1">
      <ul>
        <template v-for="(item, index) in list">
          <li @click.stop="toDetail(item)">
            <span class="beyond_oneline_omit">{{ item.name }}</span>
            <div @click.stop="toUnCollect(item, index)" class="btn">取消收藏</div>
          </li>
        </template>
      </ul>
    </template>
    <template v-else><div class="not_data">暂无数据</div></template>
    <Pagination @change="pageChange" :total="total"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import {articleCollect, collectArticle} from '@/api/api'

export default {
  name: "ACollect",
  components: {Pagination},
  props: {},
  data() {
    return {
      page: 1,
      row: 20,
      total: 10,
      list: []
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
      const {list, page, row} = this;
      articleCollect({page, row}).then(res => {
        const {total, data} = res.data;
        this.list = data;
        this.total = total;
      }).catch(err=>{
          console.log(err);
        })
    },
    toUnCollect({id}, index) {
      collectArticle({id}).then(res => {
        this.list.splice(index, 1)
        this.$message.success(res.msg);
      }).catch(res => {
        this.$message.error(res.msg);
      })
    },
    toDetail({id}) {
      this.$router.push({name: 'japan_freight_detail', params: {id}, query: {type: 'center'}})
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.a_collect_container {
  padding-bottom: 50px;
  background-color: #fff;
}

h2 {
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 25px;
  border-radius: 4px 4px 0 0;
  background-color: #e9e9e9;
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
}

ul {
  margin-top: 16px;

  li {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 24px;
    cursor: pointer;

    span {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
    }

    .btn {
      height: 40px;
      padding: 0 24px;
      font-size: 16px;
      font-weight: 400;
      color: #86909c;
    }

    &:nth-of-type(odd) {
      background-color: #fafafa;
    }
  }
}
</style>
