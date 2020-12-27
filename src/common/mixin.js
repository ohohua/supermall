import BackTop from 'components/content/backtop/BackTop'
export const BackTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    /**
     * 返回顶部
     * scrollTo(0, 0, 500),better-scroll 方法
     * 参数分别是x， y， 返回所用的时间
     */
    backTopclick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {

      this.isShowBackTop = (-position.y) > 1000
    }
  }
}