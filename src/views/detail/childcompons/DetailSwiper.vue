<template>
  <div class="detailslide">
    <div class="detailslidShow">
        <div v-for="(value,key) in topImages" :key="key" v-show="key === currIndex" >
          <img :src="value" @load="detailImgLoad" class="imgs"/>
        </div>
    </div>
    <div class="detailbar">
      <span
        v-for="(value,key) in topImages"
        :key="key"
        :class="{'detailbar-active': key === currIndex}"
        @click="mouseOver(key)" 
        v-show="topImages.length > 1"
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
    };
  },
  props: {
    topImages: {
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
        this.currIndex %= this.topImages.length;
      }, 3000);
    },
    mouseOver(key) {
      clearInterval(this.clearTime);
      this.currIndex = key;
      this.beginPlay();
    },
    detailImgLoad() {
      this.$emit('detailImgLoad')
    }
  },
};
</script>
<style>
.detailslide {
  position: relative;
  /* height: 300px;
  overflow: hidden; */
}
.detailslidShow {
  /* width: 100%; */
  height: 250px;
  overflow: hidden;
}
.detailbar {
  width: 100%;
  position: absolute;
  margin-top: -30px;
  z-index: 1;
  display: flex;
  justify-content: center;
}
.detailbar span {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color:white;
  margin-left: 10px;
}
.detailbar-active {
  background-color: orange !important;
}
</style>
