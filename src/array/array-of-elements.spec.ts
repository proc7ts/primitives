import { describe, expect, it } from '@jest/globals';
import { arrayOfElements } from './array-of-elements.js';

describe('arrayOfElements', () => {
  it('is empty when elements not specified', () => {
    expect(arrayOfElements(null)).toHaveLength(0);
  });
  it('contains the only element', () => {
    expect(arrayOfElements(1)).toEqual([1]);
  });
  it('contains all elements', () => {
    expect(arrayOfElements([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
