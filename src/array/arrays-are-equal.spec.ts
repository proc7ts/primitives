import { describe, expect, it } from '@jest/globals';
import { arraysAreEqual } from './arrays-are-equal.js';

describe('arraysAreEqual', () => {
  it('returns `true` for empty arrays', () => {
    expect(arraysAreEqual([], [])).toBe(true);
  });
  it('returns `true` for equal arrays', () => {
    expect(arraysAreEqual([1, '2'], [1, '2'])).toBe(true);
  });
  it('returns `false` arrays of different length', () => {
    expect(arraysAreEqual([1, '2'], [1, '2', 3])).toBe(false);
  });
  it('returns `false` is corresponding array elements are not equal', () => {
    expect(arraysAreEqual([1, '2'], [1, 2])).toBe(false);
  });
  it('treats `length === null` as array length', () => {
    expect(arraysAreEqual([1, 2], [1, 2], null)).toBe(true);
    expect(arraysAreEqual([1, 2], [1, 2, 3], null)).toBe(false);
  });
  it('treats `length === -1` as 0', () => {
    expect(arraysAreEqual([1, 2], [2, 3], -1)).toBe(true);
    expect(arraysAreEqual([1, 2], [2, 3, 4], -1)).toBe(true);
  });
  it('treats `from === null` as `0`', () => {
    expect(arraysAreEqual([1, 2], [1, 2], null, 10)).toBe(true);
    expect(arraysAreEqual([1, 2], [0, 2], null, 10)).toBe(false);
  });
  it('treats `from === undefined` as `0`', () => {
    expect(arraysAreEqual([1, 2], [1, 2], null, 10)).toBe(true);
    expect(arraysAreEqual([1, 2], [0, 2], null, 10)).toBe(false);
  });
  it('treats `from === -1` as `0`', () => {
    expect(arraysAreEqual([1, 2], [1, 2], 0, 10)).toBe(true);
    expect(arraysAreEqual([1, 2], [0, 2], 0, 10)).toBe(false);
  });
  it('treats `to === null` as array length', () => {
    expect(arraysAreEqual([1, 2], [0, 2], 1, null)).toBe(true);
    expect(arraysAreEqual([1, 2], [1, 2, 3], 1, null)).toBe(false);
  });
  it('treats `to === -1` as `0`', () => {
    expect(arraysAreEqual([1, 2], [2, 3], 1, -1)).toBe(true);
    expect(arraysAreEqual([1, 2], [2, 3, 4], 1, -1)).toBe(true);
  });
  it('compares only array range', () => {
    expect(arraysAreEqual([1, 2, 3, 4], [11, 2, 3, 44], 1, 3)).toBe(true);
    expect(arraysAreEqual([1, 2, 3, 4], [11, 2, 3, 44], 1, 4)).toBe(false);
    expect(arraysAreEqual([1, 2, 3, 4], [11, 2, 3, 44], 0, 3)).toBe(false);
  });
  it('compares elements with custom function', () => {
    expect(arraysAreEqual([1, 2], [3, 4], () => true)).toBe(true);
    expect(arraysAreEqual([1, 2], [1, 2, 3], () => true)).toBe(false);
    expect(arraysAreEqual([1, 2], [1, 2], () => false)).toBe(false);
  });
});
