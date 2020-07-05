import React, { useImperativeHandle } from 'react'

const Child3 = ({emitRef}) => {

  useImperativeHandle(emitRef, () => ({
    test: () => {
      console.log('child3 ref haha')
    }
  }))

  return <div>Child3</div>
}

export default Child3