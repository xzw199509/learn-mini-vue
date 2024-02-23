import { h, ref } from '../../lib/guide-mini-vue.esm.js'

export const App = {
  setup() {
    const count = ref(0)
    const onClick = () => {
      console.log("onClick run");
      count.value++
    }
    const onChangePropsDemo1 = () => {
      props.value.foo = "new-foo"
    }
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: "foo"
      }
    }
    const props = ref({
      foo: "foo",
      bar: "bar"
    })
    return {
      count,
      onClick,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
      props
    }
  },
  render() {
    return h("div", { id: "root", ...this.props },
      [
        h("div", {}, "count:" + this.count),
        h("button", { onClick: this.onClick }, "click"),
        h("button", { onClick: this.onChangePropsDemo1 }, "值改变-修改"),
        h("button", { onClick: this.onChangePropsDemo2 }, "值变undefined-删除"),
        h("button", { onClick: this.onChangePropsDemo3 }, "key在新的没有了-删除"),
      ]

    )
  },
}
