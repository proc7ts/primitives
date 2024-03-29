import { describe, expect, it } from '@jest/globals';
import { superClassOf } from './super-class-of.js';

describe('superClassOf', () => {
  it('finds the `Object` super class', () => {
    class TestClass {}

    expect(superClassOf(TestClass)).toBe(Object);
  });
  it('can not find a super class of `Object`', () => {
    expect(superClassOf(Object)).toBeUndefined();
  });
  it('finds super class', () => {
    class A {}

    class B extends A {}

    class C extends B {}

    expect(superClassOf(C)).toBe(B);
  });
  it('finds super class satisfying the given criteria', () => {
    class A {}

    class B extends A {}

    class C extends B {}

    expect(superClassOf(C, type => type.name === 'A')).toBe(A);
  });
});
