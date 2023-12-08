import { hasChanged, isObject } from "../shared"
import { trackEffects, triggerEffects, isTracking } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
  private _value: any
  public dep
  private _rawValue: any
  public __v_isRef = true
  constructor(value) {
    this._rawValue = value
    this._value = isObject(value) ? reactive(value) : value

    this.dep = new Set()
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = isObject(newValue) ? reactive(newValue) : newValue
      triggerEffects(this.dep)
    }

  }
}
function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep)
  }
}
export function ref(value) {
  return new RefImpl(value)
}

export function isRef(ref) {
  return !!ref.__v_isRef
}
export function unRef(ref){
  // 看看是不是 ref => ref.value
  return isRef(ref)?ref.value:ref
}