import { describe, expect, it } from '@jest/globals';
import { noop } from '../fn/mod.js';
import { isArrayLike } from './is-array-like.js';

describe('isArrayLike', () => {
  it('returns `true` for empty array', () => {
    expect(isArrayLike([])).toBe(true);
  });
  it('returns `true` for non-empty array', () => {
    expect(isArrayLike([1, 2, 3])).toBe(true);
  });
  it('returns `false` for function', () => {
    expect(isArrayLike(noop)).toBe(false);
  });
  it('returns `false` for `null`', () => {
    expect(isArrayLike(null)).toBe(false);
  });
  it('returns `false` for `undefined`', () => {
    expect(isArrayLike(undefined)).toBe(false);
  });
  it('returns `false` for boolean', () => {
    expect(isArrayLike(true)).toBe(false);
    expect(isArrayLike(false)).toBe(false);
  });
  it('returns `false` for number', () => {
    expect(isArrayLike(0)).toBe(false);
    expect(isArrayLike(1)).toBe(false);
  });
  it('returns `false` for string', () => {
    expect(isArrayLike('')).toBe(false);
    expect(isArrayLike('test')).toBe(false);
  });
  it('returns `false` for arbitrary object', () => {
    expect(isArrayLike({ name: 'test' })).toBe(false);
  });
  it('returns `true` for array-like object', () => {
    expect(isArrayLike({ length: 1 })).toBe(true);
  });
  it('returns `false` for object with `length` property of wrong type', () => {
    expect(isArrayLike({ length: 'too long' })).toBe(false);
  });
});
