import { describe, expect, it } from '@jest/globals';
import { noop } from './noop.js';

describe('noop', () => {
  it('does nothing', () => {
    expect(noop()).toBeUndefined();
  });
});
