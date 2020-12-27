<template>
  <div class="back-top">
    <img src="~assets/img/common/top2.svg" alt="">
  </div>
</template>

<script>

export default {
  name:'backtop',
 }
</script>
<style scoped>
  .back-top {
    position: fixed;
    right: 5px;
    bottom: 50px;
    z-index: 10;
  }
  .back-top img {
    width: 50px;
  }
</style>