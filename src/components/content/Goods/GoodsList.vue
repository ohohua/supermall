<template>
  <div class="GoodsList">
    <goods-list-item  v-for="(item,key) in Goods.list" :key="key" :GoodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'goodslist',
  components: {
    GoodsListItem
  },
  props: {
    Goods: {
      type: Object,
      default() {
        return {}
      }
    }

  }

 }
</script>
<style scoped>
 .GoodsList {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   /* overflow: hidden; */
 }
</style>