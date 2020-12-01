<template>
  <div class="slide">
    <div class="slideShow" v-for="(value,key) in banners" :key="key" v-show="key === currIndex">
      <a :href="value.link">
        <img :src="value.image" alt />
      </a>
    </div>

    <div class="bar">
      <span v-for="(value,key) in banners" :key="key" :class="{'active': key === currIndex}" @click="clickPoint(key)"></span>
    </div>
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
    clickPoint(key) {
      console.log(event);
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
