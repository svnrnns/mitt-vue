import mitt from 'mitt';

const emitter = mitt();
export default emitter;

export function eventEmit(eventName, data) {
  emitter.emit(eventName, data);
}
