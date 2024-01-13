import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {}
    }
    return component
}
export function setupComponent(instance) {
    // todo
    // initProps()
    setupStatefulComponent(instance)
}
function setupStatefulComponent(instance: any) {
    const Component = instance.type

    // ctx
    instance.proxy = new Proxy({
        _:instance
    }, PublicInstanceProxyHandlers)
    const { setup } = Component
    if (setup) {
        const setupResult = setup()
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

