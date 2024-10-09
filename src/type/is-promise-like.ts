import { mayHaveProperties } from '../object/may-have-properties.js';

/**
 * Checks if the given object is a promise-like instance.
 *
 * @typeParam TResolved - A type of the value the promise resolves to.
 * @typeParam TOther - A type of the plain, not promise-like, value.
 * @param value - A value to check.
 *
 * @returns `true` if the `value` is an object or function with `then` method, or `false` otherwise.
 */
export function isPromiseLike<TResolved, TOther>(
  value: PromiseLike<TResolved> | TOther,
): value is PromiseLike<TResolved> {
  return (
    /*#__INLINE__*/ mayHaveProperties(value) &&
    typeof (value as Partial<PromiseLike<TResolved>>).then === 'function'
  );
}
