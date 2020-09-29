import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Home from './views'
import Test from './views/test';
import Popper from './views/popper'
import HookTest from './views/hook'
import FlipCard from './views/flip/flipCard'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/test'>
            <Test />
          </Route>
          <Route path='/popper'>
            <Popper />
          </Route>
          <Route path='/hooks'>
            <HookTest />
          </Route>
          <Route path='/flip/flipCard'>
            <FlipCard />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
