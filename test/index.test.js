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
