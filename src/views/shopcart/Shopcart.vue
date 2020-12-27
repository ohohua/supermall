<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{getlength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <car-list></car-list>
    </scroll>
    <cart-buttom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CarList from './childCompons/CarList'
import Scroll from 'components/common/scroll/Scroll'
import CartButtomBar from './childCompons/CartBottomBar'

import { mapGetters } from 'vuex'
export default {
  name:'shopcart',
  components: {
    NavBar,
    CarList,
    Scroll,
    CartButtomBar
  },
  computed: {
    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

    // 数组写法
    // ...mapGetters(['computelength'])
    
    // 对象写法，可以取新名字
    ...mapGetters({
      getlength: 'computelength'
    })
  },
  activated () {
    this.$refs.scroll.refresh()
  }

 }
</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .shop-cart {
    height: 100vh;
    
  }
  .content  {
    height: calc(100% - 44px - 49px - 43px);
    overflow: hidden;
  }
</style>