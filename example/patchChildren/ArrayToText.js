import { ref, h } from '../../lib/guide-mini-vue.esm.js'
const nextChildren = "newChildren"
const prevChildren = [h("div", {}, "A"), h("div", {}, "B")]

export default {
    name: "ArrayToText",
    setup() {
        const isChange = ref(false)
        window.isChange = isChange
        const onClick = () => {
            isChange.value = true
        }
        return {
            isChange,
            onClick
        }
    },
    render() {
        const self = this
        return self.isChange === true
            ? h("div", {onClick: this.onClick}, nextChildren)
            : h("div", {onClick: this.onClick}, prevChildren)
    }
}