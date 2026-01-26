<template>
  <div class="pagination_box">
    <div class="center">
      <span>共{{total}}条记录</span>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="size"
          layout="prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  components: {},
  props: {
    total: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 20
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  computed: {},
  beforeMount() {

  },
  beforeDestroy() {

  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped lang="scss">
.pagination_box {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;

  .center {
    display: flex;
    align-items: center;
    height: 32px;

    span {
      font-size: 14px;
      font-weight: 400;
      color: #4f5470;
    }

    ::v-deep {
      .btn-prev,
      .btn-next {
        width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 2px;
        border: 1px solid rgba(0, 0, 0, .5);

      }

      .el-pager {
        margin: 0 10px;

        li {
          width: 32px;
          height: 32px;
          border-radius: 2px;
          border: 1px solid rgba(0, 0, 0, .5);

          &:nth-of-type(n + 2) {
            margin-left: 10px;
          }

          &.active {
            border-color: #1d2129;
            background-color: #1d2129;
            color: #fff;
          }
        }
      }
    }
  }
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .pagination_box {
    justify-content: center; /* 手机端居中显示 */
    margin-top: 15px;

    .center {
      height: 28px;

      span {
        font-size: 12px;
      }

      ::v-deep {
        .btn-prev,
        .btn-next {
          width: 28px;
          height: 28px;
        }

        .el-pager {
          margin: 0 5px;

          li {
            width: 28px;
            height: 28px;

            &:nth-of-type(n + 2) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
