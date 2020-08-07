import React, { Component } from 'react';
import eventEmitter from '../../utils/eventEmitter'

class Child1 extends Component {
  handlerClick() {
    console.log('11111')
  }

  componentDidMount() {
    eventEmitter.$on('clEmit', (...props) => {
      console.log(props, '$on: clEmitclEmit')
    })
    eventEmitter.$once('clEmitOnce', (...props) => {
      console.log(props, '$once: clEmitOnce')
    })
  }

  render() {
    console.log('child1')
    return (
      <div>
        child1组件
      </div>
    );
  }
}

export default Child1;

