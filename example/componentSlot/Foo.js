import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
    setup() {
        return {}
    },
    render() {
        const foo = h("div", {}, "foo")
        const age = 18
        // slot vnode.children
        return h("div", {}, [renderSlots(this.$slots, "header", { age }), foo, renderSlots(this.$slots, "footer")])
    }
}