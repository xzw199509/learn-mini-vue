import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment } from "./vnode"

export function render(vnode, container) {
    patch(vnode, container)
}

function patch(vnode, container) {
    // 去处理组件
    const { type, shapeFlag } = vnode

    // Fragment
    switch (type) {
        case Fragment:
            processFragment(vnode, container)
            break;
        default:
            // 判断 是不是 element
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container)
            }
            break;
    }
}
function processFragment(vnode, container) {
    mountChildren(vnode, container)
}
function processElement(vnode, container) {
    mountElement(vnode, container)
}
function mountElement(vnode: any, container: any) {
    // vnode => element =>div
    const el = (vnode.el = document.createElement(vnode.type))
    const { children, shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el)
    }
    const { props } = vnode
    for (const key in props) {
        console.log(key);
        const isOn = (key: string) => /^on[A-Z]/.test(key)
        const val = props[key]
        if (isOn(key)) {
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event, val)
        } else {
            el.setAttribute(key, val)
        }
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

