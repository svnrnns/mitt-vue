import emitter from './emitter';
import { onMounted, onUnmounted } from 'vue';

export function useEventListener(event, callback) {
  onMounted(() => {
    emitter.on(event, callback);
  });

  onUnmounted(() => {
    emitter.off(event, callback);
  });
}
