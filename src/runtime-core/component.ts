import { shallowReadonly } from "../reactivity/reactive"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {}
    }
    return component
}
export function setupComponent(instance) {
    // todo
    initProps(instance, instance.vnode.props)
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
        
        const setupResult = setup(shallowReadonly(instance.props))
        handleSetupResult(instance, setupResult)
    }

}

function handleSetupResult(instance, setupResult: any) {
    // function Object
    // TODO function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult
    }
    finisComponentSetup(instance)
}


function finisComponentSetup(instance: any) {
    const Component = instance.type

    instance.render = Component.render

}

