<template>
  <div class="recommend">
    <div v-for="(value,key) in recommends" :key="key">
      <a :href="value.link">
        <img :src="value.image" alt="">
        <div class="size">{{value.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'homerecomendview',
  props: {  
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {

    };
  },

 }
</script>
<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 3% 0 6%;
  border-bottom: 10px solid #eee;
}
.recommend img {
  width: 90%;
}
.size {
  font-size: 80%;
}
</style>