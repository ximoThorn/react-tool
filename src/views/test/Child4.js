import React, { useImperativeHandle } from 'react'
import eventEmitter from '../../utils/eventEmitter'

const Child4 = ({emitRef}) => {

  useImperativeHandle(emitRef, () => ({
    test: () => {
      console.log('child4 ref haha')
    }
  }))

  const handlerClick = () => {
    eventEmitter.$emit('clEmit', 1, 3, 4)
    eventEmitter.$emit('clEmitOnce', 10)
  }

  return <div onClick={handlerClick}>Child4</div>
}

export default Child4
