import React, { Component } from 'react';

class Child1 extends Component {
  handlerClick() {
    console.log('11111')
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

