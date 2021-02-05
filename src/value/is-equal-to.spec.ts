import { isEqualTo } from './is-equal-to';

describe('isEqualTo', () => {
  it('returns `true` for strictly equal values', () => {
    expect(isEqualTo('a', 'a')).toBe(true);
  });
  it('returns `false` for distinct values', () => {
    expect(isEqualTo('a', 'b')).toBe(false);
  });
  it('returns `false` non-strictly equal values', () => {
    // noinspection JSPrimitiveTypeWrapperUsage
    expect(isEqualTo('a', new String('a'))).toBe(false);
  });
});
