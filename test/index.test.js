import test from 'ava'
import jsdom from 'jsdom'

const browser = () => { // Create a browser
  return new Promise((resolve, reject) => {
    jsdom.env(
      '<div id="app"></div>',
      ['https://cdn.jsdelivr.net/vue/latest/vue.js', './dist/vue-methods-promise.js'],
      (err, window) => {
        if (err) return reject(err)
        resolve(window)
      }
    )
  })
}

test('Page introduction install', (t) => {
  return browser().then(({ vueMethodsPromise }) => {
    t.true(typeof vueMethodsPromise === 'function')
  })
})

test('Global hook promise', (t) => {
  return browser()
    .then(({ Vue, vueMethodsPromise }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject({ msg: 'Test timeout' }), 3000)
        vueMethodsPromise(Vue, {
          promise: (mp) => mp.then(resolve)
        })
        return new Vue({
          el: '#app',
          mounted () {
            this.init()
          },
          methods: {
            init () {
              return new Promise((resolve, reject) => resolve())
            }
          }
        })
      })
    })
})

test('Component hook promise', (t) => {
  return browser()
    .then(({ Vue, vueMethodsPromise }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject({ msg: 'Test timeout' }), 3000)
        vueMethodsPromise(Vue)
        return new Vue({
          el: '#app',
          mounted () {
            this.init()
          },
          methods: {
            init () {
              return new Promise((resolve, reject) => resolve())
            },
            $promise: resolve
          }
        })
      })
    })
})

test('Component to global hook promise', (t) => {
  return browser()
    .then(({ Vue, vueMethodsPromise }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject({ msg: 'Test timeout' }), 3000)
        vueMethodsPromise(Vue, {
          promise: (mp) => mp.then(resolve)
        })
        return new Vue({
          el: '#app',
          mounted () {
            this.init()
          },
          methods: {
            init () {
              return new Promise((resolve, reject) => resolve())
            },
            $promise: (mp) => {
              return mp
            }
          }
        })
      })
    })
})

test('Component hook set name', (t) => {
  return browser()
    .then(({ Vue, vueMethodsPromise }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject({ msg: 'Test timeout' }), 3000)
        vueMethodsPromise(Vue, {
          hookName: '$Promise'
        })
        return new Vue({
          el: '#app',
          mounted () {
            this.init()
          },
          methods: {
            init () {
              return new Promise((resolve, reject) => resolve())
            },
            $Promise: resolve
          }
        })
      })
    })
})

test('Component hook not loop', (t) => {
  return browser()
    .then(({ Vue, vueMethodsPromise }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject({ msg: 'Test timeout' }), 3000)
        vueMethodsPromise(Vue)
        return new Vue({
          el: '#app',
          mounted () {
            this.init()
          },
          data () {
            return {
              count: 0
            }
          },
          methods: {
            init () {
              return new Promise((resolve, reject) => resolve())
            },
            $promise (mp) {
              this.count++
              setTimeout(() => {
                if (this.count === 1) {
                  resolve()
                } else {
                  reject({ msg: 'loop' })
                }
              }, 500)
              return mp
            }
          }
        })
      })
    })
})

test('Vue methods default return value', (t) => {
  return browser().then(({ Vue, vueMethodsPromise }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject({ msg: 'Test timeout' }), 3000)
      vueMethodsPromise(Vue)
      return new Vue({
        el: '#app',
        mounted () {
          if (this.count() === 100) return resolve()
        },
        methods: {
          count () {
            return 100
          }
        }
      })
    })
  })
})
