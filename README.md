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
```
npm install --save vue-methods-promise
```
```javascript
// Installation
import Vue from 'vue'
import vueMethodsPromise from 'vue-methods-promise'

Vue.use(vueMethodsPromise, {
  hookName: '$promise', // Component default hook name
  promise: (mp) => { // Promise callback
    mp
      .then((function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err.msg) // Test error
      })
  }
})

// Usage
export default {
  mounted () {
    this.test()
  },
  methods: { // All return Promise type, will be dealt with
    test () {
      return Promise.reject(new Error({ msg: 'Test error' }))
    }
  }
}

```