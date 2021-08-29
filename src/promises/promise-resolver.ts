import { noop } from '../fn';
import { lazyValue } from '../value';

/**
 * A resolver of promise that can be created later or not created at all.
 *
 * Creates the promise only on demand.
 *
 * The methods of this object do not require `this` context and can be called as functions.
 */
export interface PromiseResolver<T = void> {

  /**
   * Resolves the promise.
   *
   * Has no effect when the promised is already settled.
   *
   * Can be called before the promise constructed.
   *
   * @param resolution - Either a promise value, or a promise-like instance resolving to one.
   */
  resolve(this: void, resolution: T | PromiseLike<T>): void;

  /**
   * Rejects the promise.
   *
   * Has no effect when the promised is already settled.
   *
   * Can be called before the promise constructed.
   *
   * @param reason - Promise rejection reason.
   */
  reject(this: void, reason?: unknown): void;

  /**
   * Creates a promise resolved by {@link resolve}, or rejected by {@link reject}.
   *
   * The subsequent calls to this method return the same promise instance.
   *
   * @returns Created promise.
   */
  promise(this: void): Promise<T>;

}

/**
 * Creates a promise resolver.
 *
 * @returns New promise resolver.
 */
export function newPromiseResolver<T = void>(): PromiseResolver<T> {

  let resolvePromise: (value: T | PromiseLike<T>) => void;
  let rejectPromise: (reason?: unknown) => void;
  let buildPromise = lazyValue(() => new Promise<T>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  }));
  const settle = (resolution: () => Promise<T>): void => {
    buildPromise = lazyValue(resolution);
    resolvePromise = noop;
    rejectPromise = noop;
  };

  resolvePromise = value => {
    settle(() => Promise.resolve(value));
  };
  rejectPromise = error => {
    settle(() => Promise.reject(error));
  };

  return {
    resolve(value?) {
      resolvePromise(value);
    },
    reject(reason) {
      rejectPromise(reason);
    },
    promise() {
      return buildPromise();
    },
  };
}
