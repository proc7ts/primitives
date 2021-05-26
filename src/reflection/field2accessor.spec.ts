import { beforeEach, describe, expect, it } from '@jest/globals';
import { field2accessor } from './field2accessor';

describe('field2accessor', () => {

  let target: { a: string };
  let desc: PropertyDescriptor;

  beforeEach(() => {
    target = { a: 'value' };
    desc = field2accessor(target, 'a');
  });

  it('converts field to accessor', () => {
    expect(Reflect.getOwnPropertyDescriptor(target, 'a')).toEqual(desc);
  });
  it('converts to configurable property', () => {
    expect(desc.configurable).toBe(true);
  });
  it('converts to enumerable property', () => {
    expect(desc.enumerable).toBe(true);
  });
  it('preserves the value', () => {
    expect(target.a).toBe('value');
  });
  it('allows to set the value', () => {

    const newValue = 'other';

    target.a = newValue;
    expect(target.a).toBe(newValue);
  });
});
