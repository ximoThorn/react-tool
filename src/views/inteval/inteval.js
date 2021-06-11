import React, { useEffect, useState, useRef } from 'react'

const Inteval = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div style={{textAlign: 'center', padding: 24}}>
      {count}
    </div>
  )
}

export default Inteval
