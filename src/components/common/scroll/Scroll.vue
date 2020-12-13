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
       this.scroll.refresh()
    },
    // 将scrollTo进行一次封装，
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    // 完成上拉加载更多
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
  mounted() {
      // 通过静态方法 BScroll.use() 注册插件
      BScroll.use(Pullup)
      
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 并不是所有页面都需要实施监听位置，盲目监听只会影响性能
        probeType: this.probeType, 
        pullUpLoad: this.pullUpLoad
      });

      // 监听滚动距离，并将具体以自定义事件的形式发送出去
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      //完成上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullUpLoad')
      })
  },

};
</script>
<style scoped>

</style>