import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/test">test</Link>
      </div>
      <div>
        <Link to="/popper">popper</Link>
      </div>
      <div>
        <Link to="/hooks">hooks</Link>
      </div>
      <div>
        <Link to="/flip/flipCard">flip动画</Link>
      </div>
      <div>
        <Link to="/rerender">rerender</Link>
      </div>
      <div>
        <Link to="/inteval">inteval</Link>
      </div>
    </div>
  )
}

export default Home
