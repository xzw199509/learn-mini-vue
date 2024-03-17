import { ShapeFlags } from '../shared/shapeFlags';

export const Fragment = Symbol("Fragment")
export const Text = Symbol("Text")

export function createVnode(type, props?, children?) {
    const vnode = {
        type,
        props,
        children,
        key: props && props.key,
        component:null, // 用于实现组件更新
        shapeFlag: getShapeFlag(type),
        el: null
    }

    if (typeof children === "string") {
        vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN
    } else if (Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
    }

    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        if (typeof children === "object") {
            vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
        }
    }
    return vnode
}
export function createTextVNode(text: string) {
    return createVnode(Text, {}, text)
}

function getShapeFlag(type) {
    return typeof type === "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}
