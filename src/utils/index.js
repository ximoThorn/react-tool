
/**
 *
 *
 * @export
 * @param {*} target
 * @returns
 */
export function getTargetDom (target) {
  
  if (!target) {
    return
  }
  if (typeof(target) === 'function') {
    return target()
  }
  if ('current' in target) {
    return target.current
  }
  return target
}


/**
 *随机色
 *
 * @export
 * @returns
 */
export function randomColor () {
  return '#' + Math.random().toString(16).substring(2).substr(0, 6)
}


/**
 *随机数
 *
 * @export
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
