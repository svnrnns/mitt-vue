import emitter from './emitter';

export function useEventListener(eventName, handler) {
  return {
    mounted() {
      emitter.on(eventName, handler);
    },
    destroyed() {
      emitter.off(eventName, handler);
    },
  };
}
