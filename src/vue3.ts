import emitter from './emitter';
import { onMounted, onUnmounted } from 'vue';
import { EventCallback } from './types';

/**
 * Registers event listeners for Vue 3 using lifecycle hooks.
 * @param event - The event name to listen for.
 * @param callback - The callback to invoke when the event is emitted.
 */
export function useEventListener(event: string, callback: EventCallback): void {
  onMounted(() => {
    emitter.on(event, callback);
  });

  onUnmounted(() => {
    emitter.off(event, callback);
  });
}
