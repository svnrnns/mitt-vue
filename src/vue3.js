import emitter from './emitter';
import { onMounted, onUnmounted } from 'vue';

export function useEventListener(eventName, handler) {
  onMounted(() => {
    emitter.on(eventName, handler);
  });

  onUnmounted(() => {
    emitter.off(eventName, handler);
  });
}
