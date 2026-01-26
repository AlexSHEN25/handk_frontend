<template>
  <div id="app" class="app_container">
    <CustomHeader></CustomHeader>
    <main>
      <router-view />
    </main>
    <CustomFooter></CustomFooter>
    <Login></Login>
  </div>
</template>
<script>
import CustomHeader from '@/components/CustomHeader/index.vue'
import CustomFooter from '@/components/CustomFooter/index.vue'
import Login from '@/components/Login/index.vue'
import {logoImage} from '@/api/api'
import {setLocal} from '@/utils/auth'

export default {
  components: {
    Login,
    CustomHeader, CustomFooter
  },
  created () {
    this.getLogo();
  },
  watch: {
    '$route.path'() {
      window.scrollTo({x: 0, y: 0})
    },
  },
  methods: {
    getLogo() {
      logoImage().then(res => {
        this.$store.dispatch('config/setLogo', res.data.logo_image)
      }).catch(err=>{
          console.log(err);
        })
    },
  }
}
</script>
<style lang="scss">
@import "@/assets/style/reset.css";

@font-face {
  font-family: HGRHKFSJ;
  src: url("@/assets/font/HGRHKFSJ.TTC") format("truetype");
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.app_container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.not_data {
  margin: 30px 0 20px;
  font-size: 14px;
  color: #999;
  text-align: center;
}
</style>
