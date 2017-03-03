export default function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
