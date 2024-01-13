import { h } from '../../lib/guide-mini-vue.esm.js'
export const App = {
  render() {
    // ui
    return h(
      'div',
      { id: 'root', class: ['red', 'hard'] },
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
