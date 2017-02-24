import test from 'ava'
import jsdom from 'jsdom'

jsdom.env('https://vuejs.org/v2/guide/installation.html', ['https://vuejs.org/js/vue.js'], (err, window) => {
  console.log(err)
  console.log(window)
})

test('foo', async (t) => {

})
