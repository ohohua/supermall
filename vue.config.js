module.exports = {
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'common': '@/common'
      }
    }
  }
}