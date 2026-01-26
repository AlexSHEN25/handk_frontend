<template>
  <div class="pdf_container">
    <vue-office-pdf :src="pdf" @rendered="rendered"/>
  </div>
</template>

<script>
import VueOfficePdf from '@vue-office/pdf'

export default {
  name: 'PdfViewer',
  components: { VueOfficePdf },
  data() {
    return {
      pdf: '' // PDF 地址
    }
  },
  created() {
    // 从路由参数获取 PDF 地址
    this.pdf = this.$route.query.url
  },
  methods: {
    rendered() {
      console.log("PDF 渲染完成")
    }
  }
}
</script>

<style scoped>
/* 保持PC端不变，手机端适配 */
@media screen and (max-width: 768px) {
  .pdf_container {
    width: 100%;
    height: 100vh; /* 手机端全屏 */
    overflow: auto; /* 可以上下滚动 */
    padding: 0;
  }

  /* 强制 vue-office-pdf 占满容器 */
  .pdf_container ::v-deep(.vue-office-pdf) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
