<template>
  <div class="check-button">
    <img src="~assets/img/cart/yes3.svg" alt="" :class="{checked: buttonactive}"> 
  </div>
</template>

<script>

export default {
  name:'checkbutton',
  props: {
    buttonactive: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
 }
</script>
<style scoped>
  .check-button img{
    height: 1.2rem;
    border-radius: 50%;
    border: solid #eee;
  }

  .checked {
     border-color: rgb(255, 129, 152);
     background-color: rgb(255, 129, 152);
  }
</style>