(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vueMethodsPromise = factory());
}(this, (function () { 'use strict';

var main = function (Vue) {
  Vue.mixin({});
};

return main;

})));
//# sourceMappingURL=vue-methods-promise.js.map
