export default {
  addCart(context, payload) {
    // 查找之前看数组中是否有该商品
    let oldProduct = context.state.GoodList.find(item => payload.iid === item.iid)

    return new Promise((resolve, reject) => {
      // 如果当前商品已经存在
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('商品已经已经存在')
      } else {
        // 如果没有该商品，新添加
        payload.counter = 1
        context.commit('addTocar', payload)
        resolve('商品添加成功')
      }
    })
  }
}