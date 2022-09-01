import { describe, expect, it } from '@jest/globals';
import { hasOwnProperty } from './has-own-property.js';

describe('hasOwnProperty', () => {
  it('returns `true` when target object owns property', () => {
    const object: { a?: string | undefined } = Object.create(null);

    object.a = undefined;

    expect(hasOwnProperty(object, 'a')).toBe(true);
  });
  it('returns `false` when target property deleted', () => {
    const object: { a?: string | undefined } = { a: 'test' };

    delete object.a;

    expect(hasOwnProperty(object, 'a')).toBe(false);
  });
  it('returns `false` for the method defined in prototype', () => {
    class Base {

      a(): string {
        return 'test';
      }

}

    expect(hasOwnProperty(new Base(), 'a')).toBe(false);
    expect(hasOwnProperty(Base.prototype, 'a')).toBe(true);
  });
});
