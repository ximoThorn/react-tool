import { useEffect } from 'react'

class EventEmitter {
  static subscriptions = {}

  $emit(...argument) {
    const [method, ...props] = [...argument]

    EventEmitter.subscriptions[method]
    && typeof(EventEmitter.subscriptions[method]) === 'function'
    && EventEmitter.subscriptions[method](...props)
  }

  $on(method, cb) {
    useEffect(() => {
      const flag = EventEmitter.subscriptions[method]
      if (!flag) {
        EventEmitter.subscriptions[method] = cb
      }
      return () => {
        EventEmitter.subscriptions = {}
      }
    }, [])
  }

  $once(method, fun) {
    const _this = this

    function on () {
      _this.$off(method, on)
      fun.apply(_this, arguments)
    }
    _this.$on(method, on)
  }

  $off(method) {
    EventEmitter.subscriptions[method] && (EventEmitter.subscriptions[method] = undefined)
  }
}

const useEventEmitter = () => {
  return new EventEmitter()
}

export default useEventEmitter
