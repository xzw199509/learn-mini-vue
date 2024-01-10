import { render } from "./renderer"
import { createVnode } from "./vnode"

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先 vnode
            // component => vnode
            // 所有的逻辑操作 都基于 vnode 做处理
            const vnode = createVnode(rootComponent)

            render(vnode, rootContainer)
        }
    }
}