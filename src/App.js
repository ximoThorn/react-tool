import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Home from './views'
import Test from './views/test';
import Popper from './views/popper'

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
        </Switch>
      </Router>
    );
  }
}

export default App;
