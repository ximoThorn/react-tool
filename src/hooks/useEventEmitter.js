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

  $off(method) {
    EventEmitter.subscriptions[method] && (EventEmitter.subscriptions[method] = undefined)
  }
}

const useEventEmitter = () => {
  return new EventEmitter()
}

export default useEventEmitter
