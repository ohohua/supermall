<template>
  <div class="cart-bottom-bar">
    <div class="button-content">
      <check-button :buttonactive="isSelectorAll"  @click.native="SelectorAllClick" class="check-button"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      <span>合计 {{totalPrice}}</span>
    </div>

    <div class="calculate" @click="calctotal">
      去结算({{getCurrentLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name:'cartbottombar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.getlist
                        .filter(item => item.checked === true)
                        .reduce((total, item)  => parseInt(item.price) * item.counter + total, 0)
                        .toFixed(2)
    },

    getCurrentLength() {
      return this.getlist
                 .filter(item => item.checked === true)
                 .reduce((total, item) => item.counter + total, 0)
    },

    ...mapGetters(['getlist']),

    isSelectorAll() {
      if(!this.getlist.length) return false
      
      // 全选中返回true， 有一个没有选中返回false
      return !this.getlist.find(item => !item.checked)
      
      
    }
  },
  methods: {
    SelectorAllClick() {
      if(this.isSelectorAll) { // 如果现在是全部选中的状态
        // this.getlist.forEach(item => item.checked = false)
        this.$store.commit('cancelSelector')
      } else {
        // this.getlist.forEach(item => item.checked = true)
        this.$store.commit('allSelector')
      }

    },
    calctotal() {
      if(!this.isSelectorAll) {
        this.$toast.show('亲没有选中要拍的宝贝呦', 2000)
      }
    }
  }
 }
</script>
<style scoped>
.cart-bottom-bar {
  display: flex;
  font-size: 14px;
  height: 40px;
  text-align: center;
  background-color: #eee;
}

.button-content {
  display: flex;
  align-items: center;
  width: 75px;
}

.check-button {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}

.total-price {
  line-height: 40px;
  flex: 1;
}

.calculate {
  width: 80px;
  line-height: 40px;
  background-color: rgb(255, 129, 152);
  color: #eee;
  border-radius: 20px;
}
</style>