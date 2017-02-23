const path = require('path')
const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')

module.exports = {
    entry: 'src/main.js',
    moduleName: 'vuePromises',
    format: 'umd',
    dest: 'dist/vue-promises.js',
    plugins: [
        eslint(),
        babel()
    ]
}
