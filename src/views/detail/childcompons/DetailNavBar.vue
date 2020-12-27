<template>
  <div>
    <nav-bar>
      <div slot="left" class="backimg" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(value, key) in titles" 
             :key="key" class="titleItem" 
             :class="{'detail-nav-active': key === currentkey}"
             @click="titleClick(key)">{{value}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentkey: 0
    };
  },
  methods: {
    titleClick(key) {
      this.currentkey = key
      this.$emit('navClick',key)
    },
    backClick() {
      this.$router.back()
    }
  }
 }
</script>
<style scoped>
  .title {
    display: flex;
  }

  .titleItem {
    flex: 1;
    line-height: 44px;
    
  }
  .backimg img {
    position: relative;
    /* margin-top: 8px; */
    top: 5px;
    left: 10%;
  }

  .detail-nav-active {
    color: var(--color-high-text);
  }
</style>