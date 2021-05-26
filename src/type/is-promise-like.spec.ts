import { describe, expect, it } from '@jest/globals';
import { noop } from '../fn';
import { isPromiseLike } from './is-promise-like';

describe('isPromiseLike', () => {
  it('succeeds for promise', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
  });
  it('succeeds for then-able function', () => {

    const thenable: (() => undefined) & PromiseLike<void> = () => void 0;

    thenable.then = (ok, fail) => Promise.resolve().then(ok, fail);

    expect(isPromiseLike(thenable)).toBe(true);
  });
  it('fails for `null`', () => {
    expect(isPromiseLike(null)).toBe(false);
  });
  it('fails for non-object value', () => {
    expect(isPromiseLike('abc')).toBe(false);
  });
  it('fails for plain function', () => {
    expect(isPromiseLike(noop)).toBe(false);
  });
  it('fails for plain object', () => {
    expect(isPromiseLike({ foo: 'bar' })).toBe(false);
  });
  it('fails for non-function `then` property', () => {
    expect(isPromiseLike({ then: 1 })).toBe(false);
  });
});
