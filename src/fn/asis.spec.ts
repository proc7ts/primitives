import { describe, expect, it } from '@jest/globals';
import { asis } from './asis.js';

describe('asis', () => {
  it('returns its argument', () => {
    expect(asis('abc')).toBe('abc');
  });
});
