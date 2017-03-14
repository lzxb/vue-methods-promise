import test from 'ava'
import methodsPromise from '../../src/methodsPromise'
import isObject from '../../src/isObject'

test('Hijack methods', (t) => {
  const mixin = methodsPromise()
  t.true(isObject(mixin))
  t.is(typeof mixin.beforeCreate, 'function')
  t.is(mixin.beforeCreate.name, 'beforeCreate')
  const self = {
    $options: {
      methods: {
        test () {

        },
        $promise () {

        },
        name: 'Test',
        init () {

        }
      }
    }
  }
  self.$options.methods.init._vueMethodsPromise = true
  mixin.beforeCreate.call(self)
  const methods = self.$options.methods
  t.is(methods.test.name, 'vueMethodsPromise')
  t.is(methods.name, 'Test')
  t.is(methods.$promise.name, '$promise')
  t.is(methods.init.name, 'init')
})
