<template>
  <div class="GoodsListItem" >
    <img v-lazy="getImgurl" alt="" @load="itemImgLoad" @click="itemClick"><!-- 监听是否加载完成 -->
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
  computed: {
    getImgurl() {
      return  this.GoodsItem.image || this.GoodsItem.show.img 
      // return   this.GoodsItem.show.img || this.GoodsItem.image 

    }
  },
  methods: {
    itemImgLoad() {
      // 现在是detail页面和home页面都用到了GoodList这个组件，所以要区分一下

      // 方法一：仍然发送同一个事件，只是在某一组件destory的时候，取消的事件总线的监听就可以了
      this.$bus.$emit('itemImgLoad') /* 发射自定义事件给事件总线 */

      // 方法2.通过路由来判断应该发送那个事件到事件总线上
      // if(this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImgLoad')
      // } else if (this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImgLoad')
      // }
    },
    itemClick() {
      this.$router.push('/detail/' +  this.GoodsItem.iid)
    },

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