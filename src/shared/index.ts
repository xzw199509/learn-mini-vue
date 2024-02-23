export const extend = Object.assign

export const EMPTY = {}

export const isObject = (val) => {
    return val !== null && typeof val === 'object'
}

export const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue)
}
export const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c: String) => {
        return c ? c.toUpperCase() : ""
    })
}
const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
export const toHandlerKey = (str: string) => {
    return str ? "on" + capitalize(str) : ""
}