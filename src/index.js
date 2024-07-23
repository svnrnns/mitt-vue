import * as Vue from 'vue'; // Para Vue 3
import { eventEmit } from './emitter';
import { useEventListener as vue2UseEventListener } from './vue2';
import { useEventListener as vue3UseEventListener } from './vue3';

// Detecta la versión de Vue y elige la función de listener apropiada
const useEventListener =
  Vue.version && Vue.version.startsWith('2.')
    ? vue2UseEventListener
    : vue3UseEventListener;

export { eventEmit, useEventListener };
