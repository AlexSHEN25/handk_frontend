<template>
  <div class="custom_footer_container">
    <img src="@/assets/images/logo_white.png" alt="" class="logo">
    <p>Copyright ©2023 H＆K.co.,LTD. All Rights Reserved.</p>
  </div>
</template>

<script>
export default {
  name: "CustomFooter",
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
.custom_footer_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 252px;
  padding: 60px 0 24px;
  background-color: #1d2129;

  img {
    width: 270px;
    height: 60px;
  }

  p {
    line-height: 19.6px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
}
</style>
