import React, { useImperativeHandle } from 'react'

const Child4 = ({emitRef}) => {

  useImperativeHandle(emitRef, () => ({
    test: () => {
      console.log('child4 ref haha')
    }
  }))

  return <div>Child4</div>
}

export default Child4
