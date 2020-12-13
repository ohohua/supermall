<!-- 已作废代码 -->
<template>
  <div>
     <div class="slideShow" v-for="(value,key) in banners" :key="key" v-show="key === currIndex">
      <!-- <a :href="value.link">
        <img :src="value.image" alt />
      </a> -->
      <slot name="slideShow"></slot>
    </div>

    <div class="bar">
     <!-- <span v-for="(value,key) in banners" :key="key" :class="{'active': key === currIndex}" @click="clickPoint(key)"></span> -->
     <div v-for="(value,key) in banners" :key="key" :class="{'active': key === currIndex}" @click="clickPoint(key)">
       <slot name="bar"></slot>
     </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: "swiperitem",
  data() {
    return {
      currIndex: 0,
      clearTime: null
    };
  },
};
</script>
<style scoped>
.slideShow{
    width: 100%;
  }
  .slideShow img{
    width: 100%;
  }

  .bar{
    width: 100%;
    position: absolute;
    margin-top: -30px; 
    z-index: 10;
    display: flex;
    justify-content: center;

  }
  .bar span{
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: white;
    margin-left: 10px;
  }
  .active {
    background-color: black !important;
  }
</style>