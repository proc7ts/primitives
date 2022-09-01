import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { Mock } from 'jest-mock';
import { lazyValue } from './lazy-value.js';

describe('lazyValue', () => {
  let provider: Mock<() => string>;
  let lazy: () => string;

  beforeEach(() => {
    provider = jest.fn(() => 'test');
    lazy = lazyValue(provider);
  });

  it('does not call provider until requested', () => {
    expect(provider).not.toHaveBeenCalled();
  });
  it('evaluates the value when called', () => {
    expect(lazy()).toBe('test');
    expect(provider).toHaveBeenCalledTimes(1);
  });
  it('does not re-evaluate the value', () => {
    lazy();
    provider.mockImplementation(() => 'other');
    expect(lazy()).toBe('test');
    expect(provider).toHaveBeenCalledTimes(1);
  });
  it('prevents recurrent evaluation', () => {
    provider.mockImplementation(lazy);
    expect(lazy).toThrow('Recurrent evaluation');
  });
  it('re-evaluates the value after error thrown', () => {
    const error = new Error();

    provider.mockImplementation(() => {
      throw error;
    });
    expect(lazy).toThrow(error);
    expect(lazy).toThrow(error);

    provider.mockImplementation(() => 'test');
    expect(lazy()).toBe('test');
  });
});
