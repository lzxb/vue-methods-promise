import isPromise from './isPromise'

export default (opt = {}) => {
  // Configure the hook function
  if (typeof opt.hookName !== 'string') {
    opt.hookName = '$promise'
  }
  // Global hook function
  if (typeof opt.promise !== 'function') {
    opt.promise = () => {}
  }

  return {
    beforeCreate () {
      const { methods } = this.$options
      if (!Object.prototype.toString.call(methods) === '[object Object]') return
      Object.keys(methods).forEach((k) => {
        let item = methods[k]
        if (typeof item === 'function' && k !== opt.hook) {
          methods[k] = (...arg) => {
            let back = item.apply(this, arg)
            if (isPromise(back)) {
              if (typeof this[opt.hookName] === 'function') {
                if (isPromise(this[opt.hookName](back))) {
                  opt.promise.call(this, back)
                }
              } else {
                opt.promise.call(this, back)
              }
            }
          }
        }
      })
    }
  }
}
