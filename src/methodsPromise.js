import isObject from './isObject'
import hijack from './hijack'

export default (opt = {}) => {
  // Configure the hook function
  if (typeof opt.hookName !== 'string') {
    opt.hookName = '$promise'
  }
  // Global hook function
  if (typeof opt.promise !== 'function') {
    opt.promise = (mp) => {
      mp.catch((err) => {
        console.log(err)
      })
    }
  }

  return {
    beforeCreate () {
      const { methods } = this.$options
      if (!isObject(methods)) return
      Object.keys(methods).forEach((k) => {
        let fn = methods[k]
        if (fn._vueMethodsPromise !== true && typeof fn === 'function' && k !== opt.hookName) {
          methods[k] = hijack(opt, fn)
        }
      })
    }
  }
}
