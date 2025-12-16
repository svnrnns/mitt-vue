import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import emitter from '../src/emitter';
import { EventListenerComponent } from './helpers';

describe('useEventListener', () => {
  describe('event registration', () => {
    it('should register an event listener', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'test-event', onEvent: handler },
      });

      emitter.emit('test-event', { data: 'test' });

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should handle multiple sequential events', () => {
      const handler = vi.fn();
      mount(EventListenerComponent, {
        props: { eventName: 'multi-event', onEvent: handler },
      });

      emitter.emit('multi-event', 'first');
      emitter.emit('multi-event', 'second');
      emitter.emit('multi-event', 'third');

      expect(handler).toHaveBeenCalledTimes(3);
      expect(handler).toHaveBeenNthCalledWith(1, 'first');
      expect(handler).toHaveBeenNthCalledWith(2, 'second');
      expect(handler).toHaveBeenNthCalledWith(3, 'third');
    });
  });

  describe('cleanup behavior', () => {
    it('should cleanup listener on unmount', () => {
      const handler = vi.fn();
      const wrapper = mount(EventListenerComponent, {
        props: { eventName: 'cleanup-event', onEvent: handler },
      });

      emitter.emit('cleanup-event', 'before unmount');
      expect(handler).toHaveBeenCalledTimes(1);

      wrapper.unmount();

      emitter.emit('cleanup-event', 'after unmount');
      // Should not have been called again after unmount
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should not leak listeners after multiple mount/unmount cycles', () => {
      const handler = vi.fn();

      for (let i = 0; i < 5; i++) {
        const wrapper = mount(EventListenerComponent, {
          props: { eventName: 'leak-test', onEvent: handler },
        });
        wrapper.unmount();
      }

      emitter.emit('leak-test', 'after cycles');
      // No listeners should remain
      expect(handler).toHaveBeenCalledTimes(0);
    });
  });

  describe('multiple listeners', () => {
    it('should support multiple listeners for the same event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      mount(EventListenerComponent, {
        props: { eventName: 'shared-event', onEvent: handler1 },
      });
      mount(EventListenerComponent, {
        props: { eventName: 'shared-event', onEvent: handler2 },
      });

      emitter.emit('shared-event', 'shared data');

      expect(handler1).toHaveBeenCalledWith('shared data');
      expect(handler2).toHaveBeenCalledWith('shared data');
    });

    it('should support different listeners for different events', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      mount(EventListenerComponent, {
        props: { eventName: 'event-1', onEvent: handler1 },
      });
      mount(EventListenerComponent, {
        props: { eventName: 'event-2', onEvent: handler2 },
      });

      emitter.emit('event-1', 'data-1');
      emitter.emit('event-2', 'data-2');

      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler1).toHaveBeenCalledWith('data-1');
      expect(handler2).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledWith('data-2');
    });

    it('should handle partial unmount correctly', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      const wrapper1 = mount(EventListenerComponent, {
        props: { eventName: 'partial-event', onEvent: handler1 },
      });
      const wrapper2 = mount(EventListenerComponent, {
        props: { eventName: 'partial-event', onEvent: handler2 },
      });

      emitter.emit('partial-event', 'both listening');
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      // Remove one listener
      wrapper2.unmount();

      emitter.emit('partial-event', 'only one listening');
      expect(handler1).toHaveBeenCalledTimes(2);
      expect(handler2).toHaveBeenCalledTimes(1);

      wrapper1.unmount();
    });
  });
});
