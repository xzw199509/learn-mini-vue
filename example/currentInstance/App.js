import { getCurrentInstance, h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js';


export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "currentInstance demo")
    const foo = h(Foo)
    return h('div', {}, [app, foo])
  },
  setup() {
    const instance = getCurrentInstance()
    console.log("App" , instance);
    return {}
  },
}
