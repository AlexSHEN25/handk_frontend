<template>
  <div v-loading="loading" class="store_list_container">
    <div class="limit_box">
      <ul>
        <template v-for="(item, index) in typeSubList">
          <li @click.stop="selectType(item, index)" :key="item.id" class="btn" :class="{hover: typeSubIndex == index}">{{ item.name }}</li>
        </template>
      </ul>
      <label class="input_box">
        <input v-model="search_word" @keyup.enter="getList" type="text" placeholder="搜索">
        <i class="el-icon-search" @click="getList"></i>
      </label>
    </div>
    <div class="section_list">
      <template v-for="(item, index) in list">
        <section :key="item.id">
          <h2>{{ item.name }}</h2>
          <template v-if="item.goods.length >= 1">
            <ul>
              <template v-for="(v, j) in item.goods">
                <li @click.stop="toDetail(v)" :key="v.id">
                  <img :src="v.images[0]" alt="">
                  <div v-if="v.is_new==1" class="new_tag">new</div>
                  <span>{{ v.name }}</span>
<!--                <span style="position: relative;">{{ v.name }}-->
                  <!-- is_new -->
<!--                  <div v-if="v.is_new==1"-->
<!--                style="position: absolute;text-align: center;line-height: -5px; top: 10px;left: 0px; color: white;width: 60px;height: 25  px;background-color: red;border-radius: 20px;"-->
<!--               > <span style="display: inline-block;height: 25px;">new</span> </div>-->
<!--                  <div v-if="v.is_new==1" class="new_tag">new</div>-->
<!--                </span>-->
                </li>
              </template>
            </ul>
          </template>
          <template v-else><div class="not_data">暂无数据</div></template>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import {goodsList} from '@/api/api'

export default {
  name: "StoreList",
  components: {},
  props: {
    typeData: {
      type: Object,
      default: () => ({}),
    },
    typeSubList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      loading: false,
      typeList: [],
      typeSubIndex: 0,
      list: [],
      goods_type_id: 0,
      search_word: '',
      brand_id: '',
    }
  },
  watch: {
    typeData: {
      deep: true,
      immediate: true,
      handler({id}) {
        this.goods_type_id = id;
        this.getList();
      },
    }
  },
  computed: {

  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const {search_word, brand_id, goods_type_id} = this;

      this.loading = true;

      goodsList({search_word, brand_id, goods_type_id}).then(res => {
        this.loading = false;

        const d = res.data;
        this.list = d;

        const totalLength = d.reduce((p, n) => {
          return p + n.goods.length;
        }, 0)

        if(d.length <= 0 || totalLength <= 0) {
          this.$message.warning('暂无数据')
        }
      }).catch(res => {
        this.loading = false;
        this.$message.warning(res.msg)
      })
    },
    selectType({id}, index) {
      this.typeSubIndex = index;
      // this.goods_type_id = id;
      this.brand_id = id;
      this.getList()
    },
    toDetail({id}) {
      this.$router.push({name: 'store_detail', params: {id}})
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.limit_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 44px;
  margin: 20px auto 0;

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

      &.hover {
        background-color: #ff7d00;
        color: #fff;
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

    .input_box {
      i {
        cursor: pointer;

        &:active {
          opacity: 0.7;
        }
      }
    }

    i {
      font-size: 12px;
      color: #4e5969;
    }
  }
}

.section_list {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 40px;

  section {
    margin-top: 16px;

    h2 {
      line-height: 28px;
      font-size: 26px;
      font-weight: 400;
      text-align: center;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0 16.2px;
      margin-top: 60px;

      li {
        position: relative;     /* 必须加！避免绝对定位覆盖整个 li */
        display: flex;
        flex-direction: column;
        width: 287.8px;
        cursor: pointer;

        img {
          width: 287.8px;
          height: 283px;
          border-radius: 4px;
        }

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 70px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
}

::v-deep {
  .el-image {
    //border: 1px solid #f5f5f5;
  }
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .store_list_container {
    padding: 0 10px;
  }

  .limit_box {
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    padding: 10px 0;
    margin: 0 auto;
    position: relative;
    z-index: 10;

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      li {
        height: 26px;
        padding: 0 10px;
        border-radius: 20px;
        font-size: 12px;
      }
    }

    .input_box {
      width: 100%;
      margin-top: 10px;
      height: 32px;

      input {
        font-size: 14px;
      }
    }
  }

  /* 商品列表适配 */
  .section_list {
    width: 100%;
    padding-bottom: 30px;
    position: relative;
    z-index: 1;
    
    section {
      margin-top: 20px;

      h2 {
        font-size: 20px;
      }

      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;

        li {
          width: 100%;
          background-color: #fff;
          position: relative;

          img {
            width: 100%;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            border-radius: 6px;
          }

          span {
            display: block;
            width: 100%;
            margin-top: 6px;
            font-size: 14px;
            text-align: center;
            line-height: 18px;
            word-break: break-word; /* 关键：长商品名不会破版 */
          }

          /* NEW 标签适配 */
          .new_tag {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 10;      /* 必须有，否则会和 span 互相遮挡 */
            width: 48px;
            height: 20px;
            border-radius: 12px;
            background-color: red;
            color: #fff;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none; /* 关键：NEW 不阻止下方点击 */
          }
        }
      }
    }
  }
}

/* 超小屏手机单列显示 */
@media screen and (max-width: 480px) {
  .section_list section ul {
    grid-template-columns: 1fr;
  }
}
</style>
