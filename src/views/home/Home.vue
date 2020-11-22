<template>
  <div id="home">
    <nav-bar class="home-nav">
      <slot slot="center">购物街</slot>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultiData } from 'network/home'
export default {
  name: "home",
  components: {
    NavBar
  },
  data() {
    return {
      data: null
    };
  },
  created() {
    // 1.请求多个数据
    getHomeMultiData().then(res => {
      this.data = res
      console.log(res);
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