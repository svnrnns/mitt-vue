import mitt, { Emitter } from 'mitt';
import { EventMap } from './types';

const emitter: Emitter<EventMap> = mitt<EventMap>();
export default emitter;

/**
 * Emits an event with the given name and data.
 * @param eventName - The name of the event.
 * @param data - The data to emit with the event.
 */
export function eventEmit<T extends keyof EventMap>(
  eventName: T,
  data?: EventMap[T]
): void {
  emitter.emit(eventName, data);
}
