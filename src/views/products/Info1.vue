<template>
  <div class="products_info_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.name == 'products_info'">
        <span @click.stop="toBack" class="like_breadcrumb_item">产品册</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>产品册资料</el-breadcrumb-item>
    </el-breadcrumb>
    <!--<div class="limit_box">
      <ul>
        &lt;!&ndash;<template v-for="(item, index) in typeList">&ndash;&gt;
        &lt;!&ndash;  <li @click.stop="typeChange(item, index)" :class="{hover: typeIndex == index}">{{item.name}}</li>&ndash;&gt;
        &lt;!&ndash;</template>&ndash;&gt;
      </ul>
      <label class="input_box">
        <input @keyup.enter="toSearch" v-model="limitData.search_word" type="text" placeholder="搜索">
        <span @click.stop="toSearch" class="search_btn"><i class="el-icon-search"></i></span>
      </label>
    </div>-->
    <template v-if="list.length >= 1">
      <ul class="list">
        <template v-for="(item, index) in list">
          <li>
            <div class="icon" :style="{backgroundImage: `url(${require('@/assets/images/icon_file.png')})`}"></div>
            <div v-if="item.is_new == 1"
                style="position: absolute;top: 40px;right: 0px; color: white; background-color: red;border-radius: 20px;"
               > <span style="display: inline-block;width: 50px;height: 25px;text-align: center;">new</span> </div>
            <span>{{ item.name }}</span>
            <div class="btns">
              <div @click.stop="toPrev(item)" class="btn perfect_center_bx">查看</div>
              <div @click.stop="toCollect(item, index)" class="btn perfect_center_bx" :class="{hover: item.is_collect == 1}">{{item.is_collect == 1 ? '已' : ''}}收藏</div>
            </div>
          </li>
        </template>
      </ul>
    </template>
    <template v-else><div class="not_data">暂无数据</div></template>
  </div>
</template>

<script>
import {collectPamphlet, pamphletFile, pamphletInfo, pamphletList, pamphletPage,readPamphletFile} from '@/api/api'
import {getScrollTippingPoint} from '@/utils/tools'

export default {
  name: "ProductsInfo",
  components: {},
  props: {},
  data() {
    return {
      id: 0,
      typeIndex: 0,
      typeList: [],
      list: [],
      limitData: {
        page: 1,
        row: 20,
        id: 0,
        search_word: '',
      },
      banner: [],
      isAll: false,
      isAjax: false
    }
  },
  watch: {},
  computed: {},
  created() {
    console.log('this.$route-->>', this.$route);
    const {id} = this.$route.params;
    this.limitData.id = id * 1;

    this.getList();
    this.getConfigData();

    window.addEventListener('scroll', this.getMore)
  },
  methods: {
    typeChange({id}, i) {
      this.typeIndex = i;

      this.limitData.id = id * 1;
      this.limitData.page = 1;
      this.isAll = false;
      this.getList();
    },
    getConfigData() {
      pamphletPage().then(res => {
        const {banner, brand_list} = res.data;

        this.typeList = brand_list.unshift({
          id: 0, name: '全部'
        });

        this.$store.dispatch('config/setBanner', banner)
      }).catch(err=>{
          console.log(err);
        })
    },
    getList() {
      const {list, isAjax, limitData: d} = this;

      if(isAjax) {
        return false;
      }

      this.isAjax = true;

      pamphletFile(d).then(res => {
        const l = res.data.data;

        this.list = (d.page <= 1 ? [] : list).concat(l);

        if(l.length <= 0) {
          this.limitData.page -= 1;
        }

        if(l.length < d.row) {
          this.isAll = true;
        }

        this.isAjax = false;
      }).catch(err=>{
          console.log(err);
        })
    },
    toSearch() {
      this.limitData.page = 1;
      this.isAll = false;
      this.getList();
    },
    toPrev(item) {
      let s = {
        id:item.id
      }
      readPamphletFile({id:item.id}).then(res => {
        // window.open(item.files)
        let url = `${window.location.origin}/#/pdf?url=${item.files}`
        window.open(url, '_blank');  
        // const route = '/pdf';  
  
  // 使用 window.open 方法打开新页面  
  // window.open(route, '_blank');
        // location.reload()
      }).catch(err=>{
          console.log(err);
        })
    },
    toCollect({id}, index) {
      collectPamphlet({id}).then(res => {
        const item = this.list[index];
        item.is_collect = item.is_collect == 1 ? 0 : 1;
        this.list.splice(index, 1, item)

        this.$message.success(res.msg);
      }).catch(res => {
        this.$message.error(res.msg);
      })
    },
    getMore() {
      if(!this.isAll && getScrollTippingPoint()) {
        this.limitData.page += 1;
        this.getList();
      }
    },
    toBack() {
      this.$router.back();
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
    position: relative;
    border-radius: 4px;
    overflow: hidden;

    .icon {
      //width: 197.79px;
      height: 194px;
      border-radius: 4px;
      //background: #FAFAFA;
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

    .btns {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 194px;
      background-color: rgba(0, 0, 0, .8);
      border-radius: 4px;
      transform: translateY(-200%);
      transition: all .3s;

      .btn {
        position: relative;
        line-height: 20.27px;
        padding: 16px 0;
        font-size: 14px;
        font-weight: 400;
        color: #fff;

        &:nth-of-type(n + 2) {
          &:before {
            top: 0;
            width: 8px;
            height: 1px;
            background-color: #949494;
          }
        }

        &:hover {
          font-weight: bold;
        }
      }
    }

    &:hover {
      .btns {
        transform: translateY(0);
      }
    }
  }
}

.like_breadcrumb_item {
  font-weight: 700;
  text-decoration: none;
  transition: color .2s cubic-bezier(.645,.045,.355,1);
  color: #303133;

  &:hover {
    color: #409EFF;
    cursor: pointer;
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
        height: 120px;
        background-size: 48px;
      }

      span {
        font-size: 12px;
        height: auto;
        line-height: 16px;
        padding: 4px 0;
      }

      .btns {
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        transform: translateY(0);
        height: auto;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 8px 0;

        .btn {
          padding: 8px 0;
          font-size: 12px;
        }
      }
    }
  }

  .like_breadcrumb_item {
    font-size: 12px;
  }
}

/* 超小屏手机 (<480px) 单列显示 */
@media screen and (max-width: 480px) {
  .list {
    grid-template-columns: 1fr;
  }
}
</style>
