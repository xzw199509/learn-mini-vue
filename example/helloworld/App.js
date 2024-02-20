import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js';

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
        // onClick() {
        //   console.log("onClick run");
        // },
        // onMouseDown() {
        //   console.log("onMouseDown run");
        // }
      },
      [h("div", {}, "hi," + this.msg), h(Foo, {
        count: 1, onAdd(a,b) {
          console.log("onAdd run",a,b);
        },
        onAddFoo(){
          console.log("onAddFoo run");
        }
      })]
      // 'hi,' + this.msg
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
