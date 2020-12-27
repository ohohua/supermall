<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @navClick = "navClick" ref="detailnavbar"/>
      <scroll class="content" ref="scroll" @scroll="listenScroll" :probe-type="3">
        <detail-swiper :top-images="topImages" @detailImgLoad="detailImgLoad"/>
        <detail-base-info :goods="goodsinfo" />
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @loadImgEvent="loadImgEvent"/>
        <detail-parma-info :paramInfo="goodsprama" ref="detailparmainfo"/>
        <detail-comment-info :comment="commentInfo" ref="detailcommentinfo"/>
        <goods-list :Goods="recomments" ref="detailrecommend"/>
      </scroll>
      <back-top @click.native="backTopclick" v-show="isShowBackTop"/>
      <detial-bottom-bar @joinCart="joinToCart"/>
    </div>
</template>

<script>
import DetailNavBar from './childcompons/DetailNavBar'
import DetailSwiper from './childcompons/DetailSwiper'
import DetailBaseInfo from './childcompons/DetailBaseInfo'
import DetailShopInfo from './childcompons/DetailShopInfo'
import DetailGoodsInfo from './childcompons/DetailGoodsInfo'
import DetailParmaInfo from './childcompons/DetialParmaInfo'
import DetailCommentInfo from './childcompons/DetailCommentInfo.vue'
import DetialBottomBar from './childcompons/DetialBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/Goods/GoodsList'
import { getDatailData, recomment, Goods, Shop, GoodsParam } from 'network/detail'
import { debounce } from 'common/utils/debounce'
import { BackTopMixin } from 'common/mixin.js'
import { mapActions } from 'vuex'
export default {
  name: 'Detail',
  mixins: [BackTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParmaInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetialBottomBar,
    
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsinfo: {},
      shop: {},
      detailInfo: {},
      goodsprama: {},
      commentInfo: {},
      recomments: [],
      themeTopY: [],
      itemImgListener: null,
      getThemeTopY: null,
    };
  },
  methods: {
    loadImgEvent() {
      this.$refs.scroll.refresh()
    },
    detailImgLoad() {
      this.$refs.scroll.refresh()
    },
    navClick(key) {
      // console.log(key);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[key], 200)
    },
    // 监听滚动位置，让bav-bar对应变色
    listenScroll(position) {
      if(-position.y >= this.themeTopY[0] && -position.y < this.themeTopY[1]) {
        this.$refs.detailnavbar.currentkey = 0
      }else if(-position.y >= this.themeTopY[1] && -position.y < this.themeTopY[2]) {
         this.$refs.detailnavbar.currentkey = 1
      }else if(-position.y >= this.themeTopY[2] && -position.y < this.themeTopY[3]) {
         this.$refs.detailnavbar.currentkey = 2
      }else if(-position.y >= this.themeTopY[3] ) {
         this.$refs.detailnavbar.currentkey = 3
      }
      // 1. backTop是否出现,mixin里面的contentScroll
      this.contentScroll(position)
    },
    joinToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsinfo.title
      product.desc = this.goodsinfo.desc
      product.price = this.goodsinfo.lowNowPrice
      product.iid = this.iid

      this.addCart(product).then(value => {
        // $toast是自定义的组件
        this.$toast.show(value, 1000)
      })
    },

    // 将actions中的addCart方法映射过来
    ...mapActions(['addCart'])
    
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    getDatailData(this.iid).then(value => {
      // console.log(value);
      const data = value.data.result
      this.topImages = data.itemInfo.topImages
      // 2.1 获取商品信息
      
      this.goodsinfo = new Goods(data.itemInfo, data.columns, data.shopInfo)
      // 2.2 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // 2.3 获取详情页商品的详细信息
      this.detailInfo = data.detailInfo
      // 2.3 获取参数信息
      this.goodsprama = new GoodsParam(data.itemParams.info, data.itemParams.rule )
      // 2.4 获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // 在this.nextTick()里面不行是因为根据最新的数据将DOM已经渲染出来了，但是可能当前的图片还没有加载完
      // this.$nextTick(() => {
      // this.themeTopY.push(0)
      // this.themeTopY.push(this.$refs.detailparmainfo.$el.offsetTop)
      // this.themeTopY.push(this.$refs.detailcommentinfo.$el.offsetTop)
      // this.themeTopY.push(this.$refs.detailrecommend.$el.offsetTop)
      // console.log(this.themeTopY);

      // })
    })

    // 3.请求推荐数据
    recomment().then(value => {
      // console.log(value);
      this.recomments = value.data.data.list
    })
  },
  mounted () {
    // 1.图片加载完的事件监听
    const newrefresh = debounce(this.$refs.scroll.refresh, 100)
    this.getThemeTopY = debounce(() => {
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.detailparmainfo.$el.offsetTop-52)
      this.themeTopY.push(this.$refs.detailcommentinfo.$el.offsetTop-52)
      this.themeTopY.push(this.$refs.detailrecommend.$el.offsetTop-52)
      // console.log(this.themeTopY);
    },100)
    // 监听事件总线
    this.itemImgListener = () => {
      newrefresh()
      // 图片加载完完成了，在这里来每个部分的获取高度offsetTop 
      this.getThemeTopY()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  beforeDestroy () {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
 }
</script>
<style scoped>
 #detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

 .content {
   height: calc(100% - 44px - 49px);
   overflow: hidden;
 }
</style>