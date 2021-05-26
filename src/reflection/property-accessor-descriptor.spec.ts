import { describe, expect, it } from '@jest/globals';
import {
  isPropertyAccessorDescriptor,
  PropertyAccessorDescriptor,
  toPropertyAccessorDescriptor,
} from './property-accessor-descriptor';

describe('isPropertyAccessorDescriptor', () => {
  it('detect property accessor', () => {
    expect(isPropertyAccessorDescriptor({})).toBe(true);
  });
  it('detect data property', () => {
    expect(isPropertyAccessorDescriptor({ value: null })).toBe(false);
    expect(isPropertyAccessorDescriptor({ writable: false })).toBe(false);
  });
});

describe('toPropertyAccessorDescriptor', () => {
  it('does not modify property accessor descriptor', () => {

    const desc: PropertyAccessorDescriptor<string> = {
      get() {
        return 'value';
      },
    };

    expect(toPropertyAccessorDescriptor(desc)).toBe(desc);
  });
  it('converts read-only data property descriptor to property accessor one', () => {

    const target = {};
    const value = 'abc';
    const dataDesc: TypedPropertyDescriptor<string> = { value };
    const desc = toPropertyAccessorDescriptor(dataDesc);

    expect(desc.set).toBeUndefined();
    expect(desc.get).toBeInstanceOf(Function);

    const getter = desc.get!;

    expect(getter.call(target)).toBe(value);
  });
  it('converts writable data property descriptor to property accessor one', () => {

    const target = {};
    const value = 'abc';
    const dataDesc: TypedPropertyDescriptor<string> = {
      value,
      writable: true,
    };
    const desc = toPropertyAccessorDescriptor(dataDesc);

    expect(desc.set).toBeInstanceOf(Function);
    expect(desc.get).toBeInstanceOf(Function);

    const getter = desc.get!;
    const setter = desc.set!;

    expect(getter.call(target)).toBe(value);

    const newValue = 'def';

    setter.call(target, newValue);

    expect(getter.call(target)).toBe(newValue);
  });
});
