import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
    patch(vnode, container)
}

function patch(vnode, container) {
    // 去处理组件
    // 判断 是不是 element
    if (typeof vnode.type === "string") {
        processElement(vnode, container)
    } else if ((vnode.type)) {
        processComponent(vnode, container)
    }

}
function processElement(vnode, container) {
    const el = document.createElement(vnode.type)
    const { children } = vnode

    if (typeof children === "string") {
        el.textContent = children
    } else if (Array.isArray(children)) {
        children.forEach(v => {
            patch(v, el)
        })
    }
    const { props } = vnode
    for (const key in props) {
        const val = props[key]
        el.setAttribute(key, val)
    }
    container.append(el)
}
function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}
function mountComponent(vnode: any, container: any) {
    const instance = createComponentInstance(vnode)
    setupComponent(instance)
    setupRenderEffect(instance, container)
}
function setupRenderEffect(instance: any, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, container)
}

