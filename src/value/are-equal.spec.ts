import { areEqual } from './are-equal';

describe('areEqual', () => {
  it('returns `true` for strictly equal values', () => {
    expect(areEqual('a', 'a')).toBe(true);
  });
  it('returns `false` for distinct values', () => {
    expect(areEqual('a', 'b')).toBe(false);
  });
  it('returns `false` non-strictly equal values', () => {
    // noinspection JSPrimitiveTypeWrapperUsage
    expect(areEqual('a', new String('a'))).toBe(false);
  });
});
