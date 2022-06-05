import { describe, expect, it } from '@jest/globals';
import { valueProvider } from './value-provider.js';

describe('valueProvider', () => {
  it('always returns its argument', () => {
    expect(valueProvider('abc')()).toBe('abc');
  });
});
