import React, { useState, useRef, useEffect  } from 'react'
import classnames from 'classnames'

import { random } from '../../utils'


let images = []

for (let i = 0, len = 5; i < len; i++) {
  images.push({
    url: require(`../../image/istockphoto-${i % 5}.jpg`),
    id: `${i}${Math.random()}`
  })
}



const FlipCard = () => {
  const cardRef = useRef()
  const [imageList, setImageList] = useState(() => images)

  const handleAdd = () => {
    const i = random(0, 4)
    const obj = {
      url: images[i].url,
      id: Math.random()
    }
    setImageList(preState => ([
      obj,
      ...preState
    ]))
  }

  // useEffect(() => {
 
  // }, [])


  return (
    <div>
      <button onClick={handleAdd}>add</button>
      <hr/>
      <ul className="preview-wrap" ref={cardRef}>
        {
          imageList.map((item) => {
            return (
              <li key={item.id}>
                <img src={item.url} alt="" />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FlipCard
