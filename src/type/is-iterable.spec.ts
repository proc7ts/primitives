import { describe, expect, it } from '@jest/globals';
import { noop } from '../fn/mod.js';
import { isIterable } from './is-iterable.js';

describe('isIterable', () => {
  it('returns `true` for array', () => {
    expect(isIterable([])).toBe(true);
  });
  it('returns `true` for iterable object', () => {
    expect(isIterable(new Set().values())).toBe(true);
  });
  it('returns `true` for iterable function', () => {
    const value = (() => void 0) as Partial<Iterable<number>>;

    value[Symbol.iterator] = function* () {
      yield* [1, 2, 3];
    };

    expect(isIterable(value)).toBe(true);
  });
  it('returns `false` for primitive value', () => {
    expect(isIterable(1)).toBe(false);
    expect(isIterable('abc')).toBe(false);
  });
  it('returns `false` for function', () => {
    expect(isIterable(noop)).toBe(false);
  });
  it('return `false` for object without `[Symbol.iterator]` method', () => {
    expect(isIterable({ [Symbol.iterator]: true })).toBe(false);
  });
});
