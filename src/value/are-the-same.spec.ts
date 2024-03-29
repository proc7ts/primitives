import { describe, expect, it } from '@jest/globals';
import { areTheSame } from './are-the-same.js';

describe('areEqual', () => {
  it('returns `true` for strictly equal values', () => {
    expect(areTheSame('a', 'a')).toBe(true);
  });
  it('returns `false` for distinct values', () => {
    expect(areTheSame('a', 'b')).toBe(false);
  });
  it('returns `false` non-strictly equal values', () => {
    // noinspection JSPrimitiveTypeWrapperUsage
    expect(areTheSame('a', new String('a'))).toBe(false);
  });
});
