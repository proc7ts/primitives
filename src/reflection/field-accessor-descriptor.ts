import type { PropertyAccessorDescriptor } from './property-accessor-descriptor';

/**
 * Creates a property accessor descriptor for the given field.
 *
 * @typeParam TObject - The type of target object.
 * @typeParam TKey - Target object property keys type.
 * @param target - The object containing target field.
 * @param fieldKey - Target field key.
 */
export function fieldAccessorDescriptor<TObject, TKey extends keyof TObject>(
    target: TObject,
    fieldKey: TKey,
): PropertyAccessorDescriptor<TObject[TKey]> {

  const value__symbol = Symbol(`${String(fieldKey)}:value`);

  interface ValueHost {
    [value__symbol]: TObject[TKey];
  }

  const initial: TObject[TKey] = target[fieldKey];

  return {
    configurable: true,
    enumerable: true,
    get(this: ValueHost): TObject[TKey] {
      return value__symbol in this ? this[value__symbol] : initial;
    },
    set(this: ValueHost, newValue) {
      this[value__symbol] = newValue;
    },
  };
}
