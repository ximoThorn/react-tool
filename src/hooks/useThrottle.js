import throttle from 'lodash.throttle'
import { useMemo } from 'react'

/**
 *函数节流hook
 *
 * @param {*} [fn=function () {}]
 * @param {number} [awit=500]
 * @param {*} [options={}]
 * @returns
 */
const useThrottle = (fn = function () {}, awit = 500, options = {}) => {

  const throttled = useMemo(() => throttle((...arg) => {
    fn(...arg)
  }, awit, options), [fn])
  

  return {
    run: throttled,
    cancel: throttled.cancel
  }
}

// 注意: fu需是一个经过useCallback处理的函数

export default useThrottle
