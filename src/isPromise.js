export default function isPromise (obj) {
  return !!obj && typeof obj === 'object' && typeof obj.constructor === 'function' && !Object.hasOwnProperty.call(obj, 'constructor') && obj.constructor.name === 'Promise'
}
