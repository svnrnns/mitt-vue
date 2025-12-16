import { beforeEach, afterEach } from 'vitest';
import emitter from '../src/emitter';

/**
 * Global test setup for mitt-vue
 * Ensures clean state between tests
 */

beforeEach(() => {
  // Clear all event listeners before each test
  emitter.all.clear();
});

afterEach(() => {
  // Cleanup after each test if needed
});

