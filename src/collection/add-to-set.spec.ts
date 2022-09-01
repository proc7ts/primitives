import { beforeEach, describe, expect, it } from '@jest/globals';
import { addToSet } from './add-to-set.js';

describe('addToSet', () => {
  let set: Set<number>;

  beforeEach(() => {
    set = new Set([1, 2, 3]);
  });

  it('adds nothing when elements not specified', () => {
    expect(addToSet(set, null)).toBe(set);
    expect([...set]).toEqual([1, 2, 3]);
  });
  it('adds single element', () => {
    expect(addToSet(set, 0)).toBe(set);
    expect([...set]).toEqual([1, 2, 3, 0]);
  });
  it('adds all array elements', () => {
    expect(addToSet(set, [2, 0, 5, 5])).toBe(set);
    expect([...set]).toEqual([1, 2, 3, 0, 5]);
  });
  it('adds all iterable elements', () => {
    expect(addToSet(set, new Set([2, 0, 5, 5]).values())).toBe(set);
    expect([...set]).toEqual([1, 2, 3, 0, 5]);
  });
});
