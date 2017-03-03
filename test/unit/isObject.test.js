import test from 'ava'
import isObject from '../../src/isObject'

test('Yes object', (t) => {
  t.true(isObject({}))
})

test('Not null', (t) => {
  t.false(isObject(null))
})

test('Not true', (t) => {
  t.false(isObject(true))
})

test('Not false', (t) => {
  t.false(isObject(false))
})

test('Not undefined', (t) => {
  t.false(isObject(undefined))
})

test('Not function', (t) => {
  t.false(isObject(function () {}))
})

test('Not array', (t) => {
  t.false(isObject([]))
})

test('Not array', (t) => {
  t.false(isObject([]))
})

test('Not regExp', (t) => {
  t.false(isObject(/\./))
})

test('Not class', (t) => {
  class Test {

  }
  t.false(isObject(Test))
})

test('Not int', (t) => {
  t.false(isObject(100))
})

test('Not float', (t) => {
  t.false(isObject(100.88))
})

test('Not negative int', (t) => {
  t.false(isObject(-100))
})

test('Not negative float', (t) => {
  t.false(isObject(-100.88))
})
