<template>
  <div class="list-item">
    <div class="list-item-left">
      <check-button :buttonactive="caritem.checked" @click.native="checkClick"/>
    </div>
    <div class="list-item-center">
      <img :src="caritem.image" alt="">
    </div>
    <div class="list-item-right">
      <p>{{caritem.title}}</p>
      <p>{{caritem.desc}}</p>
      <div class="price-number">
        <span>{{caritem.price | showPrice}}</span>
        <span>{{caritem.counter | showNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkbutton/CheckButton'
export default {
  name:'carlistitem',
  components: {
    checkButton
  },
  props: {
    caritem: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  methods: {
    checkClick() {
      this.caritem.checked = !this.caritem.checked
    }
  },
  filters: {
    showPrice(price) {
      return '￥' + price
    },
    showNumber(number) {
      return 'x' + number
    } 
  },
  activated () {
    console.log(this.caritem);
  }

 }
</script>
<style scoped>
  .list-item {
    display: flex;
    height: 8rem;
    align-items: center;
    border-bottom: 1px solid #aaa;
  }

  .list-item-center {
    height: 90%;
    /* width: 100vw; */
    margin-right: 0.6rem;
    margin-left: .2rem;
  }
  .list-item-center img{
    height: 100%;
    border-radius: 10%;
  }
  .list-item-right {
    width: 70%;
  }

  .list-item-right p{
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
    font-size: .7rem;
    line-height: 2rem;
  }

  .list-item-right :first-child{
    font-weight: 600;
    font-size: .9rem;
  }

  .price-number :first-child{
    color: var(--color-high-text);
  }

  .price-number {
    display: flex; 
    justify-content: space-between;
  }
</style>