import React from 'react'
import { createPortal } from 'react-dom'

const Dialog = ({text}) => {

  const aaa = (
    <div>我是{text}</div>
  )

  return createPortal(aaa, document.body)
}

export default Dialog
