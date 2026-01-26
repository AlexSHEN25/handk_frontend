<template>
  <div class="products_info_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>产品册</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="limit_box">
      <ul>
        <template v-for="(item, index) in typeList">
          <li @click.stop="typeChange(item, index)" :class="{hover: typeIndex == index}">{{item.name}}</li>
        </template>
      </ul>
      <label class="input_box">
        <input @keyup.enter="toSearch" v-model="limitData.search_word" type="text" placeholder="搜索">
        <span @click.stop="toSearch" class="search_btn"><i class="el-icon-search"></i></span>
      </label>
    </div>
    <template v-if="list.length >= 1">
      <ul class="list">
        <template v-for="(item, index) in list">
          <li @click.stop="toInfo(item)">
            <div style="position: relative;" class="icon" :style="{backgroundImage: `url(${require('@/assets/images/icon_folder.png')})`}">
              <div v-if="item.is_new == 1"
                style="position: absolute;top: 40px;right: 0px; color: white; background-color: red;border-radius: 20px;"
               > <span style="display: inline-block;width: 50px;height: 25px;text-align: center;">new</span> </div>
            </div>
            <span>{{ item.name }}</span>
          </li>
        </template>
      </ul>
    </template>
    <template v-else><div class="not_data">暂无数据</div></template>
  </div>
</template>

<script>
import {pamphletList, pamphletPage} from '@/api/api'
import {getScrollTippingPoint} from '@/utils/tools'

export default {
  name: "ProductsList",
  components: {},
  props: {},
  data() {
    return {
      typeIndex: 0,
      typeList: [],
      list: [],
      limitData: {
        page: 1,
        row: 20,
        brand_id: 0,
        search_word: '',
      },
      banner: [],
      isAjax: false
    }
  },
  watch: {},
  computed: {},
  created() {
    const {id} = this.$route.params;
    this.limitData.brand_id = id || '';

    this.getList();
    this.getConfigData();

    window.addEventListener('scroll', this.getMore)
  },
  methods: {
    typeChange({id}, i) {
      this.typeIndex = i;

      this.limitData.brand_id = id;
      this.limitData.page = 1;
      this.getList();
    },
    getConfigData() {
      pamphletPage().then(res => {
        const {banner, brand_list} = res.data;

        brand_list.unshift({
          id: 0, name: '全部'
        });
        this.typeList = brand_list;

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    toSearch() {
      this.limitData.page = 1;
      this.getList();
    },
    getList() {
      const {list, isAjax, limitData: d} = this;

      if(isAjax) {
        return false;
      }

      this.isAjax = true;

      pamphletList(d).then(res => {
        const l = res.data.data;

        this.list = (d.page <= 1 ? [] : list).concat(l);

        if(l.length <= 0) {
          this.limitData.page -= 1;
        }

        this.isAjax = false;
      }).catch(err=>{
          console.log(err);
        })
    },
    getMore() {
      if(this.isAjax) {
        return false;
      }

      if(getScrollTippingPoint()) {
        this.limitData.page += 1;
        this.getList();
      }
    },
    toInfo({id}) {
      this.$router.push('/products_info/' + id)
    },
  },
  beforeMount() {

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.getMore)
  }
}
</script>

<style scoped lang="scss">
.products_info_container {
  width: 1200px;
  padding: 24px 0 48px;
  margin: 0 auto;
}

.limit_box {
  display: flex;
  justify-content: space-between;
  padding: 24px 0;

  ul {
    display: flex;
    align-items: center;

    li {
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;

      &:nth-of-type(n + 2) {
        margin-left: 40px;
      }

      &:hover,
      &.hover {
        color: #165dff;
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
  gap: 0 40px;
  margin-top: 24px;

  li {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .icon {
      width: 197.79px;
      height: 194px;
      border-radius: 4px;
      background-size: 64px;
      background-repeat: no-repeat;
      background-position: center;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 66px;
      line-height: 19.6px;
      font-size: 14px;
      font-weight: 500;
    }
  }
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .products_info_container {
    width: 100%;
    padding: 12px 8px 24px;
    margin: 0 auto;
  }

  .limit_box {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 0;

    ul {
      flex-wrap: wrap;

      li {
        font-size: 12px;
        margin: 0 8px 8px 0;
      }
    }

    .input_box {
      width: 100%;
      margin-top: 8px;

      input {
        font-size: 12px;
      }

      .search_btn {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .list {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 12px;

    li {
      .icon {
        width: 100%;
        height: 120px;
        background-size: 48px;
      }

      span {
        font-size: 12px;
        height: auto;
        line-height: 16px;
        padding: 4px 0;
      }
    }
  }
}

/* 超小屏手机 (<480px) 单列显示 */
@media screen and (max-width: 480px) {
  .list {
    grid-template-columns: 1fr;
  }

  .limit_box ul {
    li {
      font-size: 11px;
      margin: 0 6px 6px 0;
    }
  }

  .limit_box .input_box input {
    font-size: 11px;
  }
}
</style>
