import { ShapeFlags } from '../shared/shapeFlags';
export function createVnode(type, props?, children?) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapeFlag(type),
        el: null
    }
    if (typeof children === "string") {
        vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN
    }else if (Array.isArray(children)){
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN 
    }
    return vnode
}

function getShapeFlag(type) {
    return typeof type === "string" ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}
