<template>
  <div class="japan_freight_container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "JapanFreight",
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  created() {

  },
  methods: {},
  beforeMount() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped lang="scss">
.japan_freight_container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 12px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 0 8px;

    // 可选：统一基础字体大小
    font-size: 14px;

    // img 全局自适应
    img {
      max-width: 100%;
      height: auto;
    }

    // 表格自适应
    table {
      width: 100%;
      display: block;
      overflow-x: auto;
    }
  }
}
</style>
