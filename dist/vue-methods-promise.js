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
  return Object.prototype.toString.call(obj) === '[object Promise]' || !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.constructor === 'function' && !Object.hasOwnProperty.call(obj, 'constructor') && obj.constructor.name === 'Promise';
}

var isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var methodsPromise = (function () {
  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Configure the hook function
  if (typeof opt.hookName !== 'string') {
    opt.hookName = '$promise';
  }
  // Global hook function
  if (typeof opt.promise !== 'function') {
    opt.promise = function (mp) {
      mp.catch(function (err) {
        console.log(err);
      });
    };
  }

  return {
    beforeCreate: function beforeCreate() {
      var methods = this.$options.methods;

      if (!isObject(methods)) return;
      Object.keys(methods).forEach(function (k) {
        var fn = methods[k];
        if (typeof fn === 'function' && k !== opt.hookName) {
          methods[k] = hijack(fn);
        }
      });
      function hijack(native) {
        return function vueMethodsPromise() {
          var back = native.apply(this, arguments);
          if (isPromise(back)) {
            if (typeof this[opt.hookName] === 'function') {
              var hookBack = this[opt.hookName](back);
              if (isPromise(hookBack)) {
                opt.promise.call(this, back);
              }
            } else {
              opt.promise.call(this, back);
            }
          }
          return back;
        };
      }
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
