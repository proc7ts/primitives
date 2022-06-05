import { describe, expect, it } from '@jest/globals';
import { valueProvider, valuesProvider } from './value-providers.js';

describe('valueProvider', () => {
  it('always returns its argument', () => {
    expect(valueProvider('abc')()).toBe('abc');
  });
});

describe('valuesProvider', () => {
  it('always returns its arguments', () => {
    expect(valuesProvider('abc', 3)()).toEqual(['abc', 3]);
  });
  it('always returns the same tuple', () => {

    const provider = valuesProvider('foo', 'bar');

    expect(provider()).toBe(provider());
  });
});
