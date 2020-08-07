import React, { createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Popper = require('popper.js/dist/umd/popper.js');

class DrPopper extends React.Component {
  static currentPopper = undefined
  constructor(props) {
    super(props)
    this.popperEl = createRef();
  }

  componentWillUnmount() {
    this.popperDetory()
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

  createPopper(options = {}) {
    if (!this.props.reference || !this.popperEl.current) {
      return;
    }
    this.resetTransformOrigin();
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
    const { children, visible, transfer } = this.props
    const result = (
      <div ref={this.popperEl}
        style={{display: visible ? 'block' : 'none'}}
        className="dr-popper">
        {children }
        {/* <div v-if="showArrow" ref="arrow" class="dr-popper-arrow"></div> */}
      </div>
    )
    return transfer ? createPortal(result, document.body) : result
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
