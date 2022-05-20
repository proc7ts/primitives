import { areTheSame } from '../value/mod.js';

/**
 * Checks whether two objects have equal properties.
 *
 * @typeParam - A type of objects to check.
 * @param first - First object to check.
 * @param second - Second object to check.
 * @param valuesAreEqual - A function that compares corresponding property values. Accepts property values from both
 * objects and their key as parameters. Returns `true` if property values are equal. By default, checks property values
 * for {@link areTheSame strict equality}.
 * @param keys - Either an iterable of property keys to compare, or a function returning one. Defaults to own keys
 * (`Reflect.ownKeys`) of both objects.
 *
 * @returns `true` if `valuesAreEqual` returned `true` for each property key, or `false` otherwise.
 */
export function propertiesAreEqual<TObject extends object, TKey extends keyof TObject = keyof TObject>(
    first: TObject,
    second: TObject,
    valuesAreEqual?: (<TPropertyKey extends TKey>(
        this: void,
        first: TObject[TPropertyKey],
        second: TObject[TPropertyKey],
        key: TPropertyKey,
    ) => boolean) | null,
    keys:
        | Iterable<TKey>
        | ((this: void, first: TObject, second: TObject) => Iterable<TKey>) = propertiesAreEqual$ownKeys,
): boolean {
  valuesAreEqual ||= areTheSame;

  const keyList = typeof keys === 'function' ? keys(first, second) : keys;

  for (const key of keyList) {

    const value1 = first[key];
    const value2 = second[key];

    if (!valuesAreEqual(value1, value2, key)) {
      return false;
    }
  }

  return true;
}

function *propertiesAreEqual$ownKeys<TObject extends object, TKey extends keyof TObject>(
    first: TObject,
    second: TObject,
): Iterable<TKey> {

  const keys = new Set<PropertyKey>();

  for (const key of Reflect.ownKeys(first)) {
    yield key as TKey;
    keys.add(key);
  }
  for (const key of Reflect.ownKeys(second)) {
    if (!keys.has(key)) {
      yield key as TKey;
    }
  }
}
