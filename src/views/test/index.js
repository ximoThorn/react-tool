import React from 'react'
import App from './App'
import Child1 from './Child1'
import Child2 from './Child2'

const Test = () => {
  return <App
    child1={Child1}
    child2={Child2}>
      {/* <span>qwe</span> */}
  </App>
}

export default Test
