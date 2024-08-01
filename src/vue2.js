import emitter from './emitter';

export function useEventListener(event, callback) {
  return {
    created() {
      emitter.on(event, callback.bind(this));
    },
    beforeDestroy() {
      emitter.off(event, callback.bind(this));
    },
  };
}
