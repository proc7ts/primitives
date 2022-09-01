import { mayHaveProperties } from '../object/may-have-properties.js';

/**
 * Checks whether the given object is iterable.
 *
 * @typeParam TElement - Iterable elements type.
 * @typeParam TOther - Non-iterable type the `value` may have.
 * @param value - An object value to check.
 *
 * @returns `true` if the `value` has a `[Symbol.iterator]` method, or `false` otherwise.
 */
export function isIterable<TElement, TOther = unknown>(
  value: Iterable<TElement> | TOther,
): value is Iterable<TElement> {
  return (
    /*#__INLINE__*/ mayHaveProperties(value)
    && typeof (value as Partial<Iterable<TElement>>)[Symbol.iterator] === 'function'
  );
}
