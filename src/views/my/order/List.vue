<template>
  <div class="order_list_container">
    <h1>我的订单</h1>
    <!--<div class="nav">
      <template v-for="(item, index) in navList">
        <div @click.stop="navChange(index)" class="nav_item" :class="{hover: navIndex == index}">{{ item.name }}</div>
      </template>
    </div>-->
    <div class="list_box">
      <el-table :data="tableData" style="width: 100%">
        <!--        <el-table-column prop="out_trade_no" label="订单编号" column-title="订单编号"></el-table-column>-->
        <el-table-column prop="goods_name" label="商品名称" column-title="商品名称"/>
        <el-table-column prop="total_price" label="价格" column-title="价格">
          <template slot-scope="{row}">
            ￥{{ row.total_price }}
          </template>
        </el-table-column>
        <el-table-column
            prop="createtime"
            label="创建时间"
            column-title="创建时间">
          <template slot-scope="{ row }">
            {{ $formatTime(row.createtime) }}
          </template>
        </el-table-column>
        <!--<el-table-column prop="status_text" label="物流状态">
          <template slot-scope="{row}">
            <span :class="['status' + row.status]">{{ row.status_text }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" column-title="操作">
          <template slot-scope="{row, $index}">
            <el-button
                @click="toDetail(row)"
                size="mini"
                type="text">详情
            </el-button>
            <el-button
                @click="toDelete(row, $index)"
                size="mini"
                style="color: #ff7d00;"
                type="text">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination @change="pageChange" :total="total"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import {delCart, delOrder, orderList} from '@/api/api'

export default {
  name: "OrderList",
  components: {Pagination},
  props: {},
  data() {
    return {
      navIndex: 0,
      navList: [
        {name: '全部订单'},
        {name: '等待付款'},
        {name: '等待收货'},
        {name: '已完成'},
        {name: '已取消'},
      ],
      page: 1,
      total: 0,
      tableData: []
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    navChange(i) {
      this.navIndex = i;
    },
    toDetail({id}) {
      this.$router.push('/my/order/detail/' + id)
    },
    toDelete({id}, i) {
      this.$confirm('是否确认删除此订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOrder({id}).then(res => {
          this.tableData.splice(i, 1)

          this.$message.success(res.msg);
        }).catch(res => {
          this.$message.error(res.msg);
        })
      }).catch(() => {

      });
    },
    pageChange(page) {
      this.page = page;
      this.getList();
    },
    getList() {
      const {page, row} = this;
      orderList({page, row}).then(res => {
        const {total, data} = res.data;
        this.tableData = data;
        this.total = total;
      }).catch(err => {
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
.order_list_container {
  min-height: 632px;
  background-color: #fff;
}

h1 {
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

.nav {
  display: flex;
  height: 46px;
  margin: 0 8px;
  padding-left: 24px;
  border-bottom: 1px solid #f2f2f2;

  .nav_item {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;

    &:nth-of-type(n + 2) {
      margin-left: 32px;
    }

    &:hover,
    &.hover {
      &:before {
        content: '';
        z-index: 1;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #d6363b;
      }
    }

    &.hover {
      color: #d6363b;
    }
  }
}

.list_box {
  margin: 18px 22px 0;
  padding-bottom: 24px;

  ::v-deep {
    .el-table__header-wrapper {
      thead {
        color: #000;
      }

      .el-table__cell {
        height: 44px;
        padding: 0;
        background-color: #f8f9fc;
      }
    }

    .el-table__body-wrapper {
      .el-table__cell {
        height: 72px;
        //padding: 0;
        //background-color: #f8f9fc;
      }

      .cell {
        color: #000;
      }
    }
  }
}

span {
  &.status0 {
    color: #43cf7c;
  }

  &.status1 {
    color: #ff7d00;
  }

  &.status2 {
    color: #ff5733;
  }
}

/* =========================
 📱 Mobile：订单列表卡片化（完整版）
========================= */
@media screen and (max-width: 768px) {

  /* 页面整体 */
  .order_list_container {
    padding: 10px;
    background: #f5f5f5;
  }

  h1 {
    height: 44px;
    padding-left: 12px;
    font-size: 16px;
  }

  .list_box {
    margin: 0;
  }

  /* =========================
     关键：彻底解除 table 语义
  ========================= */

  ::v-deep .el-table {
    background: transparent;
  }

  ::v-deep .el-table__header-wrapper {
    display: none !important; /* 隐藏表头 */
  }

  ::v-deep .el-table__body-wrapper {
    overflow-x: hidden !important;
  }

  ::v-deep .el-table__body-wrapper table {
    display: block;
    width: 100% !important;
  }

  ::v-deep .el-table__body-wrapper tbody {
    display: block;
  }

  ::v-deep .el-table__body-wrapper tr {
    display: block;
  }

  /* =========================
     卡片样式（每一单）
  ========================= */

  ::v-deep .el-table__row {
    display: block;
    margin-bottom: 16px;          /* 卡片间距 */
    padding: 14px 12px;           /* 卡片内边距 */
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  /* =========================
     单元格：上下结构
  ========================= */

  ::v-deep .el-table__row .el-table__cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 !important;
    border: none !important;
  }

  /* 字段名（左） */
  ::v-deep .el-table__row .el-table__cell::before {
    content: attr(column-title);
    font-size: 13px;
    color: #666;
    flex-shrink: 0;
  }

  /* 内容（右） */
  ::v-deep .el-table__row .cell {
    margin-left: 12px;
    text-align: right;
    font-size: 14px;
    color: #333;
    word-break: break-all;
  }

  /* =========================
     价格突出显示
  ========================= */

  ::v-deep .el-table__row .el-table__cell:nth-child(2) .cell {
    font-weight: 600;
    color: #d6363b;
    font-size: 15px;
  }

  /* =========================
     操作区（详情 / 删除）
  ========================= */

  ::v-deep .el-table__row .el-table__cell:last-child {
    justify-content: flex-end;
    padding-top: 12px !important;
  }

  ::v-deep .el-table__row .el-table__cell:last-child::before {
    content: ''; /* 操作区不显示字段名 */
  }

  ::v-deep .el-button--text {
    font-size: 14px;
    padding: 0;
  }

  ::v-deep .el-button--text + .el-button--text {
    margin-left: 16px;
  }

  /* =========================
     去掉 table 边框（如果有 border）
  ========================= */

  ::v-deep .el-table--border,
  ::v-deep .el-table--border::before,
  ::v-deep .el-table--border::after {
    border: none !important;
  }
}
</style>
