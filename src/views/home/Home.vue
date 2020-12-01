<template>
  <div id="home">
    <nav-bar class="home-nav">
      <slot slot="center">购物街</slot>
    </nav-bar>
    <!-- <home-swiper :banners='banners'/> -->
    <swiper :banners="banners"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcompons/HomeSwiper'

import Swiper from 'components/common/swiper/Swiper'
import { getHomeMultiData } from 'network/home'
export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    Swiper
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultiData().then(res => {
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
      // console.log(res.data.data.banner.list);
    })
  }

};
</script>
<style scoped>
  .home-nav{
    background-color: var(--color-tint);   /* 使用自定义的变量 */
    color: white;
  }
</style>