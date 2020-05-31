/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Property accessor descriptor. I.e. the one with `get` and `set` functions.
 *
 * @typeparam TValue  Property value type.
 */
export interface PropertyAccessorDescriptor<V> extends TypedPropertyDescriptor<V> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: undefined;
  value?: undefined;
  get?: () => V;
  set?: (value: V) => void;
}

/**
 * Detects whether the given property descriptor is the one of property accessor.
 *
 * @typeparam V  Property value type.
 * @param desc  Target property descriptor.
 *
 * @return `true` if the descriptor has no `value` or `writable` attributes set.
 */
export function isPropertyAccessorDescriptor<V>(
    desc: TypedPropertyDescriptor<V>,
): desc is PropertyAccessorDescriptor<V> {
  return desc.value === undefined && desc.writable === undefined;
}

/**
 * Converts a property descriptor to property accessor descriptor.
 *
 * @typeparam V  Property value type.
 * @param desc  Target property descriptor.
 *
 * @return Either an accessor descriptor constructed from data descriptor, or `desc` if it is an accessor descriptor
 * already.
 */
export function toPropertyAccessorDescriptor<V>(
    desc: TypedPropertyDescriptor<V>,
): PropertyAccessorDescriptor<V> {
  if (isPropertyAccessorDescriptor(desc)) {
    return desc;
  }

  const value__symbol = Symbol('value');

  interface ValueHost {
    [value__symbol]: V;
  }

  const initial = desc.value as V;

  const accessorDesc: PropertyAccessorDescriptor<V> = {
    ...desc,
    writable: undefined,
    value: undefined,
    get(this: ValueHost) {
      return value__symbol in this ? this[value__symbol] : initial;
    },
  };

  if (desc.writable) {
    accessorDesc.set = function (this: ValueHost, newValue: V) {
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
 * @typeparam T  The type of target object.
 * @typeparam K  Target object property keys type.
 * @param target  The object containing target field.
 * @param fieldKey  Target field key.
 */
export function fieldAccessorDescriptor<T, K extends keyof T>(
    target: T,
    fieldKey: K,
): PropertyAccessorDescriptor<T[K]> {

  const value__symbol = Symbol(`${String(fieldKey)}:value`);

  interface ValueHost {
    [value__symbol]: T[K];
  }

  const initial: T[K] = target[fieldKey];

  return {
    configurable: true,
    enumerable: true,
    get(this: ValueHost): T[K] {
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
 * @typeparam T  The type of target object.
 * @typeparam K  Target object property keys type.
 * @param target  The object containing target field.
 * @param fieldKey  Target field key.
 *
 * @return New property accessor descriptor.
 */
export function field2accessor<T, K extends keyof T>(
    target: T,
    fieldKey: K,
): PropertyAccessorDescriptor<T[K]> {

  const desc = fieldAccessorDescriptor(target, fieldKey);

  Object.defineProperty(target, fieldKey, desc);

  return desc;
}