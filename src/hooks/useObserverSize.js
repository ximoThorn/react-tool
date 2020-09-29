import { useState, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import { getTargetDom } from '../utils/index'

/**
 *监听dom大小变化的回调hook
 *
 * @param {*} target
 * @param {*} cb
 * @returns
 */
const useObserverSize = (target, cb) => {
  const [state, setState] = useState(() => {
    const targetDom = getTargetDom(target) || {}
    return {
      width: targetDom.clientWidth,
      height: targetDom.clientHeight
    }
  })

  useLayoutEffect(() => {
    const targetDom = getTargetDom(target)

    if (!targetDom) {
      return () => {}
    }

    const ResizeObserverObj = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setState(() => ({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        }))
        // 传入cb的时候需要做下节流
        cb && cb({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        })
      }
    })

    ResizeObserverObj.observe(targetDom)

    return () => {
      ResizeObserverObj.disconnect()
    }

  }, [target, cb]) // 这里监听了cb，所以传入的cb需要做useCallback处理，斗则将触发无限执行！！！！！

  return state
}

export default useObserverSize
