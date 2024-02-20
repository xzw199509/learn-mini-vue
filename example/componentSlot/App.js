import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js';


export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App")
    // const foo = h(Foo, {}, h("p", {}, "123"),) // 单值
    // const foo = h(Foo, {}, [h("p", {}, "123"),h("p", {}, "1234")]) // 多值
    // 具名插槽
    const foo = h(Foo, {}, {
      header: ({age}) => h("p", {}, "header" + age),
      footer: () => h("p", {}, "footer")
    })
    return h('div', {}, [app, foo])
  },
  setup() {
    return {}
  },
}
