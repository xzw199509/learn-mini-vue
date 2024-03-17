import { ref, h } from '../../lib/guide-mini-vue.esm.js'




// 1. 左侧的对比
// (a b) c
// (a b) d e

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "E" }, "E")
// ]

// 2. 右侧的对比
// a (b c)
// e d (b c)

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
// ]
// const nextChildren = [
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
// ]

// 3. 左侧的对比 长度增加
// (a b) 
// (a b) c 

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),

// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
// ]
// 4. 右侧的对比长度增加
// (a b) 
// c(a b) 

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),

// ]
// const nextChildren = [
//     h("div", { key: "C" }, "C"),
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),

// ]

// 5. 长度减少
// (a b) c d
// (a b) 

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
//     h("div", { key: "D" }, "D"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),

// ]

// 5. 中间部分不同 并且 C 位置不同
// a b (c d) f g
// a b (e c) f g

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C", id:"c-prev" }, "C"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "C",id:"c-next" }, "C"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]

// 5.1.1

// 中间部分 老的比新的多，那么多出来的直接可以被干掉（优化删除逻辑）
// a b (c e d) f g
// a b (e c) f g

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C", id:"c-prev" }, "C"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "C",id:"c-next" }, "C"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]

// 5.1.1

// 中间部分 老的比新的多，那么多出来的直接可以被干掉（优化删除逻辑）
// a b (c e d) f g
// a b (e c) f g


// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C", id:"c-prev" }, "C"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "C",id:"c-next" }, "C"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]

// 中间部分 老的比新的多，那么多出来的直接可以被干掉（优化删除逻辑）
// a b (c e d) f g
// a b (e c) f g


// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "C" }, "C"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]

// const prevChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "C" }, "C"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]
// const nextChildren = [
//     h("div", { key: "A" }, "A"),
//     h("div", { key: "B" }, "B"),
//     h("div", { key: "E" }, "E"),
//     h("div", { key: "C" }, "C"),
//     h("div", { key: "D" }, "D"),
//     h("div", { key: "F" }, "F"),
//     h("div", { key: "G" }, "G"),
// ]



const prevChildren = [
    h("div", { key: "A" }, "A"),
    h("div", { key: "B" }, "B"),
    h("div", { key: "C" }, "C"),
    h("div", { key: "D" }, "D"),
    h("div", { key: "E" }, "E"),
    h("div", { key: "Z" }, "Z"),
    h("div", { key: "F" }, "F"),
    h("div", { key: "G" }, "G"),
]
const nextChildren = [
    h("div", { key: "A" }, "A"),
    h("div", { key: "B" }, "B"),

    h("div", { key: "D" }, "D"),
    h("div", { key: "C" }, "C"),

    h("div", { key: "Y" }, "Y"),
    h("div", { key: "E" }, "E"),
    h("div", { key: "F" }, "F"),
    h("div", { key: "G" }, "G"),
]
export default {
    name: "ArrayToArray",
    setup() {
        const isChange = ref(false)
        window.isChange = isChange
        return {
            isChange
        }
    },
    render() {
        const self = this
        return self.isChange === true
            ? h("div", {}, nextChildren)
            : h("div", {}, prevChildren)
    }
}