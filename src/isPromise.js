export default function isPromise (obj) {
  return Object.prototype.toString.call(obj) === '[object Promise]' || (!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.constructor === 'function' && !Object.hasOwnProperty.call(obj, 'constructor') && obj.constructor.name === 'Promise')
}
