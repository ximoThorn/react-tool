import { useEffect, useRef } from 'react'

const useTest = (cb, title) => {
  // const fn = useRef(cb)  // 不可以实时获取最新的cb

  // 可以实时获取最新的cb
  const fn = useRef()
  fn.current = cb
  useEffect(() => {
    fn.current()
    console.log(title)
  }, [title])
}

export default useTest
