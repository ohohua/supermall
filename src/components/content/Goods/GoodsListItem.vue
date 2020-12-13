<template>
  <div class="GoodsListItem">
    <img :src="GoodsItem.show.img" alt="" @load="itemImgLoad"><!-- 监听是否加载完成 -->
    <div class="goods-info">
      <p>{{GoodsItem.title}}</p>
      <span class="price">{{GoodsItem.price}}</span>
      <span class="collect">{{GoodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'goodslistitem',
  props: {
    GoodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemImgLoad() {
      this.$bus.$emit('itemImgLoad') /* 发射自定义事件给事件总线 */
    }
  }

 }
</script>
<style scoped>
  .GoodsListItem {
    width: 48%;
    position: relative;
    padding-bottom: 40px;
  }
  .GoodsListItem img {
    width: 100%;
    border-radius: 6px;
  }
  .goods-info {
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    left: 0;
    right: 0; 
    overflow: hidden;
    text-align: center;
  }
  .price {
    color: var(--color-high-text);
  }
  
  .goods-info p {
      /**
        思路：
        1.设置inline-block属相
        2.强制不换行
        3.固定高度
        4.隐藏超出部分
        5.显示“……”
      */
    display: inline-block;
    white-space: nowrap; 
    width: 100%; 
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .collect {
    position: relative;
    padding-left: 18px;
  }

  .collect::before {
    content: ''; /* 在collect前面有内容占位 */
    position: absolute;
    left: 2px;
    top: -1px;
    width: 14px;
    height: 14px;   
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>