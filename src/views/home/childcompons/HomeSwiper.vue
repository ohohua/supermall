<template>
  <div class="swiperbox">
    <swiper>
      <swiper-item v-for="(value,key) in banners" :key="key">
        <a :href="value.link">
          <img :src="value.image" alt="">
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