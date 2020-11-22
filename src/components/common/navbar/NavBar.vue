<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  components: {},
  data() {
    return {};
  },
  computed: {},
};
</script>
<style scoped>
  .nav-bar{
    display: flex;
    /* height: 44px; */ /* 一般的导航高44px */
    line-height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1); /* x,y,shadow大小,shadow颜色，.1:shadow */
    text-align: center;
  }

  .left , .right{
    width: 60px;
  }
  .center{
    flex: 1;
  }
</style>