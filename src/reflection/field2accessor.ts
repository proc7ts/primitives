import { fieldAccessorDescriptor } from './field-accessor-descriptor';
import type { PropertyAccessorDescriptor } from './property-accessor-descriptor';

/**
 * Converts an object field to property accessor.
 *
 * Defines a new property with the given name in the target object and returns its descriptor.
 *
 * The converted descriptor is always configurable, enumerable, and writable.
 *
 * @typeParam TObject - The type of target object.
 * @typeParam TKey - Target object property keys type.
 * @param target - The object containing target field.
 * @param fieldKey - Target field key.
 *
 * @return New property accessor descriptor.
 */
export function field2accessor<TObject extends object, TKey extends keyof TObject>(
    target: TObject,
    fieldKey: TKey,
): PropertyAccessorDescriptor<TObject[TKey]> {

  const desc = fieldAccessorDescriptor(target, fieldKey);

  Reflect.defineProperty(target, fieldKey, desc);

  return desc;
}
