
// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = { text: 'hello' }

// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到存储副作用的函数的桶中
    bucket.add(effect)
    return target[key]
  },
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal
    // 把副作用函数 从桶里取出并执行
    bucket.forEach((fn) => {
      fn()
    })
    // 返回 true 代表设置操作成功
    return true
  },
})

// 副作用函数
function effect() {
  document.body.innerText = obj.text
}

effect()

setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000);