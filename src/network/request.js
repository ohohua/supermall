import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, reason => {
    console.log(reason);
  })

  // 2.2相应拦截
  instance.interceptors.request.use(config => {
      return config
    }, reason => {
      console.log(reason);
    })
    // 3.发送真正的网络请求
  return instance(config)
}