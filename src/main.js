import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import Fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 安装toast插件,当然toast插件是自定义的。
// 调用Vue.use()的时候，会自动toast的install函数也就是obj对象
Vue.use(toast)

// 解决移动端300ms的延迟
Fastclick.attach(document.body)

// 使用图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder2.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')