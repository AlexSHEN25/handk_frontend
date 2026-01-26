<template>
  <div class="cart_container">
    <div class="inset">
      <div class="breadcrumb_box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'store' }">H&K商城</el-breadcrumb-item>
          <el-breadcrumb-item>购物车</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <ul class="step_list">
        <li :class="{hover: step == 0}"><em>1</em><span>选择商品</span></li>
        <li :class="{hover: step == 1}"><em>2</em><span>确认订单信息</span></li>
        <li :class="{hover: step == 2}"><em>3</em><span>成功提交订单</span></li>
      </ul>
      <template v-if="step == 0">
        <div v-if="list.length >= 1 && (list.length >= 1 && list[0].goods.length >= 1)" class="like_table"
             style="margin-top: 24px;">
          <div class="thead">
            <div class="th">
              <el-checkbox @change="checkedAllChange" v-model="checkedAll">全选</el-checkbox>
            </div>
            <div class="th">商品</div>
            <div class="th">起订数量</div>
            <div class="th">单价</div>
            <div class="th">订单数量</div>
            <!--            <div class="th">预定数量</div>-->
            <div class="th">总计</div>
            <div class="th">操作</div>
          </div>
          <div class="tbody">
            <template v-for="(item, index) in list">
              <div class="tr" :key="item.goods_info_id">
                <div class="select_store_all">
                  <el-checkbox @change="checkedItemChange(item)" v-model="item.checked">{{
                      item.goods_name
                    }}
                  </el-checkbox>
                </div>
                <ul>
                  <template v-for="(g, j) in item.goods">
                    <li class="perfect_center_bx" :key="g.goods_info_id">
                      <div class="td">
                        <el-checkbox @change="checkedChange(item, g, index, j)" v-model="g.checked"></el-checkbox>
                        <img :src="g.images[0]" alt="">
                      </div>
                      <div class="td" data-label="商品">
                        <span>{{ g.name }}</span>
                        <!--<em>FG-68</em>-->
                      </div>
                      <div class="td" data-label="起订数量">
                        <span>{{ g.order_num }}</span>
                        <!--<em>FG-68</em>-->
                      </div>
                      <div class="td" data-label="单价">￥{{ g.price }}</div>
                      <div class="td" data-label="订单数量">
                        <el-input-number
                            v-model="g.quantity"
                            :min="g.order_num"
                            :max="g.stock"
                            :step="g.order_num"
                            :controls="true"
                            @keydown.native.prevent
                            @paste.native.prevent
                            @change="numChange(item, g, index, j)"/>
                      </div>
                      <div class="td" data-label="总计">￥{{ g.quantity * g.price }}</div>
                      <div class="td" data-label="操作">
                        <div @click.stop="toDel(item, g, index, j)" class="btn">删除商品</div>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </template>
          </div>
          <div class="tfooter">
            <span>已选<em>{{ checkedNum }}</em>件商品</span>
            <span>订单总计：<i>￥{{ checkedPrice }}</i></span>
            <div @click.stop="confirmOrder" class="btn">确认订单</div>
          </div>
        </div>
        <template v-else>
          <div class="not_data">暂无数据</div>
        </template>
      </template>
      <template v-else-if="step == 1">
        <div class="addressee_form">
          <h3>收件人信息</h3>
          <ul v-if="isEditAddress">
            <li>
              <span class="title"><em>*</em>收件人：</span>
              <div class="content">
                <div class="input_box"><input v-model="submitData.name" type="text" placeholder="25字以内"></div>
              </div>
            </li>
            <li>
              <span class="title"><em>*</em>收货地址：</span>
              <div class="content">
                <SelectAddress @change="addressChange" :value="orderInfo.user_address.area"></SelectAddress>
              </div>
            </li>
            <li>
              <span class="title"><em>*</em>详细地址：</span>
              <div class="content" style="width: 386px;">
                <div class="input_box"><input v-model="submitData.address" type="text" placeholder="请填写详细地址">
                </div>
              </div>
            </li>
            <li>
              <span class="title">邮政编码：</span>
              <div class="content">
                <div class="input_box"><input v-model="submitData.postal_code" type="text" placeholder=""></div>
              </div>
            </li>
            <li>
              <span class="title"><em>*</em>手机号码：</span>
              <div class="content">
                <div class="input_box"><input v-model="submitData.phone" type="text" placeholder="请输入手机号码"></div>
              </div>
            </li>
            <li>
              <span class="title"></span>
              <div class="content">
                <el-checkbox v-model="setDefaultAddress">设为默认地址</el-checkbox>
              </div>
            </li>
            <li>
              <span class="title"></span>
              <div class="content">
                <div @click.stop="toSaveAddress" class="btn">保存收货地址</div>
              </div>
            </li>
          </ul>
          <div v-else class="address_list">
            <div class="address_info">
              <em class="flag">默认地址</em>
              <p>{{ orderInfo.user_address.name }}（收）</p>
              <span>{{ orderInfo.user_address.area }}</span>
              <span>{{ orderInfo.user_address.address }}</span>
              <span>{{ orderInfo.user_address.phone }}</span>
              <div class="corner_labels">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="delivery_method">
          <h3>送货方式</h3>
          <ul>
            <li>
              <el-radio v-model="distribution" label="默认运输">默认运输</el-radio>
            </li>
            <li>
              <el-radio v-model="distribution" :label="remarkInfo">
                <input v-model="remarkInfo" type="text" placeholder="请输入备注信息">
              </el-radio>
            </li>
          </ul>
        </div>
        <div class="table_title">商品信息</div>
        <div class="like_table">
          <div class="thead">
            <div class="th"></div>
            <div class="th">商品</div>
            <div class="th">单价</div>
            <div class="th">订单数量</div>
            <!--            <div class="th">预定数量</div>-->
            <div class="th">总计</div>
          </div>
          <div class="tbody">
            <template v-for="(item, index) in orderInfo.goods_info">
              <div class="tr">
                <div class="select_store_all">{{ item.goods_name }}</div>
                <ul>
                  <template v-for="(g, j) in item.goods">
                    <li class="perfect_center_bx">
                      <div class="td">
                        <img style="margin: 0;" :src="g.images[0]" alt="">
                      </div>
                      <div class="td">
                        <span>{{ g.name }}</span>
                        <!--<em>FG-68</em>-->
                      </div>
                      <div class="td">￥{{ g.price }}</div>
                      <div class="td">
                        <el-input-number v-model="g.quantity" :disabled="true" :min="1"
                                         :max="g.stock"></el-input-number>
                      </div>
                      <div class="td">￥{{ g.total_price }}</div>
                    </li>
                  </template>
                </ul>
              </div>
            </template>
          </div>
        </div>
        <div class="link_table_footer">
          <span class="price">订单总计：<em>￥{{ checkedPrice }}</em></span>
          <p>
            <em>寄送至：{{ orderInfo.user_address.name }}，{{ orderInfo.user_address.area }}
              {{ orderInfo.user_address.address }}，{{ orderInfo.user_address.phone }}</em>
            <span @click.stop="toEditAddress" class="btn">修改</span>
          </p>
          <div @click.stop="toSubmitOrder" class="btn submit_btn">提交订单</div>
        </div>
      </template>
      <template v-else-if="step == 2">
        <div class="status_page">
          <div class="status_icon">
            <i class="el-icon-check"></i>
          </div>
          <p class="status_title">提交成功</p>
          <div class="tips">您已提交成功，请下载订单表格并联系相应销售人员进行确认！</div>
          <div class="btns">
            <div @click.stop="toDownloadOrder" class="btn download_order">下载订单</div>
            <div @click.stop="toBackStore" class="btn back2store">返回商城</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'

import SelectAddress from '@/components/SelectAddress/index.vue'
import {cartList, delCart, downloadOrder, editCart, manageAddress, submitOrder, submitPage} from '@/api/api'
import {validateMobile} from '@/utils/validate'
import {ORDER_EXPORT, proxy} from '@/api/config'
import {downloadFile} from '@/utils/tools'
import {getLocal} from '@/utils/auth'

export default {
  name: "Cart",
  components: {SelectAddress},
  props: {},
  data() {
    return {
      step: 0,
      checkedAll: false,
      radio: false,
      num: 0,
      list: [],
      checkedList: [],
      orderInfo: {
        goods_info: [],
        user_address: {}
      },
      distribution: '默认运输',
      remarkInfo: '',
      setDefaultAddress: false,
      submitData: {
        name: '',
        area: '',
        address: '',
        postal_code: '',
        phone: '',
      },
      isEditAddress: false,
      isTop: false,
      timer: null,
      orderList: []
    }
  },
  watch: {
    list: {
      deep: true,
      immediate: true,
      handler(l) {
        this.checkedList = cloneDeep(l).map(item => {
          return item.goods.filter(g => g.checked);
        }).filter(item => item.length >= 1).flat(Infinity);
      },
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    checkedPrice({checkedList}) {
      return checkedList.reduce((p, n) => {
        return p + n.quantity * n.price
      }, 0)
    },
    checkedNum({checkedList}) {
      return checkedList.reduce((p, n) => {
        return p + n.quantity
      }, 0)
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      cartList().then(res => {
        this.list = res.data.filter(item => item.goods.length >= 1).map((item, index) => {
          item.checked = false;
          item.goods = item.goods.map((g, j) => {
            g.checked = false;
            return g;
          })
          return item;
        });
      }).catch(err => {
        console.log(err);
      })
    },
    numChange(item, g, index, j) {
      const unit = g.order_num       // 起订数量 = 步长
      const stock = g.stock          // 库存

      // 起订数量 > 库存：直接锁死
      if (unit > stock) {
        g.quantity = stock
        this.$message.warning('起订数量大于库存，无法修改')
        return
      }

      // 最大合法数量（库存允许的最大整数倍）
      const max = Math.floor(stock / unit) * unit
      const min = unit

      // 强制修正为整数倍
      let next = Math.floor(g.quantity / unit) * unit

      if (next < min) next = min
      if (next > max) next = max

      // 如果发生修正，回写
      if (next === g.quantity) {
        editCart({id: g.id, quantity: g.quantity})
        return
      }
      g.quantity = next
      this.$nextTick(() => {
        editCart({id: g.id, quantity: g.quantity})
      })
      // 同步后端
      editCart({
        id: g.id,
        quantity: g.quantity
      }).catch(() => {
        this.$message.error('数量更新失败')
      })
    },
    checkedChange(item, g, index, j) {
      const gFilter = cloneDeep(item.goods).filter(g => g.checked)
      item.checked = gFilter.length == item.goods.length;

      const itemFilter = cloneDeep(this.list).filter(v => v.checked)
      this.checkedAll = itemFilter.length == this.list.length;
    },
    checkedItemChange(item) {
      const itemFilter = cloneDeep(this.list).filter(v => v.checked)
      this.checkedAll = itemFilter.length == this.list.length;

      item.goods = item.goods.map((g, j) => {
        g.checked = item.checked;
        return g;
      })
    },
    checkedAllChange(flag) {
      this.list = this.list.map((item, index) => {
        item.checked = flag;
        item.goods = item.goods.map((g, j) => {
          g.checked = flag;
          return g;
        })
        return item;
      });
    },
    toDel(item, {id}, index, j) {
      this.$confirm('是否确认删除此商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'mobile-delete-confirm',
        center: true,
        distinguishCancelAndClose: true
      }).then(() => {
        delCart({id}).then(res => {
          item.goods.splice(j, 1)
          this.list = this.list.filter(item => item.goods.length >= 1)

          this.$message.success(res.msg);
        }).catch(res => {
          this.$message.error(res.msg);
        })
      }).catch(() => {

      });
    },
    confirmOrder() {
      const {checkedNum, checkedList: l} = this;

      if (checkedNum <= 0) {
        this.$message.error('请至少选择一件商品')
        return false;
      }

      const ids = l.map(item => item.id).join(',')

      submitPage({ids}).then(res => {
        const d = res.data;

        this.step = 1;
        d.user_address = d.user_address || {};
        this.orderInfo = d;

        this.isEditAddress = !d.user_address.name;
        this.$message.success(res.msg)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    addressChange({p, c, a}) {
      this.submitData.area = [p, c, a].join('/')
    },
    toSaveAddress() {
      const {submitData: d} = this;

      let msg = '';
      switch (true) {
        case d.name == '':
          msg = '收件人不能为空';
          break;
        case d.area == '':
          msg = '请先选择收货地址';
          break;
        case d.address == '':
          msg = '详细地址不能为空';
          break;
          // case d.postal_code == '':
          // 	msg = '邮政编码不能为空';
          // 	break;
        case d.phone == '':
          msg = '手机号码不能为空';
          break;
        case !validateMobile(d.phone):
          msg = '手机号码格式错误';
          break;
      }
      if (!!msg) {
        this.$message.error(msg);
        return false;
      }

      manageAddress(d).then(res => {
        this.orderInfo.user_address = d;
        this.isEditAddress = false;

        this.$message.success(res.msg);
      }).catch(err => {
        console.log(err);
      })
    },
    toEditAddress() {
      const {name, area, address, phone, postal_code} = this.orderInfo.user_address;
      this.submitData = {name, area, address, phone, postal_code}

      this.isEditAddress = true;
      this.toTop();
    },
    toTop() {
      //设置定时器
      this.timer = setInterval(() => {
        //获取滚动条距离顶部高度
        const osTop = document.documentElement.scrollTop || document.body.scrollTop;
        const ispeed = Math.floor(-osTop / 7);

        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          clearInterval(this.timer);
        }
        ;
        this.isTop = true;

      }, 30);
    },
    toSubmitOrder() {
      const {distribution, checkedList: l} = this;

      const ids = l.map(item => item.id).join(',')

      submitOrder({distribution, ids}).then(res => {
        this.orderList = res.data;
        this.$message.success(res.msg)
        // this.$router.push({name: 'order_list'})

        this.step = 2;
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    toDownloadOrder() {
      const {orderList: l, userInfo: {token, nickname}} = this;
      const ids = l.map(item => item.id).join(',');

      axios({
        url: ORDER_EXPORT + '?ids=' + ids,
        method: "get",
        responseType: "blob",
        // data: {ids: '24'},
        timeout: 600000,
        withCredentials: true,
        headers: {token}
      }).then((data) => {
        if (data.data.type == "application/json") {
          this.$message.error(data.data);
        } else {
          const blob = new Blob([data.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
          const url = window.URL.createObjectURL(blob);

          const filename = `${nickname}(${new Date().toLocaleString().replace(/\//g, '-')})`;
          downloadFile(url, filename)
        }
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    toBackStore() {
      this.$router.replace({name: 'store_list'})
    },
  },
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.cart_container {
  flex: 1;
  padding-bottom: 42px;
  background-color: #f5f5f5;
}

.inset {
  width: 1200px;
  margin: 0 auto;
}

.breadcrumb_box {
  display: flex;
  align-items: center;
  width: 1200px;
  height: 80px;
  margin: 0 auto;
}

.step_list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #fff;

  li {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;

    em {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #f2f3f5;
      color: #4e5969;
    }

    span {
      margin-left: 8px;
      color: #4e5969;
    }

    &:nth-of-type(n + 2) {
      margin-left: 100px;
    }

    &.hover {
      em {
        background-color: #1d2129;
        color: #fff;
      }

      span {
        color: #000;
      }
    }
  }
}

.like_table {
  .thead {
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #1d2129;
    font-size: 16px;
    font-weight: 400;
    color: #fff;

    .th {
      width: 160px;

      &:nth-of-type(1) {
        width: 253px;
        padding-left: 48px;
      }

      &:nth-of-type(2) {
        flex: 1;
      }

      &:nth-of-type(n + 3) {
        width: 130px;
        margin-left: 40px;
        text-align: center;
      }

      ::v-deep {
        .el-checkbox__label {
          color: #fff;
        }
      }
    }
  }

  .tbody {
    background-color: #fff;

    .tr {
      .select_store_all {
        display: flex;
        align-items: center;
        height: 72px;
        padding-left: 48px;
      }

      ul {
        li {
          display: flex;
          align-items: center;
          position: relative;
          height: 136px;

          .td {
            display: flex;
            align-items: flex-start;
            width: 160px;

            img {
              width: 88px;
              height: 88px;
              margin-left: 27px;
            }

            .btn {
              width: 100px;
              height: 50px;
              color: #f00;

              &:hover {
                font-weight: bold;
              }
            }

            &:nth-of-type(1) {
              width: 253px;
              padding-left: 48px;
            }

            &:nth-of-type(2) {
              flex: 1;
              flex-direction: column;
              align-items: stretch;
              font-size: 16px;
              color: #1d2129;

              span {
                font-weight: 400;
              }

              em {
                margin-top: 8px;
                font-weight: 500;
              }
            }

            &:nth-of-type(n + 3) {
              justify-content: center;
              width: 130px;
              margin-left: 40px;
            }
          }

          &:before {
            top: 0;
            width: 95%;
            height: 1px;
            background-color: #f5f5f5;
          }
        }
      }

      &:nth-of-type(n + 2) {
        border-top: 1px solid #c9cdd4;
      }
    }
  }

  .tfooter {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100px;
    margin-top: 43px;
    background-color: #1d2129;
    font-size: 16px;
    font-weight: 500;
    color: #fff;

    span {
      em {
        margin: 0 5px;
        color: #ff7d00;
      }

      i {
        font-size: 24px;
        font-style: normal;
      }

      &:nth-of-type(2) {
        position: relative;
        top: -3px;
        margin-left: 34px;
      }
    }

    .btn {
      width: 192px;
      height: 100px;
      margin-left: 30px;
      background-color: #ff7d00;
      font-size: 24px;
      font-weight: 500;
    }
  }
}

.addressee_form {
  margin-top: 24px;
  padding: 24px 24px 27px;
  background-color: #fff;

  h3 {
    line-height: 22.4px;
    font-size: 16px;
    font-weight: 500;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 306px;
    margin-top: 17px;

    li {
      display: flex;
      align-items: center;

      .title {
        width: 86px;
        font-size: 14px;
        font-weight: 400;
        color: #4e5969;

        em {
          color: #ff7d00;
        }
      }

      .content {
        .input_box {
          display: flex;
          align-items: center;
          height: 32px;
          border-radius: 2px;
          background-color: #fff;
          border: 1px solid #f5f5f5;

          input {
            flex: 1;
            width: 100%;
            padding: 0 8px;
            font-size: 14px;
            font-weight: 400;

            &::-webkit-input-placeholder {
              color: #c9cdd4;
            }
          }
        }

        .btn {
          width: 158px;
          height: 42px;
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

.delivery_method {
  height: 161px;
  margin-top: 40px;
  padding: 24px 24px 32px;
  background-color: #fff;

  h3 {
    line-height: 22.4px;
    font-size: 16px;
    font-weight: 500;
  }

  ul {
    margin-top: 12px;

    li {
      display: flex;

      input {
        width: 158px;
        height: 30px;
        padding: 0 10px;
        border-radius: 4px;
        border: 1px solid #c9cdd4;
        font-size: 14px;
        font-weight: 400;

        &::-webkit-input-placeholder {
          color: #c9cdd4;
        }
      }

      &:nth-of-type(n + 2) {
        margin-top: 20px;
      }
    }
  }
}

.table_title {
  display: flex;
  align-items: center;
  height: 70px;
  margin-top: 16px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  background-color: #fff;
}

.link_table_footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 188px;
  padding-top: 38.5px;

  .price {
    color: #1d2129;
    font-size: 16px;
    font-weight: 500;

    em {
      font-size: 24px;
    }
  }

  p {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;

    .btn {
      padding: 0 8px;
      color: #ff7d00;

      &:hover {
        font-weight: bold;
      }
    }
  }

  .submit_btn {
    width: 226px;
    height: 48px;
    border-radius: 2px;
    background-color: #ff7d00;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
}

.address_list {
  margin-top: 22px;

  .address_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 418px;
    height: 187px;
    padding: 24px 24px 32px;
    background-color: #fffafa;
    border: 1px solid #ff7d00;

    .flag {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      position: absolute;
      top: 0;
      right: 0;
      //width: 68px;
      height: 25px;
      padding: 0 6px;
      background-color: #ff7d00;
      font-size: 14px;
      font-weight: 400;
      color: #fff;
    }

    p {
      line-height: 22.4px;
      font-size: 16px;
      font-weight: 500;
    }

    span {
      line-height: 19.6px;
      font-size: 14px;
      font-weight: 400;
    }

    .corner_labels {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      z-index: 1;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 38px;
      height: 38px;
      padding: 5px 3px;
      background-color: #ff7d00;
      overflow: hidden;

      i {
        font-size: 14px;
        color: #fff;
      }

      &:before {
        content: '';
        z-index: 2;
        position: absolute;
        top: -65px;
        left: -68px;
        width: 100px;
        height: 100px;
        background-color: #fffafa;
        transform: rotate(45deg);
        transform-origin: center center;
      }
    }
  }
}

.status_page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 493px;
  margin-top: 24px;
  padding: 150px 0;
  background-color: #fff;

  .status_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #e8ffea;

    i {
      font-size: 25px;
      color: #00b42a;
      font-weight: bolder;
    }
  }

  .status_title {
    line-height: 22px;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #1d2129;
  }

  .tips {
    line-height: 22px;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 400;
  }

  .btns {
    display: flex;
    margin-top: 16px;

    .btn {
      width: 84px;
      height: 32px;
      border-radius: 2px;
      font-size: 14px;
      font-weight: 400;
      color: #fff;

      &.download_order {
        background-color: #ff7d00;
      }

      &.back2store {
        margin-left: 8px;
        background-color: #c9cdd4;
      }
    }
  }
}

@media screen and (max-width: 768px) {

  .cart_container {
    padding-bottom: 20px;
  }

  .inset,
  .breadcrumb_box {
    width: 100%;
    padding: 0 10px;
    margin: 8px auto;
  }

  .step_list {
    flex-direction: column;
    height: auto;
    padding: 16px 0;

    li {
      width: 100%;
      justify-content: flex-start;
      margin: 8px 0;

      em {
        width: 24px;
        height: 24px;
        font-size: 12px;
      }

      span {
        margin-left: 8px;
        font-size: 14px;
      }

      &:nth-of-type(n + 2) {
        margin-left: 0;
      }
    }
  }

  .like_table {
    padding-bottom: 90px; // 预留底部空间，防止被遮挡
  }

  .like_table {
    .thead,
    .tbody {
      display: block;
    }

    .thead {
      display: none; // 手机端隐藏表头
    }


    .tbody .tr {
      margin-bottom: 16px;
      border: 1px solid #f5f5f5;
      border-radius: 4px;
      padding: 12px;

      .select_store_all {
        padding-left: 0;
        font-size: 14px;
      }

      ul li {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        padding: 8px 0;

        /* 商品名 */
        .td:nth-of-type(2) {
          grid-column: 2 / 3;
          padding-left: 50px;

          span {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.45;
            word-break: break-word;
          }
        }

        .td:nth-of-type(3) {
          display: none;
        }

        /* 单价 */
        .td:nth-of-type(4) {
          color: #ff7d00;
          font-weight: 600;
        }

        /* 数量 */
        .td:nth-of-type(5) {
          .el-input-number {
            width: 120px;
          }
        }


        .td {
          width: 100% !important;
          margin: 4px 0;
          justify-content: flex-start;

          img {
            width: 80px;
            height: 80px;
            margin-left: 0;
            margin-bottom: 8px;
          }

          .btn {
            width: 100%;
            text-align: left;
          }

          &:nth-of-type(2) {
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .tfooter {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px !important;
    padding: 0 12px;
    background: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tfooter span {
    font-size: 14px;
    color: #fff; /* 已选xxx件商品改黑色 */
  }

  .tfooter span em {
    color: #ff7d00;
    font-weight: 600;
  }

  .tfooter span i {
    font-size: 18px;
    color: #ff7d00;
  }

  .tfooter .btn {
    width: 120px;
    height: 44px;
    border-radius: 16px;
    font-size: 14px;
    background: #ff7d00;
  }

  .addressee_form,
  .delivery_method,
  .link_table_footer {
    width: 100%;
    padding: 12px;
  }

  .addressee_form ul li,
  .delivery_method ul li {
    flex-direction: column;
    align-items: flex-start;

    .title {
      width: 100%;
      margin-bottom: 4px;
    }

    .content {
      width: 100%;

      .input_box input {
        width: 100%;
      }

      .btn {
        width: 100%;
        margin-top: 8px;
      }
    }
  }

  .address_list .address_info {
    width: 100%;
    height: auto;
    padding: 12px;
  }

  .table_title {
    padding-left: 12px;
  }

  .status_page {
    padding: 80px 12px;
    height: auto;
  }

  .status_page .btns {
    flex-direction: column;

    .btn {
      width: 100%;
      margin: 8px 0;
    }
  }
}
.mobile-delete-confirm {
  width: 80% !important;
  border-radius: 16px;
  padding-bottom: 10px;
}

.mobile-delete-confirm .el-message-box__header {
  text-align: center;
}

.mobile-delete-confirm .el-message-box__title {
  font-size: 16px;
  font-weight: 600;
}

.mobile-delete-confirm .el-message-box__content {
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
  padding: 12px 0;
}

.mobile-delete-confirm .el-message-box__btns {
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  padding: 0 16px;
}

.mobile-delete-confirm .el-button {
  width: 100%;
  height: 44px;
  border-radius: 22px;
  font-size: 15px;
}

/* 删除按钮强化 */
.mobile-delete-confirm .el-button--primary {
  background-color: #f53f3f;
  border-color: #f53f3f;
}
</style>
