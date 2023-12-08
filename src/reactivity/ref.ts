import { hasChanged } from "../shared"
import { trackEffects, triggerEffects, isTracking } from "./effect"

class RefImpl {
  private _value
  public dep
  constructor(value) {
    this._value = value
    this.dep = new Set()
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newValue) {
    if (hasChanged(newValue, this._value)) {
      this._value = newValue
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