import emitter from './emitter';
import { ComponentOptions } from 'vue';
import { EventCallback } from './types';

/**
 * Provides Vue 2 mixins for registering event listeners.
 * @param event - The event name to listen for.
 * @param callback - The callback to invoke when the event is emitted.
 * @returns A Vue mixin with `created` and `beforeDestroy` hooks.
 */
export function useEventListener(
  event: string,
  callback: EventCallback
): ComponentOptions {
  return {
    created() {
      emitter.on(event, callback.bind(this));
    },
    beforeDestroy() {
      emitter.off(event, callback.bind(this));
    },
  };
}
