import React, { useRef, useEffect, useState, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group';

import DrPopper from '../../components/popper/popper'

const Popper = () => {
  const [reference, setReference] = useState(undefined)
  const [visible, setVisible] = useState(false)
  const referenceRef = useRef()
  const popperRef = useRef()
  const [clickFlag, setClickFlag] = useState(false)

  useEffect(() => {
    setReference(referenceRef.current)

  }, [])

  useEffect(() => {
    const popperRefCopy = popperRef.current
    console.log(popperRef)
    return () => {
      popperRefCopy.removeChild();
    }
  }, [popperRef])

  const handlerClick= () => {
    if (clickFlag) {
      return
    }
    console.log(1)
    setVisible(preState => !preState)
  }

  const handlerEnter = useCallback(() => {
    console.log('enter')
    popperRef.current.popperEl.current.style.display = 'block'; 
    setClickFlag(() => true)
  }, [])

  const handlerEntered = useCallback(() => {
    console.log('entered')
    setClickFlag(() => false)
  }, [])

  const handlerExit = useCallback(() => {
    console.log('exit')
    setClickFlag(() => true)
  }, [])
  const handlerExited = useCallback(() => {
    console.log('exited')
    popperRef.current.popperEl.current.style.display = 'none';
    setClickFlag(() => false)
  }, [])

  return (
    <div className="popper-wrap">
      <div onClick={handlerClick} ref={referenceRef} className="popper-reference">
        reference
      </div>
      <CSSTransition in={visible}
        onEnter={handlerEnter}
        onEntered={handlerEntered}
        onExit={handlerExit}
        onExited={handlerExited}
        classNames="popper"
        timeout={300}>
        <DrPopper ref={popperRef} visible={visible} reference={reference}>
          <div className="popper-target">
            popper
            <br/>
            popper
          </div>
        </DrPopper>
      </CSSTransition>
    </div>
  )
}

export default Popper
