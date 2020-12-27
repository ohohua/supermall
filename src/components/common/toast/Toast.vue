<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>

export default {
  name:'Toast',
  data() {
    return {
      message: '',
      isShow: false
    };
  },
  methods: {
    show(message, duration=1000) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
 }
</script>
<style scoped>
  .toast {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 20px;
    color: white;
    border-radius:  19.2px;
    background-color: rgba(0,0,0,.8);
  }

</style>