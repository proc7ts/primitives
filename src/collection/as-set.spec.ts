import { describe, expect, it } from '@jest/globals';
import { asSet } from './as-set.js';

describe('asSet', () => {
  it('is empty when elements not specified', () => {
    expect(asSet(null).size).toBe(0);
  });
  it('contains the only element', () => {
    const set = asSet(1);

    expect(set.size).toBe(1);
    expect(set).toContain(1);
  });
  it('contains all elements', () => {
    const set = asSet([1, 2, 3]);

    expect(set.size).toBe(3);
    expect(set).toContain(1);
    expect(set).toContain(2);
    expect(set).toContain(3);
  });
});
