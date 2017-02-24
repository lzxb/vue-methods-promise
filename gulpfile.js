const gulp = require('gulp')
const eslint = require('gulp-eslint')
const clear = require('clear')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const ava = require('gulp-ava')

// 检测代码风格
gulp.task('lint', () => {
  clear()
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
// 编译代码
gulp.task('build', ['lint'], () => {
  return rollup
    .rollup({
      entry: 'src/main.js',
      plugins: [
        babel()
      ]
    })
    .then((bundle) => {
      bundle.write({
        moduleName: 'vueMethodsPromise',
        format: 'umd',
        dest: 'dist/vue-methods-promise.js',
        sourceMap: true
      })
    })
})

// 测试
gulp.task('test', ['build'], () => {
  return gulp.src('test/**.js')
    .pipe(ava())
})

gulp.task('default', ['lint', 'build', 'test'])

gulp.watch(['**/**.js', '!node_modules/**', '!dist/**'], ['default'])
