import { defineComponent, h, PropType } from 'vue';
import { useEventListener, useEventEmit } from '../../src';

export interface EventListenerProps {
  eventName: string;
  onEvent: (data: unknown) => void;
}

export interface EventEmitterProps {
  eventName: string;
  data?: unknown;
}

/**
 * Test component that listens to events using useEventListener composable
 */
export const EventListenerComponent = defineComponent({
  name: 'EventListenerComponent',
  props: {
    eventName: {
      type: String,
      required: true,
    },
    onEvent: {
      type: Function as PropType<(data: unknown) => void>,
      required: true,
    },
  },
  setup(props) {
    useEventListener(props.eventName, props.onEvent);
    return () =>
      h(
        'div',
        { 'data-testid': 'listener' },
        `Listening to ${props.eventName}`
      );
  },
});

/**
 * Test component that emits events on mount using useEventEmit
 */
export const EventEmitterComponent = defineComponent({
  name: 'EventEmitterComponent',
  props: {
    eventName: {
      type: String,
      required: true,
    },
    data: {
      type: null as unknown as PropType<unknown>,
      default: undefined,
    },
  },
  setup(props) {
    useEventEmit(props.eventName, props.data);
    return () =>
      h('div', { 'data-testid': 'emitter' }, `Emitted ${props.eventName}`);
  },
});
