import { h } from '../../lib/guide-mini-vue.esm.js'
window.self = null
export const App = {
  render() {
    // ui
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log("onClick run");
        },
        onMouseDown() {
          console.log("onMouseDown run");
        }
      },
      'hi,' + this.msg

      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'hi'), 'hi,' + this.msg]
    )
  },
  setup() {
    //   composition api
    return {
      msg: 'mini-vue',
    }
  },
}
