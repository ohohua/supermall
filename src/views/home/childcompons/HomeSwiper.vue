<template>
  <div class="swiperbox">
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  name:'Swiperchild',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },

 }
</script>
<style scoped>
</style>