import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment } from "./vnode"

export function render(vnode, container) {
    patch(vnode, container, null)
}

function patch(vnode, container, parentComponent) {
    // 去处理组件
    const { type, shapeFlag } = vnode

    // Fragment
    switch (type) {
        case Fragment:
            processFragment(vnode, container, parentComponent)
            break;
        default:
            // 判断 是不是 element
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container, parentComponent)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container, parentComponent)
            }
            break;
    }
}
function processFragment(vnode, container, parentComponent) {
    mountChildren(vnode, container, parentComponent)
}
function processElement(vnode, container, parentComponent) {
    mountElement(vnode, container, parentComponent)
}
function mountElement(vnode: any, container: any, parentComponent) {
    // vnode => element =>div
    const el = (vnode.el = document.createElement(vnode.type))
    const { children, shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el, parentComponent)
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
function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(v => {
        patch(v, container, parentComponent)
    })
}
function processComponent(vnode: any, container: any, parentComponent) {
    mountComponent(vnode, container, parentComponent)
}
function mountComponent(initiaVNnode: any, container: any, parentComponent) {
    const instance = createComponentInstance(initiaVNnode, parentComponent)
    setupComponent(instance)
    setupRenderEffect(instance, initiaVNnode, container)
}
function setupRenderEffect(instance: any, initiaVNnode, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, container, instance)

    // element => mount 所有的element都挂载结束
    initiaVNnode.el = subTree.el
}

