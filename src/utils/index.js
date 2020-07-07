export const getTargetDom = function (target) {
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

