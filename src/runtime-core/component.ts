import { proxyRefs } from "../reactivity"
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode, parent) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        provides: parent ? parent.provides : {},
        parent,
        isMounted: false,
        subTree: {},
        emit: () => { }
    }
    component.emit = emit.bind(null, component) as any
    return component
}
export function setupComponent(instance) {
    // todo
    initProps(instance, instance.vnode.props)
    initSlots(instance, instance.vnode.children)
    setupStatefulComponent(instance)
}
function setupStatefulComponent(instance: any) {
    const Component = instance.type
    // ctx
    instance.proxy = new Proxy({
        _: instance
    }, PublicInstanceProxyHandlers)
    const { setup } = Component
    if (setup) {
        setCurrentInstance(instance)
        const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit })
        setCurrentInstance(null)
        handleSetupResult(instance, setupResult)
    }
   

}

function handleSetupResult(instance, setupResult: any) {
    // function Object
    // TODO function
    if (typeof setupResult === "object") {

        instance.setupState = proxyRefs(setupResult)
    }
    finisComponentSetup(instance)
}


function finisComponentSetup(instance: any) {
    const Component = instance.type

    instance.render = Component.render

}

let currentInstance = null
export function getCurrentInstance() {
    return currentInstance
}
function setCurrentInstance(instance) {
    currentInstance = instance
}