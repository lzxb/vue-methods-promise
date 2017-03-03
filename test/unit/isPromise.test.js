import test from 'ava'
import isPromise from '../../src/isPromise'

test('Yes new Promise', (t) => {
  t.true(isPromise(new Promise((resolve, reject) => resolve())))
})

test('Yes Promise.resolve', (t) => {
  t.true(isPromise(Promise.resolve()))
})

test('Yes Promise.reject', (t) => {
  t.true(isPromise(Promise.reject(new Error('Error test')).catch((err) => err)))
})

test('Yes Promise.all', (t) => {
  t.true(isPromise(Promise.all([])))
})

test('Yes Promise.race', (t) => {
  t.true(isPromise(Promise.race([])))
})

test('Not object', (t) => {
  t.false(isPromise({}))
})

test('Not object.constructors', (t) => {
  t.false(isPromise({
    constructor: function Promise () {}
  }))
})

test('Not null', (t) => {
  t.false(isPromise(null))
})

test('Not true', (t) => {
  t.false(isPromise(true))
})

test('Not false', (t) => {
  t.false(isPromise(false))
})

test('Not undefined', (t) => {
  t.false(isPromise(undefined))
})

test('Not function', (t) => {
  t.false(isPromise(function () {}))
})

test('Not array', (t) => {
  t.false(isPromise([]))
})

test('Not array', (t) => {
  t.false(isPromise([]))
})

test('Not regExp', (t) => {
  t.false(isPromise(/\./))
})

test('Not class', (t) => {
  class Test {

  }
  t.false(isPromise(Test))
})

test('Not int', (t) => {
  t.false(isPromise(100))
})

test('Not float', (t) => {
  t.false(isPromise(100.88))
})

test('Not negative int', (t) => {
  t.false(isPromise(-100))
})

test('Not negative float', (t) => {
  t.false(isPromise(-100.88))
})
