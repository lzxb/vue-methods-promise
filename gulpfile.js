const gulp = require('gulp')
const eslint = require('gulp-eslint')
const clear = require('clear')
const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const ava = require('gulp-ava')

const moduleName = 'vueMethodsPromise'
const destName = 'vue-methods-promise'
// Test code style
gulp.task('lint', () => {
  clear()
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
// Compiler development version
gulp.task('build:dev', ['lint'], () => {
  return rollup({
    entry: 'src/index.js',
    plugins: [babel()]
  })
    .then((bundle) => {
      bundle.write({
        moduleName,
        format: 'umd',
        dest: `dist/${destName}.js`,
        sourceMap: true
      })
    })
})

// Compile production
gulp.task('build:prod', ['build:dev'], () => {
  return rollup({
    entry: 'src/index.js',
    plugins: [babel(), uglify()]
  })
    .then((bundle) => {
      bundle.write({
        moduleName,
        format: 'umd',
        dest: `dist/${destName}.min.js`,
        sourceMap: true
      })
    })
})

// Component testing
gulp.task('test', ['build:prod'], () => {
  return gulp.src('test/**.test.js')
  .pipe(ava({
    verbose: true // Enable verbose output
  }))
})

gulp.task('default', ['lint', 'build:dev', 'build:prod', 'test'])

gulp.watch(['**/**.js', '!node_modules/**', '!dist/**'], ['default'])
