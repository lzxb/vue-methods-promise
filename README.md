[![Build Status](https://travis-ci.org/lzxb/vue-methods-promise.svg?branch=master)](https://travis-ci.org/lzxb/vue-methods-promise)
[![dependencies Status](https://david-dm.org/lzxb/vue-methods-promise/status.svg)](https://david-dm.org/lzxb/vue-methods-promise)
[![devDependencies Status](https://david-dm.org/lzxb/vue-methods-promise/dev-status.svg)](https://david-dm.org/lzxb/vue-methods-promise?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/npm/vue-methods-promise/badge.svg)](https://snyk.io/test/npm/vue-methods-promise)
[![npm](https://img.shields.io/npm/v/vue-methods-promise.svg?style=flat-square)](https://www.npmjs.com/package/vue-methods-promise) 
[![npm](https://img.shields.io/npm/dt/vue-methods-promise.svg?style=flat-square)](https://www.npmjs.com/package/vue-methods-promise)

# vue-methods-promise
```
Let Vue methods support promise
```

### Usage
- npm
```
npm install --save vue-methods-promise
```
```javascript
import Vue from 'vue'
import vueMethodsPromise from 'vue-methods-promise'

Vue.use(vueMethodsPromise, {
  hookName: '$promise', // Component default hook name
  promise: (mp) => { // Promise callback
    mp
      .catch(function (err) {
        console.log(mp)
      })
  }
})
```
-  html
```html
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>
  <script src="./dist/vue-methods-promise.js"></script>
  <script>
    vueMethodsPromise(Vue, {
      hookName: '$promise', // Component default hook name
      promise: function (mp) { // Promise callback
        mp
          .catch(function (err) {
            console.log(mp)
          })
      }
    })

    new Vue({
      el: '#app',
      mounted: function () {
        this.init()
      },
      methods: { // 
        init: function () {
          return new Promise(function (resolve, reject) {
            setTimeout(reject, 500)
          })
        },
        $promise (mp) { // Optional parameters. Component hook function
          return mp.then(function () {
            // 
          })
        }
      }
    })

  </script>
```
