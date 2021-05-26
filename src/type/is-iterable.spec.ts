import { describe, expect, it } from '@jest/globals';
import { noop } from '../fn';
import { isIterable } from './is-iterable';

describe('isIterable', () => {
  it('returns `true` for array', () => {
    expect(isIterable([])).toBe(true);
  });
  it('returns `false` for function', () => {
    expect(isIterable(noop)).toBe(false);
  });
  it('return `false` for object with `[Symbol.iterator]` property unset', () => {
    expect(isIterable({ [Symbol.iterator]: null })).toBe(false);
  });
});
