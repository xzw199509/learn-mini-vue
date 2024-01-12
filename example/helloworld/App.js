import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {
  render() {
    // ui
    return h(
      'div',
      { id: "root", class: ["red", "hard"] },
      // 'hi,mini-vue'
      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "hi")]
    )

  },
  setup() {
    //   composition api
    return {
      msg: 'mini-vue',
    }
  },
}
