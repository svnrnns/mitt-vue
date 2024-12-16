# Mitt Vue

`mitt-vue` is a package for handling events in Vue 2 and Vue 3 applications using the `mitt` library. It provides a simple API for emitting and listening to events in your Vue components. (similar to the package `mitt-react`) <br />

This package offers a function that automatically handles event subscription and unsubscription in the lifecycke hooks `mounted` / `destroyed` (Vue 2), `onMounted` / `onUnmounted` or `mounted` / `unmounted` (Vue 3) <br/>
This simplifies the process of managing event listeners in Vue components, ensuring they are properly set up and cleaned up to avoid memory leaks.

## Installation

```bash
npm install mitt-vue
```

## Features

### useEventListener

The `useEventListener` function allows you to listen to custom events in your Vue components. This will automatically create a suscription an unsuscription for the event in the component.

```js
useEventListener('customEvent', (data) => {
  setMessage(data);
});
```

### useEventEmit

The `useEventEmit` function allows you to emit custom events.

```js
useEventEmit('customEvent', 'Hello, World!');
```

## Usage

### Vue 2

For Vue 2, use mixins to manage event subscription and unsubscription.

```js
<template>
  <div id="app">
    <button @click="emitEvent">Emit Event</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { useEventEmit, useEventListener } from 'mitt-vue';

export default {
  name: 'App',
  data() {
    return {
      message: 'Waiting for event...',
    };
  },
  mixins: [
    useEventListener('my-event', (data) => {
      this.message = `Event received with data: ${JSON.stringify(data)}`;
    }),
  ],
  methods: {
    emitEvent() {
      useEventEmit('my-event', { foo: 'bar' });
    },
  },
};
</script>
```

### Vue 3

For Vue 3, use the any API (Options or Composition) to manage event subscription and unsubscription. <br/>
The function `useEventListener` works both for Options and Composition API, so you can use `<script setup>` perfectly.

```js
<template>
  <div id="app">
    <button @click="emitEvent">Emit Event</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useEventEmit, useEventListener } from 'mitt-vue';

export default {
  name: 'App',
  setup() {
    const message = ref('Waiting for event...');

    useEventListener('my-event', (data) => {
      message.value = `Event received with data: ${JSON.stringify(data)}`;
    });

    function emitEvent() {
      useEventEmit('my-event', { foo: 'bar' });
    }

    return {
      message,
      emitEvent,
    };
  },
};
</script>
```

## API

### Methods

#### useEventListener

Emits an event with the given name and data.

| Param     | Type     | Nullable | Desc                                            |
| --------- | -------- | -------- | ----------------------------------------------- |
| eventName | string   | &cross;  | The name of the event to listen for             |
| callback  | Function | &cross;  | The function to call when the event is emitted. |

#### useEventEmit

Registers event listeners for Vue 3 using lifecycle hooks.

| Param     | Type   | Nullable | Desc                                    |
| --------- | ------ | -------- | --------------------------------------- |
| eventName | string | &cross;  | The name of the event to emit.          |
| data      | any    | &cross;  | The data to pass to the event callback. |

### Types

These types can be imported through `mitt-vue/types`

```ts
export type EventMap = Record<EventType, unknown>;
export type EventCallback = (...args: any[]) => void;
```

## Contribution

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
