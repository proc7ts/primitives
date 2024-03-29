import type { AbstractClass } from './abstract-class.js';

/**
 * Detects a super class of the given class optionally satisfying the given criteria.
 *
 * Traverses all class ancestors until reaches the one satisfying the given criteria, or stops when there is no more
 * ancestors.
 *
 * @param type - The class constructor to find super class of.
 * @param satisfying - The criteria of super class matching. It is a function accepting a super class constructor
 * as the only parameter and returning `true` if the given super class matches, or `false` otherwise. Always returns
 * `true` by default.
 *
 * @return A super class `satisfying` the given criteria, or `undefined` if there is no such super class, or there is no
 * super class at all (e.g. when `Object` is passed in).
 */
export function superClassOf(
  type: AbstractClass,
  satisfying: (this: void, type: AbstractClass) => boolean = () => true,
): AbstractClass | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const prototype = Reflect.getPrototypeOf(type.prototype);

  if (prototype == null) {
    return;
  }

  const superType = prototype.constructor as AbstractClass;

  if (satisfying(superType)) {
    return superType;
  }

  return superClassOf(superType, satisfying);
}
