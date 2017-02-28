import methodsPromise from './methodsPromise'

export default function install (Vue, opt) {
  if (install.installed) return // already installed

  Vue.mixin(methodsPromise(opt))
}
