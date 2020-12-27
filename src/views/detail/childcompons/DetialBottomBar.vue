<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="together">
        <i class="icon-service icon"></i>
        <span>客服</span>
      </div>
      <div class="together">
        <i class="icon-shop icon"></i>
        <span>店铺</span>
      </div>
      <div class="together">
        <i class="icon-collect icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="shopcar" @click="joinToCart">加入购物车</div>
      <div class="purchase">购买</div>
    </div>
  </div>
</template>

<script>

export default {
  name:'detailbottombar',
  methods: {
    joinToCart() {
    // console.log('加入购物车');
    this.$emit('joinCart')
    }
  }

 }
</script>
<style scoped>
  .bottom-bar {
    position: relative;
    height: 49px;
    display: flex;
    
    /* top: 5px; */
  }

  .bottom-left {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    flex: 1;
  }
  .bottom-right {
    display: flex;
    justify-content: space-around;  
    /* align-items: center; */
    margin-top: 4px;
    flex: 1;
    height: 85%;
    line-height: 41.65px;
  }
  .shopcar {
    background-color: rgb(255, 222, 11);
    border-radius: 24.5px 0 0 24.5px;
    flex: 1;
    text-align: center;
    color: white;

  }
  .purchase {
    background-color: rgb(255, 119, 153);
    flex: 1;
    text-align: center;
    border-radius: 0 24.5px 24.5px 0;
    color: white;

  }

  .icon-service {
    display: block;
    height: 22px;
    width: 22px;
    background: url('~assets/img/detail/cusservice.svg') 0 0/100%;
  }
  .icon-shop {
    display: block;
    height: 22px;
    width: 22px;
    background: url('~assets/img/detail/shop.svg') 0 0/100%;
  }
  .icon-collect {
    display: block;
    height: 22px;
    width: 22px;
    background: url('~assets/img/detail/collecte.svg') 0 0/100%; 
  }
  .together {
    margin-top: 4px;  
  }
  .icon {
    margin: 0 auto;
  }
</style>