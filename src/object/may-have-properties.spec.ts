import { describe, expect, it } from '@jest/globals';
import { mayHaveProperties } from './may-have-properties.js';

describe('mayHaveProperties', () => {
  it('returns `true` for object', () => {
    expect(mayHaveProperties({})).toBe(true);
  });
  it('returns `true` for function', () => {
    expect(mayHaveProperties(() => void 0)).toBe(true);
  });
  it('returns `false` for `null`', () => {
    expect(mayHaveProperties(null)).toBe(false);
  });
  it('returns `false` for `undefined`', () => {
    expect(mayHaveProperties(undefined)).toBe(false);
  });
  it('returns `false` for primitives', () => {
    expect(mayHaveProperties(true)).toBe(false);
    expect(mayHaveProperties(false)).toBe(false);
    expect(mayHaveProperties(0)).toBe(false);
    expect(mayHaveProperties(1)).toBe(false);
    expect(mayHaveProperties('')).toBe(false);
    expect(mayHaveProperties('some')).toBe(false);
    expect(mayHaveProperties(0n)).toBe(false);
    expect(mayHaveProperties(1n)).toBe(false);
    expect(mayHaveProperties(Symbol('test'))).toBe(false);
  });
});
