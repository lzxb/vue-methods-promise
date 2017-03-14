import test from 'ava'
import hijack from '../../src/hijack'

test('Return function', (t) => {
  const opt = {
    hookName: '$promise',
    promise (mp) {

    }
  }
  const method = hijack(opt, function () {

  })
  t.is(method.name, 'vueMethodsPromise')
  t.true(method._vueMethodsPromise)
})

test('Component hook promise call', (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Test timeout')), 3000)
    const opt = {
      hookName: '$promise',
      promise () { }
    }
    const method = hijack(opt, function () {
      return Promise.resolve(true)
    })
    method.call({
      $promise (mp) {
        resolve(true)
      }
    })
  })
})

test('Component hook to global hook promise call', (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Test timeout')), 3000)
    const opt = {
      hookName: '$promise',
      promise () {
        resolve(true)
      }
    }
    const method = hijack(opt, function () {
      return Promise.resolve(true)
    })
    method.call({
      $promise (mp) {
        return mp
      }
    })
  })
})

test('Not Global hook promise call', (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 3000)
    const opt = {
      hookName: '$promise',
      promise () {
        reject(new Error('Test fail'))
      }
    }
    const method = hijack(opt, function () {
      return Promise.resolve(true)
    })
    method.call({
      $promise (mp) {
      }
    })
  })
})

test('Global hook promise call', (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Test timeout')), 3000)
    const opt = {
      hookName: '$promise',
      promise () {
        resolve(true)
      }
    }
    const method = hijack(opt, function () {
      return Promise.resolve(true)
    })
    method.call({})
  })
})

test('Hook return false not global hook promise call', (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 3000)
    const opt = {
      hookName: '$promise',
      promise () {
        reject(new Error('Test fail'))
      }
    }
    const method = hijack(opt, function () {
      return false
    })
    method.call({})
  })
})
