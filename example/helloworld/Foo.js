import { h } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
    setup(props, { emit }) {
        // console.log(props);
        // props.count++
        // console.log(props);
        const emitAdd = () => {
            console.log("emitAdd run");
            emit("add", 1, 2)
            emit("add-foo")
        }
        return {
            emitAdd
        }
    },
    render() {
        const btn = h("button", { onClick: this.emitAdd }, "emitAdd")
        const foo = h("div", {}, "foo")
        return h("div", {}, [foo, btn])
    }
}