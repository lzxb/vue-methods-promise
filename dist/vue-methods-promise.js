(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vueMethodsPromise = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function isPromise(obj) {
  return !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.constructor === 'function' && !Object.hasOwnProperty.call(obj, 'constructor') && obj.constructor.name === 'Promise';
}

var methodsPromise = (function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Configure the hook function
  if (typeof opt.hookName !== 'string') {
    opt.hookName = '$promise';
  }
  // Global hook function
  if (typeof opt.promise !== 'function') {
    opt.promise = function () {};
  }

  return {
    beforeCreate: function beforeCreate() {
      var _this = this;

      var methods = this.$options.methods;

      if (!Object.prototype.toString.call(methods) === '[object Object]') return;
      Object.keys(methods).forEach(function (k) {
        var item = methods[k];
        if (typeof item === 'function' && k !== opt.hook) {
          methods[k] = function () {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
              arg[_key] = arguments[_key];
            }

            var back = item.apply(_this, arg);
            if (isPromise(back)) {
              if (typeof _this[opt.hookName] === 'function') {
                if (isPromise(_this[opt.hookName](back))) {
                  opt.promise.call(_this, back);
                }
              } else {
                opt.promise.call(_this, back);
              }
            }
          };
        }
      });
    }
  };
});

function install(Vue, opt) {
  if (install.installed) return; // already installed

  Vue.mixin(methodsPromise(opt));
}

return install;

})));
//# sourceMappingURL=vue-methods-promise.js.map
