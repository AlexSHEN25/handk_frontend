<template>
  <div class="p_collect_container">
    <h2>产品册收藏</h2>
    <div class="limit_box">
      <ul>
        <!--<template v-for="(item, index) in typeList">-->
        <!--  <li @click.stop="typeChange(item, index)" :class="{hover: typeIndex == index}">{{item.name}}</li>-->
        <!--</template>-->
      </ul>
      <label class="input_box">
        <input @keyup.enter="toSearch" v-model="search_word" type="text" placeholder="搜索">
        <span @click.stop="toSearch" class="search_btn"><i class="el-icon-search"></i></span>
      </label>
    </div>
    <ul class="list">
      <li @click.stop="toCreateProducts">
        <div class="btn add_created_btn">
          <i class="el-icon-plus"></i>
          <em>点击创建产品集手册</em>
        </div>
        <span></span>
      </li>
      <template v-for="(item, index) in list">
        <li>
          <div class="icon" :style="{backgroundImage: `url(${require('@/assets/images/icon_file.png')})`}"></div>
          <span>{{item.name}}</span>
          <div class="dark">
            <div @click.stop="toPreview(item)" class="btn">查看</div>
            <div @click.stop="toCancelCollect(item, index)" class="btn">取消收藏</div>
          </div>
        </li>
      </template>
    </ul>
    <Pagination @change="pageChange" :total="total" :size="row"></Pagination>
  </div>
</template>

<script>
import {collectPamphlet, pamphletCollect, pamphletPage} from '@/api/api'

import Pagination from '@/components/Pagination/index.vue'

export default {
  name: "PCollect",
  components: {Pagination},
  props: {},
  data() {
    return {
      total: 0,
      page: 1,
      row: 20,
      search_word: '',
      list: [],
      typeIndex: 0,
      typeList: [],
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getList();
    this.getConfigData();
  },
  methods: {
    // typeChange({id}, i) {
    //   this.typeIndex = i;
    //
    //   this.limitData.brand_id = id;
    //   this.limitData.page = 1;
    //   this.getList();
    // },
    toSearch() {
      this.page = 1;
      this.getList();
    },
    getList() {
      const {list, page, row, search_word} = this;
      pamphletCollect({page, row, search_word}).then(res => {
        const {total, data} = res.data;
        this.list = data;
        this.total = total;
      }).catch(err=>{
          console.log(err);
        })
    },
    getConfigData() {
      pamphletPage().then(res => {
        const {banner, brand_list} = res.data;

        this.typeList = brand_list.unshift({
          id: 0, name: '全部'
        });

        // this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    toCreateProducts() {
      this.$router.push({name: 'products_list'})
    },
    toDetail({id}) {
      this.$router.push('/products_info/' + id)
    },
    toPreview({files}) {
      window.open(files)
    },
    toCancelCollect({id}, index) {
      collectPamphlet({id}).then(res => {
        const item = this.list[index];
        item.is_collect = item.is_collect == 1 ? 0 : 1;
        this.list.splice(index, 1, item)

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
.p_collect_container {
  padding-bottom: 12px;
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

.limit_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  margin: 0 24px;

  ul {
    display: flex;

    li {
      height: 28px;
      padding: 0 10px;
      border-radius: 32px;
      background-color: #f5f5f5;
      font-size: 14px;
      font-weight: 400;
      color: #4e5969;

      &:nth-of-type(n + 2) {
        margin-left: 4px;
      }
    }
  }

  .input_box {
    display: flex;
    align-items: center;
    width: 240px;
    height: 32px;
    padding: 0 12px;
    border-radius: 2px;
    background-color: #f2f3f5;

    input {
      flex: 1;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      color: #4e5969;

      &::-webkit-input-placeholder {
        color: #86909c;
      }
    }

    i {
      font-size: 12px;
      color: #4e5969;
    }
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px 37px;
  padding: 0 24px;

  li {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 165px;
    cursor: pointer;
    overflow: hidden;

    .icon {
      width: 165px;
      height: 160px;
      border-radius: 4px;
      //background: #FAFAFA;
      background-size: 64px;
      background-repeat: no-repeat;
      background-position: center;
    }

    span {
      display: flex;
      justify-content: center;
      height: 56px;
      line-height: 19.6px;
      padding: 8px 20px;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }

    .add_created_btn {
      flex-direction: column;
      width: 165px;
      height: 160px;
      border-radius: 4px;
      background-color: #f7f7f7;

      i {
        font-weight: bold;
        font-size: 20px;
        color: #4e5969;
      }

      em {
        line-height: 20px;
        margin-top: 24px;
        font-size: 12px;
        font-weight: 400;
        color: #86909c;
      }
    }

    .dark {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 165px;
      height: 160px;
      background-color: rgba(0, 0, 0, .8);
      transform: translateY(-300px);
      transition: all .3s;

      .btn {
        color: #fff;

        &:nth-of-type(n + 2) {
          margin-top: 20px;
        }

        &:hover {
          font-weight: bold;
        }
      }
    }

    &:hover {
      .dark {
        transform: translateY(0);
      }
    }
  }
}

</style>
