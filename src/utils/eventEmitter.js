/**
 * 区别于hook 还要一层一层传递
 * @class EventEmitter
 */
class EventEmitter {
  static subscriptions = {}

  /**
   * 
   * @param {*} argument
   * @memberof EventEmitter
   */
  $emit(...argument) {
    const [method, ...props] = [...argument]

    EventEmitter.subscriptions[method]
    && typeof(EventEmitter.subscriptions[method]) === 'function'
    && EventEmitter.subscriptions[method](...props)
  }

  /**
   *
   * @param {*} method
   * @param {*} cb
   * @returns
   * @memberof EventEmitter
   */
  $on(method, cb) {
    const flag = EventEmitter.subscriptions[method]
    if (!flag) {
      EventEmitter.subscriptions[method] = cb
    }
    return () => {
      EventEmitter.subscriptions = {}
    }
  }

  /**
   *
   * @param {*} method
   * @param {*} fun
   * @memberof EventEmitter
   */
  $once(method, fun) {
    const _this = this

    function on () {
      _this.$off(method, on)
      fun.apply(_this, arguments)
    }
    _this.$on(method, on)
  }

  /**
   *
   * @param {*} method
   * @memberof EventEmitter
   */
  $off(method) {
    EventEmitter.subscriptions[method] && (EventEmitter.subscriptions[method] = undefined)
  }
}

export default new EventEmitter()
