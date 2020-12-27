/**
 * 在这里来手动封住一个插件，便于全局使用
 */
import Toast from './Toast'

const obj = {}

// 安装的时候会自动传入Vue对象
obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.new方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()

  // 3.将实例挂载到元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el就是对应的div，将实例添加到DOM中
  document.body.appendChild(toast.$el)

  // 5.给Vue原型添加上挂载后的实例
  Vue.prototype.$toast = toast
}

export default obj