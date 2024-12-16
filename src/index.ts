import * as Vue from 'vue'; // Works for Vue 3 and Vue 2.7
import { eventEmit } from './emitter';
import { useEventListener as vue2UseEventListener } from './vue2';
import { useEventListener as vue3UseEventListener } from './vue3';

/**
 * Detect the version of Vue and choose the appropriate listener function.
 */
const useEventListener =
  Vue.version && Vue.version.startsWith('3.')
    ? vue3UseEventListener
    : vue2UseEventListener;

// Create an alias for `eventEmit` as `useEventEmit`
const useEventEmit = eventEmit;

export { eventEmit, useEventEmit, useEventListener };
