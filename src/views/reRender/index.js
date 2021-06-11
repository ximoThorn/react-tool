import React, { useState, useCallback } from 'react'
import Child from './child'
import useTest from './useTest'

const ReRender = () => {
  const [title, setTitle] = useState(1)
  const handler = () => {
    console.log(title)
  }
  useTest(handler, title)

  console.log('ReRender')
  const handleClick = useCallback(() => {

  }, [])

  return (
    <div>
      <div>{title}</div>
      <button onClick={() => setTitle(title + 1)}>点击</button>
      <Child onClick={() => handleClick()} />
    </div>
  )

}

export default ReRender
