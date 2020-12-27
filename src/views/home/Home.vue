<template>
  <div id="home">
    <nav-bar class="home-nav">
      <slot slot="center">购物街</slot>
    </nav-bar>
     <tab-control :title="['流行','新款','精选']"  
                   @SwitchClick="change" 
                   ref="tabcontrol1"
                   v-show="isTabFixed"
                   class="tab-control1"/>

    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3" 
            @pullUpLoad="loadMore"
            :pull-up-load="true">
      <!-- <home-swiper :banners='banners'/> -->
      <swiper :banners="banners" 
              @swiperimageload="swiperimageload"/>
      <home-recomend-view :recommends="recommends" />
      <feature-view />
      <tab-control :title="['流行','新款','精选']"  
                   @SwitchClick="change" 
                   ref="tabcontrol2"/><!-- 子组件传过来的自定义事件 -->
      <goods-list :Goods="goodsType.list" />
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
// import BackTop from 'components/content/backtop/BackTop.vue'

import NavBar from "components/common/navbar/NavBar";
import tabControl from "components/content/tabControl/tabControl";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { debounce } from 'common/utils/debounce'
import { BackTopMixin } from 'common/mixin.js'

export default {
  name: "home",
  mixins: [BackTopMixin],
  components: {
    Swiper,
    HomeRecomendView,
    FeatureView,
    NavBar,
    tabControl,
    GoodsList,
    Scroll,
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
      tabcontroloffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  computed: {
    goodsType() {
      return this.goods[this.currentType];
    },
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    change(key) {
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
      // 保持当前两个tabcontrol被选中的是一致的
      // 通过改变两tabcontrol内部的isActive来改变被选中的item
      this.$refs.tabcontrol1.isActive = key
      this.$refs.tabcontrol2.isActive = key
    },


    // 监听滚动距离
    contentScroll(position) {
      // 1. backTop是否出现
      this.isShowBackTop = (-position.y) > 1000 
      // 2. 滚动的距离是否大于tabcontrol 的 offsetTop
      this.isTabFixed = (-position.y) >= this.tabcontroloffsetTop
    },

    // 上拉加载更多
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
      // 完成上拉加载更多后调用
      this.$refs.scroll.finishPullUp()
    },

    // 监听轮播图加载完成 来计算tobcontrol的offsetTop
    swiperimageload() {
      // 获取tabControl的offsetTop
      // $el 可以拿到子组件里面所有的元素
      this.tabcontroloffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
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
  created() {
    // 1.请求多个数据
    this.getHomeMultiData();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完的事件监听
    const newrefresh = debounce(this.$refs.scroll.refresh, 100)
    // 监听事件总线
    this.itemImgListener = () => {
      newrefresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY)
    // 为什么将这里的动画时间设置成0， 就会返回顶部？？？
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
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
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.tab-control1 {
  position: relative;
  background-color: #fff;
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