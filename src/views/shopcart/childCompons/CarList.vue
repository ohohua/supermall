<template>
  <div class="car-list">
    <car-list-item v-for="(item, key) in getlist" :key="key" :caritem="item"></car-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CarListItem from './CarListItem'


export default {
  name:'carlist',
  components: {
    CarListItem,
  },
  computed: {
    ...mapGetters(['getlist'])
  }
 }
</script>
<style scoped>
 .car-list {
   height: 100%;
 }
</style>