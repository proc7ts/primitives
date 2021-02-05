import { propertiesAreEqual } from './properties-are-equal';

describe('propertiesAreEqual', () => {
  it('returns `true` for equal objects', () => {
    expect(propertiesAreEqual({ a: 1, b: 'foo' }, { a: 1, b: 'foo' })).toBe(true);
  });
  it('returns `true` for empty objects', () => {
    expect(propertiesAreEqual({}, {})).toBe(true);
  });
  it('returns `false` if first object misses property from the second one', () => {
    expect(propertiesAreEqual({ a: 1 }, { a: 1, b: 'foo' })).toBe(false);
  });
  it('returns `false` if second object misses property from the first one', () => {
    expect(propertiesAreEqual({ a: 1, b: 'foo' }, { a: 1 })).toBe(false);
  });
  it('returns `false` if property values differ', () => {
    expect(propertiesAreEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
  it('compares property values by custom function', () => {
    expect(propertiesAreEqual({ a: 1 }, { a: 2 }, () => true)).toBe(true);
    expect(propertiesAreEqual({ a: 1 }, { a: 1 }, () => false)).toBe(false);
  });
  it('compares only listed properties', () => {
    expect(propertiesAreEqual({ a: 1, b: 'foo' }, { a: 1 }, null, ['a'])).toBe(true);
  });
});
