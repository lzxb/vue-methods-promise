import isPromise from './isPromise'

export default function hijack (opt, native) {
  function vueMethodsPromise () {
    let back = native.apply(this, arguments)
    if (isPromise(back)) {
      if (typeof this[opt.hookName] === 'function') {
        let hookBack = this[opt.hookName](back)
        if (isPromise(hookBack)) {
          opt.promise.call(this, back)
        }
      } else {
        opt.promise.call(this, back)
      }
    }
    return back
  }
  vueMethodsPromise._vueMethodsPromise = true // 加个标记，避免重复劫持，导致栈溢出
  return vueMethodsPromise
}
