import React, { useRef, useCallback } from 'react'
import useObserverSize from '../../hooks/useObserverSize'

const HookTest = () => {
  const ref = useRef()

  // const callback = useCallback(res => {
  //   console.log(res, '变化了')
  // }, [])
  // console.log('re')
  const callback = (res) => {
    console.log(res, '变化了')
  }

  const result = useObserverSize(ref, callback)

  return (
    <div ref={ref}>
      我是target, width: {result.width}, height: {result.height}
    </div>
  )
}

export default HookTest
