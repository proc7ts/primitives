import { describe, expect, it } from '@jest/globals';
import { countArgs } from './count-args.js';

describe('countArgs', () => {

  it('counts defined args', () => {
    expect(argCount(undefined, 1, undefined, null)).toBe(4);
  });
  it('ignores trailing `undefined` args', () => {
    expect(argCount(undefined, 1, undefined, undefined)).toBe(2);
  });
  it('returns `0` when all args `undefined`', () => {
    expect(argCount(undefined, undefined, undefined)).toBe(0);
  });
  it('returns `0` for missing args', () => {
    expect(argCount()).toBe(0);
  });

  function argCount(...args: any[]): number {
    return countArgs(args);
  }

});
