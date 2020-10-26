/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Property accessor descriptor. I.e. the one with `get` and `set` functions.
 *
 * @typeParam TValue  Property value type.
 */
export interface PropertyAccessorDescriptor<TValue> extends TypedPropertyDescriptor<TValue> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: undefined;
  value?: undefined;
  get?: () => TValue;
  set?: (value: TValue) => void;
}

/**
 * Detects whether the given property descriptor is the one of property accessor.
 *
 * @typeParam TValue  Property value type.
 * @param desc  Target property descriptor.
 *
 * @return `true` if the descriptor has no `value` or `writable` attributes set.
 */
export function isPropertyAccessorDescriptor<TValue>(
    desc: TypedPropertyDescriptor<TValue>,
): desc is PropertyAccessorDescriptor<TValue> {
  return desc.value === undefined && desc.writable === undefined;
}

/**
 * Converts a property descriptor to property accessor descriptor.
 *
 * @typeParam TValue  Property value type.
 * @param desc  Target property descriptor.
 *
 * @return Either an accessor descriptor constructed from data descriptor, or `desc` if it is an accessor descriptor
 * already.
 */
export function toPropertyAccessorDescriptor<TValue>(
    desc: TypedPropertyDescriptor<TValue>,
): PropertyAccessorDescriptor<TValue> {
  if (isPropertyAccessorDescriptor(desc)) {
    return desc;
  }

  const value__symbol = Symbol('value');

  interface ValueHost {
    [value__symbol]: TValue;
  }

  const initial = desc.value as TValue;

  const accessorDesc: PropertyAccessorDescriptor<TValue> = {
    ...desc,
    writable: undefined,
    value: undefined,
    get(this: ValueHost) {
      return value__symbol in this ? this[value__symbol] : initial;
    },
  };

  if (desc.writable) {
    accessorDesc.set = function (this: ValueHost, newValue: TValue) {
      this[value__symbol] = newValue;
    };
  }

  delete accessorDesc.writable;
  delete accessorDesc.value;

  return accessorDesc;
}

/**
 * Creates an property accessor descriptor for the given field.
 *
 * @typeParam TObject  The type of target object.
 * @typeParam TKey  Target object property keys type.
 * @param target  The object containing target field.
 * @param fieldKey  Target field key.
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

/**
 * Converts an object field to property accessor.
 *
 * Defines a new property with the given name in the target object and returns its descriptor.
 *
 * The converted descriptor is always configurable, enumerable, and writable.
 *
 * @typeParam TObject  The type of target object.
 * @typeParam TKey  Target object property keys type.
 * @param target  The object containing target field.
 * @param fieldKey  Target field key.
 *
 * @return New property accessor descriptor.
 */
export function field2accessor<TObject, TKey extends keyof TObject>(
    target: TObject,
    fieldKey: TKey,
): PropertyAccessorDescriptor<TObject[TKey]> {

  const desc = fieldAccessorDescriptor(target, fieldKey);

  Object.defineProperty(target, fieldKey, desc);

  return desc;
}
