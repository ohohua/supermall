<template>
  <div class="slide">

     <div class="slideShow" >
      <a :href="value.link" 
      v-for="(value,key) in banners" :key="key" v-show="key === currIndex"
      >
        <img :src="value.image" alt />
      </a>
    </div>

    <div class="bar">
     <span v-for="(value,key) in banners" :key="key" :class="{'active': key === currIndex}" @mouseover="mouseOver(key)"></span> 
    </div> 

    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currIndex: 0,
      clearTime: null
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    // 调用定时器方法
    this.beginPlay()
  },
  methods: {
    beginPlay() {
      this.clearTime = setInterval(() => {
        this.currIndex++
        this.currIndex %= this.banners.length
      }, 3000);
    },
    mouseOver(key) {
      clearInterval(this.clearTime)
      this.currIndex = key
      this.beginPlay()

    }
  }
};
</script>
<style>
  .slide{
    position: relative;
    /* padding-top: 44px; */
  }
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
    z-index: 1;
    display: flex;
    justify-content: center;

  }
  .bar span{
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: rgba(92, 88, 88, 0.205);
    margin-left: 10px;
  }
  .active {
    background-color: white !important;
  }
</style>
