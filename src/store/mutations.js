import * as types from './mutations-types'
export default {
  // mutations里面操作最好是单一的,所以把多余的判断操作放在actions里面
  [types.ADD_COUNTER](state, payload) {
    payload.counter++
  },
  [types.ADD_TOCAR](state, payload) {
    payload.checked = false
    state.GoodList.push(payload)
  },
  [types.CANCEL_SELECTOR](state) {
    state.GoodList.forEach(item => item.checked = false)
  },
  [types.ALL_SELECTOR](state) {
    state.GoodList.forEach(item => item.checked = true)
  }
}