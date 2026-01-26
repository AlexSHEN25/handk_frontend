export function getLocal(key) {
  return !!window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : ''
}
export function setLocal(key, d) {
  return window.localStorage.setItem(key, typeof d == 'object' ? JSON.stringify(d) : d);
}
export function removeLocal(key) {
  return window.localStorage.removeItem(key)
}
