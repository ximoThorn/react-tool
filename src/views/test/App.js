import React, { Component, Children, createRef} from 'react';
import Child1 from './Child1';
import Child2 from './Child2';

import Child3 from './Child3';
import Child4 from './Child4';

import Dialog from './Dialog'

class App extends Component {
  constructor(props) {
    super(props);
    this.child = createRef()
    for (let i = 0; i < 2; i++) {
      this[`childRef${i}`] = createRef()
    }
    
  }
  componentDidMount() {
    console.log(this.props, this.props.children, 'this.props.children')
    console.log(Children.count(this.props.children))
    console.log(this.refs.child1.handlerClick)

    console.log(this)
    for (let i = 0; i < 2; i++) {
      this[`childRef${i}`].current.test()
    }
  }
  
  render() {
    return (
      <div>
        {/* <this.props.child1 />
        <this.props.child2 /> */}
        <Child1 ref="child1"/>
        <Child2 ref="child2"/>
        <Child3 emitRef={this.childRef0} />
        <Child4 emitRef={this.childRef1} />
        <Dialog text="Dialog" />
      </div>
    );
  }
}

export default App;
