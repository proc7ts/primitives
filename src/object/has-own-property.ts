const hasOwnProperty$ = Object.prototype.hasOwnProperty;

/**
 * Checks whether the `target` object has own property with the given `key`.
 *
 * This is a safer variant of `target.hasOwnProperty(key)` call.
 *
 * @param target - Target object to check.
 * @param key - A key of the property to check.
 *
 * @returns `true` if `target` object has own property with the given `key`, or `false` otherwise.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
 */
export function hasOwnProperty(target: object, key: PropertyKey): boolean {
  return hasOwnProperty$.call(target, key);
}
