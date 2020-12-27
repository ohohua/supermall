<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from '@better-scroll/pull-up'


export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    // 这里将refresh()进行一层封装，便于Home调用
    refresh() {
      // console.log('---');
       this.scroll && this.scroll.refresh()
      // 图片加载可能很快（在组件create阶段）， 甚至在组件被挂载之前就请求完毕了，这时候在GoodsListItem里面的@load就将事件发送到事件总线上了。但是此时this.sroll 为undefine ， 就会报错，所以这样处理 &&
    },
    // 将scrollTo进行一次封装，
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 完成上拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted() {
      // 通过静态方法 BScroll.use() 注册插件
      BScroll.use(Pullup)
      
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // observeDOM: true,
        // 并不是所有页面都需要实施监听位置，盲目监听只会影响性能
        probeType: this.probeType, 
        pullUpLoad: this.pullUpLoad
      });

      // 监听滚动距离，并将具体以自定义事件的形式发送出去

      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
        })
      }
      //完成上拉加载更多
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad')
        })
      }
  },

};
</script>
<style scoped>

</style>