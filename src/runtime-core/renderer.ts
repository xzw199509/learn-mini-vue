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
    mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
    // vnode => element =>div
    const el = (vnode.el = document.createElement(vnode.type))
    const { children } = vnode

    if (typeof children === "string") {
        el.textContent = children
    } else if (Array.isArray(children)) {
        mountChildren(vnode, el)
    }
    const { props } = vnode
    for (const key in props) {
        const val = props[key]
        el.setAttribute(key, val)
    }
    container.append(el)

}
function mountChildren(vnode, container) {
    vnode.children.forEach(v => {
        patch(v, container)
    })
}
function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}
function mountComponent(initiaVNnode: any, container: any) {
    const instance = createComponentInstance(initiaVNnode)
    setupComponent(instance)
    setupRenderEffect(instance, initiaVNnode, container)
}
function setupRenderEffect(instance: any, initiaVNnode, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, container)

    // element => mount 所有的element都挂载结束
    initiaVNnode.el = subTree.el
}

