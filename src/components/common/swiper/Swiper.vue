<template>
  <div class="slide">
    <div class="slideShow">
      <a :href="value.link" v-for="(value,key) in banners" :key="key" v-show="key === currIndex">
        <img :src="value.image" @load="swiperimageload" />
      </a>
    </div>
    <div class="bar">
      <span
        v-for="(value,key) in banners"
        :key="key"
        :class="{'swiper-active': key === currIndex}"
        @click="mouseOver(key)"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currIndex: 0,
      clearTime: null,
      imgisLoad: false,
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
    this.beginPlay();
  },
  methods: {
    beginPlay() {
      this.clearTime = setInterval(() => {
        this.currIndex++;
        this.currIndex %= this.banners.length;
      }, 3000);
    },
    mouseOver(key) {
      clearInterval(this.clearTime);
      this.currIndex = key;
      this.beginPlay();
    },

    swiperimageload() {
      // 四张图片的高度都是一样的
      if (!this.imgisLoad) {
        this.$emit("swiperimageload");
        this.imgisLoad = true;
      }
    },
  },
};
</script>
<style>
.slide {
  position: relative;
  /* padding-top: 44px; */
}
.slideShow {
  width: 100%;
}
.slideShow img {
  width: 100%;
}

.bar {
  width: 100%;
  position: absolute;
  margin-top: -30px;
  z-index: 1;
  display: flex;
  justify-content: center;
}
.bar span {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: white;
  margin-left: 10px;
}
.swiper-active {
  background-color:orange !important;
}
</style>
