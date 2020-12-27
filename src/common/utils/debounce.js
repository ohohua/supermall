// 防抖函数
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {

      func.apply(this, args) // 来达到func === refresh 的效果
        // console.log(this); // 打印undefine , 那是因为要等到返回的这个匿名函数真正的执行的时候this才会被确定下来
    }, delay);
  }

}