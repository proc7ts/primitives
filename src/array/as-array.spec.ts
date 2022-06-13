import { describe, expect, it } from '@jest/globals';
import { asArray } from './as-array.js';

describe('asArray', () => {
  it('is empty when elements not specified', () => {
    expect(asArray(null)).toHaveLength(0);
  });
  it('contains the only element', () => {
    expect(asArray(1)).toEqual([1]);
  });
  it('contains all array elements', () => {
    expect(asArray([1, 2, 3])).toEqual([1, 2, 3]);
    expect(asArray([1, 2, 3] as const)).toEqual([1, 2, 3]);
  });
  it('contains all iterable elements', () => {
    expect(asArray(new Set([1, 2, 3]))).toEqual([1, 2, 3]);
  });
});
