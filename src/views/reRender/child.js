import React, { memo } from 'react'

const Child = ({name = ''}) => {

  console.log('child')
  return (
    <div>
      <div>{name}</div>
    </div>
  )

}

export default memo(Child)
