import { ShapeFlags } from "../shared/shapeFlags";

export function initSlots(instance, children) {
    // children is array
    // instance.slots = Array.isArray(children) ? children : [children]
    // children is obj
    const { vnode } = instance
    if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
        normalizeObjectSlot(children, instance.slots)
    }

}

function normalizeObjectSlot(children, slots) {
    for (const key in children) {
        const value = children[key];
        slots[key] = (props) => normalizeSlotValue(value(props))
    }
}
function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value]
}