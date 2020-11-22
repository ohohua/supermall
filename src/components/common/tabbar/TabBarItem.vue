<template>
  <div class="tab-bar-item" @click="ItemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props: {
    path: String,

    ActiveColor:{
      type: String,
      default: "red",
    }
  },
  computed: {
    isActive() {
      // 判断this.$route.path这个里面有没有this.path ， 没有就返回-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 动态绑定style，下面这个代码的意思是如果当前组件处于活跃状态，就从props中取ActiveColor给当前style
    activeStyle() {
      return this.isActive ? {color: this.ActiveColor} : {}
    }
  },

  methods: {
    ItemClick() {
      if(this.$router.history.current.path != this.path)
      this.$router.replace(this.path);
    },
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  margin-top: 3px;
}
.tab-bar-item img {
  height: 20px; /* 对图片只设置了高 */
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>