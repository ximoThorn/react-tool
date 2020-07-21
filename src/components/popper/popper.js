import React, { createRef } from 'react';
import PropTypes from 'prop-types';

const Popper = require('popper.js/dist/umd/popper.js');

class DrPopper extends React.Component {
  static currentPopper = undefined
  constructor(props) {
    super(props)
    this.popperEl = createRef();
    this.parentNode = '';
  }

  componentDidMount() {
    // 如果transfer为true，那么删掉当前popper节点，在shouldComponentUpdate钩子中添加至body最后面
    this.parentNode = this.popperEl.current.parentNode;
    const commentNode = document.createComment('');
    this.parentNode.replaceChild(commentNode, this.popperEl.current);
  }

  shouldComponentUpdate({visible, transfer}) { 
    if (!visible) {
      return true
    }
    if (transfer) {
      !document.body.contains(this.popperEl.current) && document.body.appendChild(this.popperEl.current);
    } else {
      !this.parentNode.contains(this.popperEl.current) && this.parentNode.appendChild(this.popperEl.current)
    }
    return true
  }

  componentWillUnmount() {
    if (!this.props.transfer) { // 如果transfer为true, 则在父组件销毁前手动调用removeChild方法销毁popper
      this.removeChild()
    }
  }

  popperUpdate() {
    this.createPopper({
      placement: this.props.placement,
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        },
        offset: {
          offset: this.props.offset
        },
        preventOverflow: {
          boundariesElement: 'window'
        }
      },
      onCreate: () => {
        this.resetTransformOrigin();
      },
      onUpdate: () => {
        this.resetTransformOrigin();
      }
    });
  }

  popperDetory() {
    if (DrPopper.currentPopper) {
      DrPopper.currentPopper && DrPopper.currentPopper.destroy();
      DrPopper.currentPopper = null;
    };
  }

  removeChild() {
    if (this.props.transfer) {
      // 当父组件销毁时，移除
      document.body.contains(this.popperEl.current) && document.body.removeChild(this.popperEl.current);
    } else {
      this.parentNode.contains(this.popperEl.current) && this.parentNode.removeChild(this.popperEl.current)
    }
    DrPopper.currentPopper = undefined;
  }

  createPopper(options = {}) {
    if (!this.props.reference || !this.popperEl.current) {
      return;
    }
    if (DrPopper.currentPopper) {
      DrPopper.currentPopper.update();
    } else {
      const popperDom = this.popperEl.current;
      DrPopper.currentPopper = new Popper(this.props.reference, popperDom, options)
    };
  }
  resetTransformOrigin() { // 当popper的位置有变化时，更新动画的origin
    if (!DrPopper.currentPopper) {
      return;
    };
    let x_placement = DrPopper.currentPopper.popper.getAttribute('x-placement') || 'bottom-start';
    let placementStart = x_placement.split('-')[0];
    let placementEnd = x_placement.split('-')[1];
    const leftOrRight = x_placement === 'left' || x_placement === 'right';
    if (!leftOrRight) {
      DrPopper.currentPopper.popper.style.transformOrigin = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom';
    };
  }

  render() {
    const { children, visible } = this.props
    return (
      <div ref={this.popperEl} style={{display: visible ? 'block' : 'none'}} className="dr-popper">
        {children }
        {/* <div v-if="showArrow" ref="arrow" class="dr-popper-arrow"></div> */}
      </div>
    )
  } 
}

DrPopper.propTypes = {
  placement: PropTypes.oneOf(['top', 'bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  offset: PropTypes.string,
  showArrow: PropTypes.bool,
  children: PropTypes.element,
  reference: PropTypes.object,
  count: PropTypes.number,
  visible: PropTypes.bool.isRequired, // 因为DrPopper要知道是否渲染在body最外层，如果是false，默认初始是不渲染的，所以要判断
  transfer: PropTypes.bool
}

DrPopper.defaultProps = {
  placement: 'bottom-start',
  offset: '0, 5px',
  reference: undefined,
  transfer: true
  // showArrow: true
}

export default DrPopper
