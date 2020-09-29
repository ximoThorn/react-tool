import { useEffect, useCallBack } from 'react'
import { getTargetDom } from '../utils/index'

const defaultEventName = 'click'


/**
 *点击非目标dom事件
 *
 * @param {*} [cb=function() {}]
 * @param {*} target
 * @param {*} [eventName=defaultEventName]
 */
const useClickOutSide = (cb = function() {}, target, eventName = defaultEventName) => {

  const handler = useCallBack((e) => {
    const targetElement = getTargetDom(target)
    if (!targetElement || targetElement.contains(e.target)) {
      return
    }
    cb(e)
  }, [cb, typeof target === 'function' ? undefined : target])

  useEffect(() => {
    document.addEventListener(eventName, handler)
    return () => {
      document.removeEventListener(eventName, handler)
    }
  }, [eventName, handler])

}

export default useClickOutSide
