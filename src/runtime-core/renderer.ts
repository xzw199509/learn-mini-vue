import { effect } from "../reactivity/effect"
import { EMPTY } from "../shared"
import { ShapeFlags } from "../shared/shapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { createAppApi } from "./createApp"

import { Fragment, Text } from "./vnode"


export function createRenderer(options) {
    const {
        createElement: hostCreateElement,
        patchProp: hostPatchProp,
        insert: hostInsert,
        remove: hostRemove,
        setElementText:hostSetElementText
    } = options

    function render(vnode, container) {
        patch(null, vnode, container, null)
    }
    // n1 => old
    // n2 => new
    function patch(n1, n2, container, parentComponent) {
        // 去处理组件
        const { type, shapeFlag } = n2

        // Fragment
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, parentComponent)
                break;
            case Text:
                processText(n1, n2, container)
                break;
            default:
                // 判断 是不是 element
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1, n2, container, parentComponent)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container, parentComponent)
                }
                break;
        }
    }
    function processText(n1, n2, container) {
        const { children } = n2
        const textNode = n2.el = document.createTextNode(children)
        container.append(textNode)
    }
    function processFragment(n1, n2, container, parentComponent) {
        mountChildren(n2.children, container, parentComponent)
    }
    function processElement(n1, n2, container, parentComponent) {
        if (!n1) {
            mountElement(n2, container, parentComponent)
        } else {
            patchElement(n1, n2, container,parentComponent)
        }

    }
    function patchElement(n1, n2, container,parentComponent) {
        const oldProp = n1.props || EMPTY
        const newProp = n2.props || EMPTY
        const el = n2.el = n1.el
        patchChildren(n1, n2, el,parentComponent)
        patchProps(el, oldProp, newProp)

    }
    function patchChildren(n1, n2, container,parentComponent) {
        const prevShapeFlag = n1.shapeFlag
        const { shapeFlag } = n2
        const c1 = n1.children
        const c2 = n2.children
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                // 1、 清空老节点
                hostRemove(n1.children)
                // 2、 设置text
                hostSetElementText(container, c2)
            }
            if (c1!==c2) {
                hostSetElementText(container,c2)
            }
        }else{
            if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                hostSetElementText(container,"")
                mountChildren(c2,container,parentComponent)
            }
        }
    }
    function patchProps(el, oldProps, newProps) {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                const prevProp = oldProps[key]
                const nextProp = newProps[key]
                if (prevProp !== nextProp) {
                    hostPatchProp(el, key, prevProp, nextProp)
                }
            }
            if (oldProps !== EMPTY) {
                for (const key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null)
                    }
                }
            }

        }

    }
    function mountElement(vnode: any, container: any, parentComponent) {
        // vnode => element =>div
        const el = (vnode.el = hostCreateElement(vnode.type))
        const { children, shapeFlag } = vnode

        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode.children, el, parentComponent)
        }
        const { props } = vnode
        for (const key in props) {
            const val = props[key]
            hostPatchProp(el, key, null, val)
        }
        hostInsert(el, container)

    }
    function mountChildren(children, container, parentComponent) {
        children.forEach(v => {
            patch(null, v, container, parentComponent)
        })
    }
    function processComponent(n1, n2: any, container: any, parentComponent) {
        mountComponent(n2, container, parentComponent)
    }
    function mountComponent(initiaVNnode: any, container: any, parentComponent) {
        const instance = createComponentInstance(initiaVNnode, parentComponent)
        setupComponent(instance)
        setupRenderEffect(instance, initiaVNnode, container)
    }
    function setupRenderEffect(instance: any, initiaVNnode, container: any) {
        effect(() => {
            if (!instance.isMounted) {
                const { proxy } = instance
                const subTree = instance.subTree = instance.render.call(proxy)

                patch(null, subTree, container, instance)

                // element => mount 所有的element都挂载结束
                initiaVNnode.el = subTree.el
                instance.isMounted = true
            } else {
                console.log("update");
                
                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                const prevSubTree = instance.subTree
                instance.subTree = subTree

                // console.log("current", subTree);
                // console.log("prev", prevSubTree);
                patch(prevSubTree, subTree, container, instance)
            }

        })

    }
    return {
        createApp: createAppApi(render)
    }
}