<template>
  <div class="order_detail_container">
    <!-- ================= 个人信息 ================= -->
    <section class="my">
      <h2>个人信息</h2>
      <ul class="info_list">
        <li class="info_li">
          <h3>收货人信息</h3>
          <ul>
            <li><span>收货人：</span><em>{{ detail.name }}</em></li>
            <li><span>收货地址：</span><em>{{ detail.address }}</em></li>
            <li><span>手机号码：</span><em>{{ detail.phone }}</em></li>
          </ul>
        </li>

        <li class="info_li">
          <h3>收配送信息</h3>
          <ul>
            <li><span>配送方式：</span><em>{{ detail.distribution }}</em></li>
            <li><span>预计到货时间：</span><em>{{ detail.arrival_time }}</em></li>
            <li><span>物流信息：</span><em>{{ detail.tracking_num }}</em></li>
          </ul>
        </li>

        <li class="info_li">
          <h3>付款信息</h3>
          <ul>
            <li><span>付款方式：</span><em>{{ detail.pay_type }}</em></li>
            <li><span>付款时间：</span><em>{{ detail.pay_time }}</em></li>
          </ul>
        </li>
      </ul>
    </section>

    <!-- ================= 订单信息 ================= -->
    <section class="order">
      <h2>订单信息</h2>

      <div class="goods_list">
        <div
            v-for="(item, index) in detail.goods"
            :key="index"
            class="info"
        >
          <img :src="detail.goods_images[0]" alt="">

          <div class="info_text">
            <h3>{{ item.goods_name }}</h3>
            <span class="tip">{{ item.goods_spec_name }}</span>
            <ul>
              <li><span>商品编号：</span>{{ item.goods_sku }}</li>
              <li><span>商品价格：</span>￥{{ item.goods_price }}</li>
              <li><span>商品数量：</span>{{ item.quantity }}</li>
              <li><span>起订数量：</span>{{ item.order_num }}</li>
              <li><span>库存数量：</span>{{ item.stock }}</li>
            </ul>
          </div>

          <!-- 新增操作区 -->
          <div class="action_area">
            <div class="stepper">
              <span
                  class="btn"
                  :class="{ disabled: item.disabled || item.cart_qty <= item.order_num }"
                  @click="decrease(item)"
              >−</span>
              <span class="num">{{ item.cart_qty }}</span>
              <span
                  class="btn"
                  :class="{ disabled: item.disabled || item.cart_qty + item.order_num > item.stock }"
                  @click="increase(item)"
              >＋</span>
            </div>
            <div class="add_cart_btn" @click="addToCart(item)">加入购物车</div>
          </div>
        </div>
      </div>

      <div class="price">
        <span><em>商品总价：</em><em>￥{{ detail.total_price }}</em></span>
        <span><em>运费：</em><em>+￥0</em></span>
        <span><em>实付款：</em><em>￥{{ detail.total_price }}</em></span>
      </div>
    </section>
  </div>
</template>


<script>
import {orderInfo, addCart, shopPage} from '@/api/api'

export default {
  name: "OrderDetail",
  data() {
    return {
      id: 0,
      detail: {
        goods: [],
        goods_images: []
      }
    }
  },

  created() {
    this.id = this.$route.params.id
    this.getDetail()
  },

  methods: {
    getDetail() {
      orderInfo({id: this.id}).then(res => {
        const d = res.data
        d.goods_images = d.goods_images.split(',')

        // 初始化购物车数量
        d.goods.forEach(item => {
          const unit = item.order_num
          const stock = item.stock

          // 起订数量 > 库存 → 不可售
          if (unit > stock) {
            item.cart_qty = unit
            item.disabled = true
          } else {
            item.cart_qty = unit
            item.disabled = false
          }
        })

        this.detail = d
      })
    },

    increase(item) {
      if (item.disabled) return
      const unit = item.order_num
      const max = item.stock
      let next = item.cart_qty + unit
      // 保证是整数倍 & 不超过库存
      if (next > max) {
        next = Math.floor(max / unit) * unit
      }
      item.cart_qty = next
    },

    decrease(item) {
      if (item.disabled) return
      const unit = item.order_num
      const min = unit
      let next = item.cart_qty - unit
      if (next < min) {
        next = min
      }
      item.cart_qty = next
    },

    addToCart(item) {
      addCart({
        cart_data: [
          {
            goods_info_id: item.goods_info_id,
            goods_spec_id: item.goods_spec_id,
            quantity: item.cart_qty,
          }
        ]
      }).then(() => {
        return shopPage()
      }).then(res => {
            const cartNum = res.data.cart_num;
            // 通知全局刷新购物车数量
            this.$store.dispatch('config/setCartNum',cartNum);
            this.$message.success('已加入购物车')
            // 如果你有购物车角标
          }).catch(err => {
            this.$message.error(err.msg || '加入购物车失败')
          })
    }
  }
}
</script>


<style scoped lang="scss">
/* =========================
   基础容器
========================= */
.order_detail_container {
  max-width: 1200px;
  margin: 0 auto;
}

/* =========================
   通用 Section
========================= */
section {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;

  h2 {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 24px;
    background: #f0f0f0;
    font-size: 14px;
    font-weight: 500;
  }

  & + section {
    margin-top: 16px;
  }
}

/* =========================
   个人信息（PC）
========================= */
section.my {
  .info_list {
    display: flex;
  }

  .info_li {
    width: 33.33%;
    padding: 16px 0;

    h3 {
      padding-left: 24px;
      font-size: 14px;
      margin-bottom: 10px;
    }

    ul li {
      display: flex;
      margin-top: 10px;
      font-size: 14px;

      span {
        width: 120px;
        padding-left: 24px;
        font-weight: 500;
      }
    }

    & + .info_li {
      border-left: 1px solid #f2f2f2;
    }
  }
}

/* =========================
   商品列表（PC）
========================= */
section.order {
  .goods_list {

    .info {
      display: flex;
      padding: 24px;
      position: relative;

      img {
        width: 180px;
        height: 180px;
        object-fit: cover;
      }

      .info_text {
        flex: 1;
        padding-left: 32px;

        h3 {
          font-size: 16px;
          margin-bottom: 6px;
        }

        .tip {
          font-size: 14px;
          color: #666;
        }

        ul {
          margin-top: 16px;

          li {
            margin-top: 12px;
            font-size: 14px;

            span {
              font-weight: 500;
            }
          }
        }
      }

      .action_area {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;

        .stepper {
          display: flex;
          align-items: center;

          .btn {
            width: 26px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            border: 1px solid #ccc;
            font-size: 16px;
          }

          .btn.disabled {
            color: #ccc;
            border-color: #e5e5e5;
            cursor: not-allowed;
          }

          .num {
            width: 36px;
            text-align: center;
          }
        }

        .add_cart_btn {
          margin-top: 10px;
          padding: 6px 12px;
          background: #ff7d00;
          color: #fff;
          border-radius: 4px;
          font-size: 13px;
        }
      }

      & + .info {
        border-top: 1px dashed #ddd;
      }
    }
  }

  .price {
    padding: 16px 24px;
    text-align: right;

    span {
      display: block;
      margin-top: 6px;
      font-size: 14px;
    }

    span:last-child {
      font-size: 18px;
      color: #ff5733;
    }
  }
}

/* =================================================
   📱 Mobile 重构（<=768px）
================================================= */
@media screen and (max-width: 768px) {

  .order_detail_container {
    padding: 10px;
    background: #f5f5f5;
  }

  section {
    border-radius: 10px;

    h2 {
      height: 44px;
      font-size: 15px;
      padding-left: 14px;
    }
  }

  /* ========== 个人信息 → 卡片 ========== */
  section.my {
    .info_list {
      flex-direction: column;
    }

    .info_li {
      width: 100%;
      padding: 12px 14px;
      border-left: none !important;

      & + .info_li {
        border-top: 1px solid #f2f2f2;
      }

      h3 {
        padding-left: 0;
        font-size: 14px;
      }

      ul li {
        font-size: 13px;

        span {
          width: auto;
          padding-left: 0;
          color: #666;
        }
      }
    }
  }

  /* ========== 商品卡片 ========== */
  section.order {

    .goods_list {

      .info {
        flex-direction: row;
        padding: 12px;
        border-radius: 10px;
        background: #fff;

        img {
          width: 80px;
          height: 80px;
          border-radius: 6px;
        }

        .info_text {
          padding-left: 12px;

          h3 {
            font-size: 14px;
          }

          .tip {
            font-size: 12px;
            color: #86909c;
          }

          ul li {
            font-size: 12px;
            margin-top: 6px;
          }
        }

        /* 👇 操作区右下角 */
        .action_area {
          position: absolute;
          right: 12px;
          bottom: 12px;
          align-items: flex-end;

          .stepper {
            margin-bottom: 6px;
          }

          .add_cart_btn {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      }
    }

    .price {
      background: #fafafa;
      padding: 12px;
      font-size: 13px;

      span:last-child {
        font-size: 16px;
      }
    }
  }
}
</style>
