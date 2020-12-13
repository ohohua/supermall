<template>
  <div id="home">
    <nav-bar class="home-nav">
      <slot slot="center">购物街</slot>
    </nav-bar>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3" 
            @pullUpLoad="loadMore"
            :pull-up-load="true">
      <!-- <home-swiper :banners='banners'/> -->
      <swiper :banners="banners" />
      <home-recomend-view :recommends="recommends" />
      <feature-view />
      <tab-control :title="['流行','新款','精选']" class="tab-control" @SwitchClick="change" /><!-- 子组件传过来的自定义事件 -->
      <goods-list :Goods="goodsType" />
    </scroll>
    <back-top @click.native="backTopclick" v-show="isShowBackTop"/><!-- 需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符 -->
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import HomeRecomendView from "./childcompons/HomeRecomendView";
import FeatureView from "./childcompons/FeatureView";
import TabControl from "components/content/tabControl/tabControl.vue";
import GoodsList from "components/content/Goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from 'components/content/backtop/BackTop.vue'

import NavBar from "components/common/navbar/NavBar";
import tabControl from "components/content/tabControl/tabControl";

import { getHomeMultiData, getHomeGoods } from "network/home";

export default {
  name: "home",
  components: {
    // HomeSwiper,
    Swiper,
    HomeRecomendView,
    FeatureView,
    NavBar,
    tabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false
    };
  },
  computed: {
    goodsType() {
      return this.goods[this.currentType];
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiData();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {

    // 监听事件总线
    this.$bus.$on("itemImgLoad", () => {
    this.$refs.scroll && this.$refs.scroll.refresh();
    // 图片加载可能很快（在组件create阶段）， 甚至在组件被挂载之前就请求完毕了，这时候在GoodsListItem里面的@load就将事件发送到事件总线上了。但是此时this.$refs.sroll 为undefine ， 就会报错，所以这样处理 &&
    });
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    change(key) {
      // console.log(key);
      switch (key) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
    /**
     * 返回顶部
     * scrollTo(0, 0, 500),better-scroll 方法
     * 参数分别是x， y， 返回所用的时间
     */
    backTopclick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },

    // 监听滚动距离
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000 
    },

    // 上拉加载更多
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
      // 完成上拉加载更多后调用
      this.$refs.scroll.finishPullUp()
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // console.log(res.data.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; /* 把默认值0改成1，传1 */
      getHomeGoods(type, page).then((value) => {
        // console.log(value);
        // console.log(value.data.data.list);
        this.goods[type].list.push(...value.data.data.list); /* ...扩展运算符 */
        this.goods[type].page += 1;
      });
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-bottom: 49px; */
  height: 100vh;    
  /* home高度等于视口高度百分之百 */
  /* 为什么要设置home大小： 因为一旦下面的content开启绝对定位就脱离文档流了，home就没有内容了，所以高度会显示为0，
    因此将他的大小设置成视口大小，这样才能显示里面的内容
  */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint); /* 使用自定义的变量 */
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  position: sticky; /* 移动端随便使用这个属性 */
  top: 44px;
  background-color: white;
  z-index: 9;
}

.content {
  /* 计算方案 */
  /* height: calc(100% - 96px);
  margin-top: 44px; */

  /* 定位方案 */
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>