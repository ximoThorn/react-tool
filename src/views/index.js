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
    </div>
  )
}

export default Home
