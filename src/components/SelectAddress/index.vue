<template>
  <div>
    <el-row>
      <div class="item">
        <!--<span class="p_title">省</span>-->
        <el-select v-model="provinceValue" placeholder="省/直辖市" @change="selectProvimce">
          <el-option
              v-for="(item,index) of provincearr"
              :key="index"
              :label="item.name"
              :value="item.name"
          ></el-option>
        </el-select>
      </div>
      <div class="item">
        <!--<span class="other_title">市</span>-->
        <el-select v-model="cityValue" placeholder="市" @change="selectcity">
          <el-option v-for="(item,index) of cityarr" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </div>
      <div v-if="mode[2] === 1" class="item">
        <!--<span class="other_title">区</span>-->
        <el-select placeholder="区/县" v-model="regionValue">
          <el-option
              v-for="(item,index) of regionarr"
              :key="index"
              :label="item.name"
              :value="item.name"
          ></el-option>
        </el-select>
      </div>
    </el-row>
  </div>
</template>

<script>
// import {cityList} from '@/api/api'

import {province} from './city'

export default {
  name: "SelectAddress",
  props: {
    mode: {
      type: Array,
      default: () => ([1, 1, 1])
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      arr: [1, 3, 4],
      province: [],
      cityarr: [],
      regionarr: [],
      provincearr: province,
      provinceValue: '',
      cityValue: '',
      regionValue: '',
    }
  },
  created() {

  },
  mounted() {
  },
  watch: {
    regionValue(val) {
      const {provinceValue, cityValue} = this;

      this.$emit('change', {p: provinceValue, c: cityValue, a: val})
    },
    value: {
      immediate: true,
      handler(str) {
        if(!!str) {
          const [p, c, a] = str.split('/')
          this.provinceValue = p;
          this.cityValue = c;
          this.regionValue = a;

          const {provincearr} = this;

          const {children: cityarr} = provincearr.find(item => item.name == p);
          this.cityarr = cityarr;

          const {children: regionarr} = cityarr.find(item => item.name == c);
          this.regionarr = regionarr;
        }
      }
    },
  },
  methods: {
    selectProvimce(name) {
      const {provincearr} = this;

      const {children} = provincearr.find(item => item.name == name);

      this.cityarr = children;
      this.regionarr = [];
      this.cityValue = '';
      this.regionValue = '';
    },
    selectcity(name) {
      const {cityarr, provinceValue, cityValue, mode} = this;

      const {children} = cityarr.find(item => item.name == name);

      this.regionarr = children;

      if(mode[2] !== 1) {
        this.$emit('change', {p: provinceValue, c: cityValue, a: ''})
      }
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  //width: 800px;
  //height: 400px;
  //overflow: hidden;
}

.el-row {
  display: flex;

}

.item {
  display: flex;
  border: 1px solid #f5f5f5;

  span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    width: 50px;
  }

  ::v-deep {
    .el-input {
      border-radius: 5px;
      overflow: hidden;
    }
    .el-input__inner {
      width: 120px;
      height: 32px;
      border: 0;
      background-color: #fff;
    }

    .el-input__suffix {
      display: flex;
      align-items: center;
    }
  }

  &:nth-of-type(n + 2) {
    margin-left: 10px;
  }
}

.box {
  width: 800px;
  height: 50px;
  line-height: 50px;
  background: red;
  color: #fff;
}

/* 手机端适配 */
@media screen and (max-width: 768px) {
  .el-row {
    flex-direction: column; /* 小屏幕纵向排列 */
  }

  .item {
    width: 100%; /* 占满屏幕宽度 */
    margin-left: 0 !important; /* 去掉横向间距 */
    margin-bottom: 10px; /* 上下间距 */

    ::v-deep {
      .el-input__inner {
        width: 100%; /* 输入框占满容器宽度 */
        height: 36px;
      }

      .el-select {
        width: 100% !important; /* 下拉框占满宽度 */
      }
    }
  }
}
</style>
