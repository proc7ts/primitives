import { elementOrArray } from './element-or-array';

describe('elementOrArray', () => {
  it('is the only element', () => {
    expect(elementOrArray([1])).toBe(1);
  });
  it('is an array of all elements', () => {
    expect(elementOrArray([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it('is `undefined` when elements absent', () => {
    expect(elementOrArray([])).toBeUndefined();
  });
});
