import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useEventEmit } from '../src';
import { EventListenerComponent } from './helpers';

describe('integration: useEventEmit + useEventListener', () => {
  describe('basic communication', () => {
    it('should allow emitting and listening within Vue components', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'integration-event', onEvent: handler },
      });

      useEventEmit('integration-event', { integrated: true });

      expect(handler).toHaveBeenCalledWith({ integrated: true });
    });

    it('should handle events emitted before listener mounts', () => {
      const handler = vi.fn();

      // Emit before mounting listener
      useEventEmit('early-event', 'early data');

      mount(EventListenerComponent, {
        props: { eventName: 'early-event', onEvent: handler },
      });

      // Listener missed the early event
      expect(handler).not.toHaveBeenCalled();

      // But can receive new events
      useEventEmit('early-event', 'late data');
      expect(handler).toHaveBeenCalledWith('late data');
    });
  });

  describe('performance', () => {
    it('should handle rapid event emission', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'rapid-event', onEvent: handler },
      });

      for (let i = 0; i < 100; i++) {
        useEventEmit('rapid-event', i);
      }

      expect(handler).toHaveBeenCalledTimes(100);
    });

    it('should handle concurrent listeners with rapid events', () => {
      const handlers = Array.from({ length: 10 }, () => vi.fn());

      handlers.forEach((handler) => {
        mount(EventListenerComponent, {
          props: { eventName: 'concurrent-event', onEvent: handler },
        });
      });

      for (let i = 0; i < 50; i++) {
        useEventEmit('concurrent-event', i);
      }

      handlers.forEach((handler) => {
        expect(handler).toHaveBeenCalledTimes(50);
      });
    });
  });

  describe('edge cases', () => {
    it('should work with undefined data', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'undefined-event', onEvent: handler },
      });

      useEventEmit('undefined-event', undefined);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(undefined);
    });

    it('should work with null data', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'null-event', onEvent: handler },
      });

      useEventEmit('null-event', null);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(null);
    });

    it('should work with boolean data', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'bool-event', onEvent: handler },
      });

      useEventEmit('bool-event', true);
      useEventEmit('bool-event', false);

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenNthCalledWith(1, true);
      expect(handler).toHaveBeenNthCalledWith(2, false);
    });

    it('should work with empty string data', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'empty-string', onEvent: handler },
      });

      useEventEmit('empty-string', '');

      expect(handler).toHaveBeenCalledWith('');
    });

    it('should work with zero as data', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'zero-event', onEvent: handler },
      });

      useEventEmit('zero-event', 0);

      expect(handler).toHaveBeenCalledWith(0);
    });

    it('should handle special characters in event names', () => {
      const handler = vi.fn();
      const eventName = 'event:with:colons.and.dots-and-dashes_and_underscores';

      mount(EventListenerComponent, {
        props: { eventName, onEvent: handler },
      });

      useEventEmit(eventName, 'special');

      expect(handler).toHaveBeenCalledWith('special');
    });
  });
});

