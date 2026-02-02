<template>
  <div class="store_detail_container">
    <div class="breadcrumb_box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'store' }">H&K商城</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1>{{ name }}</h1>
    <div class="section_list">
      <template v-for="(item, index) in list">
        <section>
          <div class="images">
            <img :src="item.large_image" alt="" class="large_image">
            <div class="img_list">
              <div class="img_move" :style="{width: ((90 + 24) * item.images.length - 24) + 'px'}">
                <template v-for="(img, j) in item.images">
                  <img @click.stop="setLargeImage(item, img)" :src="img" alt="">
                </template>
              </div>
            </div>
          </div>
          <div class="sku_box">
            <p>{{ item.name }}</p>
            <el-table
                @selection-change="l => {handleSelectionChange(index, l)}"
                :data="item.goods_spec"
                height="404"
                border
                stripe
                style="width: 100%">

              <!-- 选择框：固定 -->
              <el-table-column
                  type="selection"
                  width="40"
                  fixed="left"
                  :selectable="rowSelectable">
              </el-table-column>

              <!-- 品名：固定 -->
              <el-table-column
                  prop="name"
                  label="品名"
                  width="180"
                  fixed="left">
              </el-table-column>

              <!-- 以下列允许横向滚动 -->
              <el-table-column prop="order_num" label="起订单位"></el-table-column>

              <el-table-column prop="stock" label="库存数量">
                <template slot-scope="{row}">
                  <template v-if="row.stock >= 1">{{ row.stock }}</template>
                  <div v-else class="not_in_stock">暂无库存</div>
                </template>
              </el-table-column>

              <el-table-column prop="price" label="零售价">
                <template slot-scope="{row}">
                  <span class="price">{{ (row.price * 1).toFixed(1) }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="discount_price" label="折扣价" width="90">
                <template slot-scope="{row}">
                  <span class="discount_price">{{ row.discount_price | trimeDecimalPoint }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="choose_num" label="订单数量" width="125">
                <template slot-scope="{ row }">
                  <el-input-number
                      v-model="row.choose_num"
                      size="mini"
                      :min="0"
                      :max="row.stock"
                      :step="row.order_num"
                      :step-strictly="true"
                      :controls="true"
                      :editable="false"
                      :disabled="row.stock <= 0"
                      @change="val => normalizeChooseNum(row, val)"
                      style="width: 100px;"
                      @keydown.native.prevent
                  />
                </template>
              </el-table-column>
            </el-table>
             <div class="btns">
              <div @click.stop="resetNum(item, index)" class="btn reset_btn">重置</div>
              <div @click.stop="add2cart(item, index)" class="btn add2cart">加入购物车</div>
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'

import {addCart, goodsInfo,shopPage} from '@/api/api'

export default {
  name: "StoreDetail",
  components: {},
  props: {},
  data() {
    return {
      tableData: new Array(10).fill({
        name: '王小虎',
        unit: 5,
        inventory: 20,
        price: 580,
        order_num: 3,
        scheduled_num: 0
      },),
      id: 0,
      name: '',
      list: [],
      multipleSelection: [],
    }
  },
  watch: {},
  computed: {},
  filters: {
    trimeDecimalPoint(num) {
      return (num * 1).toFixed(1)
    },
  },
  created() {
    const {id} = this.$route.params;
    this.id = id;

    this.getDetail();
  },
  methods: {
    rowSelectable(row) {
      return row.stock >= row.order_num
    },
    handleSelectionChange(i, l) {
      this.multipleSelection.splice(i, 1, l)
    },
    getDetail() {
      const {id} = this;

      goodsInfo({id}).then(res => {
        const {list, id, name} = res.data;
        this.list = list.map((item, index) => {
          item.large_image = item.images[0];
          item.goods_spec = this.resetNum(item, index)
          return item;
        });
        this.multipleSelection = new Array(list.length).fill([])
        this.name = name;
      }).catch(err => {
        console.log(err);
      })
    },
    setLargeImage(item, img) {
      item.large_image = img;
    },
    resetNum(item, index) {
      item.goods_spec = item.goods_spec.map(g => {
        g.choose_num = 0;
        return g;
      });
      return item.goods_spec;
    },
    normalizeChooseNum(row, val) {
      const step = row.order_num || 1
      const stock = row.stock || 0
      if (!val || val <= 0) {
        row.choose_num = 0
        return
      }
      // 强制倍数
      let normalized = Math.floor(val / step) * step
      // 不超过库存
      if (normalized > stock) {
        normalized = Math.floor(stock / step) * step
      }
      row.choose_num = normalized
    },
    add2cart({ goods_spec }, index) {
      const list = this.multipleSelection[index] || [];

      if (list.length <= 0) {
        this.$message.error('请至少勾选一个商品')
        return false;
      }

      // ===== 新增库存 & 起订量校验 =====
      for (let item of list) {
        const stock = item.stock || 0
        const unit = item.order_num || 1
        const qty = item.choose_num || 0

        // 库存小于起订量
        if (stock < unit) {
          this.$message.error(`【${item.name}】库存不足，小于起订数量`)
          return false
        }

        // 未填写数量
        if (qty <= 0) {
          this.$message.error(`【${item.name}】请选择订单数量`)
          return false
        }

        // 数量小于起订量
        if (qty < unit) {
          this.$message.error(`【${item.name}】起订数量为 ${unit}`)
          return false
        }

        // 数量超过库存
        if (qty > stock) {
          this.$message.error(`【${item.name}】超过库存数量`)
          return false
        }
      }

      const d = cloneDeep(list).map(v => ({
        goods_info_id: v.goods_info_id,
        goods_spec_id: v.id,
        quantity: v.choose_num,
      }))

      addCart({ cart_data: d }).then(() => {
        return shopPage()
      }).then(res => {
        const cartNum = res.data.cart_num
        this.$store.dispatch('config/setCartNum', cartNum)
        this.$message.success(res.msg)
      }).catch(res => {
        this.$message.error(res.msg)
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
.store_detail_container {
  padding: 20px 12px 40px;

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 108px;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    word-break: break-word;
  }

  .breadcrumb_box {
    display: flex;
    align-items: center;
    width: 1200px;
    max-width: 100%;
    height: 80px;
    margin: 0 auto;
    padding: 0 12px;
  }

  .section_list {
    width: 1200px;
    max-width: 100%;
    margin: 0 auto;

    section {
      display: flex;
      flex-wrap: wrap; // 手机端换行
      margin-bottom: 60px;

      .images {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 372px;
        max-width: 100%;
        height: 540px;

        .large_image {
          width: 372px;
          max-width: 100%;
          height: 372px;
          object-fit: contain;
        }

        .img_list {
          width: 372px;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;

          .img_move {
            display: flex;
          }

          img {
            width: 90px;
            height: 90px;
            object-fit: cover;

            &:nth-of-type(n + 2) {
              margin-left: 24px;
            }
          }
        }
      }

      .sku_box {
        flex: 1;
        padding-left: 60px;
        max-width: calc(100% - 372px);
        margin-top: 20px;

        p {
          line-height: 32px;
          margin-bottom: 8px;
          font-size: 16px;
          font-weight: 500;
        }

        .btns {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;

          .reset_btn {
            width: 60px;
            height: 38px;
            opacity: 1;
            border-radius: 2px;
            background-color: #f5f5f5;
            font-size: 14px;
            font-weight: 400;
          }

          .add2cart {
            width: 102px;
            height: 38px;
            margin-left: 18px;
            border-radius: 2px;
            background-color: #ff7d00;
            font-size: 14px;
            font-weight: 400;
            color: #fff;
          }
        }
      }
    }
  }

  .price {
    font-size: 14px;
  }

  .discount_price {
    font-size: 16px;
    font-weight: bold;
  }

  .not_in_stock {
    font-size: 14px;
    font-weight: 500;
    line-height: 19.6px;
    color: rgba(255, 125, 0, 1);
  }
}

::v-deep {
  .el-checkbox__inner {
    border-color: #000;
  }
}

/* ================= 手机端适配 ================= */
@media screen and (max-width: 768px) {
  .store_detail_container {
    padding: 12px;

    h1 {
      height: auto;
      font-size: 20px;
      padding: 0 8px;
      margin-bottom: 12px;
    }

    .breadcrumb_box {
      height: auto;
      padding: 0 4px;
      font-size: 12px;
    }

    .section_list {
      section {
        flex-direction: column;
        margin-bottom: 40px;

        /* 图片区域 */
        .images {
          width: 100%;
          height: auto;

          .large_image {
            width: 100%;
            height: auto;
          }

          .img_list {
            width: 100%;
            overflow-x: auto;

            img {
              width: 70px;
              height: 70px;

              &:nth-of-type(n + 2) {
                margin-left: 12px;
              }
            }
          }
        }

        /* SKU 区域 */
        .sku_box {
          width: 100%;
          max-width: 100%;
          padding-left: 0;
          margin-top: 24px;

          p {
            font-size: 15px;
          }

          /* 表格横向滚动 */
          .el-table {
            display: block;
            width: 100%;
            font-size: 12px;
          }

          /* ===== 横向滚动条加粗 + 高可见 ===== */
          ::v-deep .el-table__body-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;

            &::-webkit-scrollbar {
              height: 8px;
            }

            &::-webkit-scrollbar-track {
              background: #f0f0f0;
              border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 4px;
            }

            /* 滑动提示动画 */
            animation: table-hint 4.5s cubic-bezier(0.22, 0.61, 0.36, 1) 3s 1 forwards;

          }

          /* 表格单元格压缩 */
          ::v-deep .el-table th,
          ::v-deep .el-table td {
            padding: 6px 4px;
          }

          /* 固定列宽度压缩 */
          ::v-deep .el-table__fixed-left .el-table-column--selection {
            width: 32px !important;
            min-width: 32px !important;
          }

          ::v-deep .el-table__fixed-left th:nth-child(2),
          ::v-deep .el-table__fixed-left td:nth-child(2) {
            width: 120px !important;
            min-width: 120px !important;
          }

          .price {
            font-size: 12px;
          }

          .discount_price {
            font-size: 13px;
          }

          .not_in_stock {
            font-size: 12px;
          }

          .btns {
            margin-top: 24px;
            display: flex;
            justify-content: space-between;

            .add2cart,
            .reset_btn {
              width: 48%;
              height: 40px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

/* ===== 表格可滑动提示动画 ===== */
@keyframes table-hint {
  0% {
    transform: translateX(0);
  }

  /* 第一次向右 */
  18% {
    transform: translateX(-30px);
  }
  32% {
    transform: translateX(0);
  }

  /* 第二次向右 */
  50% {
    transform: translateX(-30px);
  }
  64% {
    transform: translateX(0);
  }

  /* 第三次向右 */
  82% {
    transform: translateX(-30px);
  }

  /* 回到初始并停住 */
  100% {
    transform: translateX(0);
  }
}
</style>
