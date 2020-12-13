<template>
  <div class="swiperbox">
    <swiper>
      <swiper-item>
        <a :href="value.link" slot="slideShow">
          <img :src="value.image" alt />
        </a>
        <span slot="bar"></span>
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