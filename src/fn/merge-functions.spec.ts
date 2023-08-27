import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Mock } from 'jest-mock';
import { mergeFunctions } from './merge-functions.js';

describe('mergeFunctions', () => {
  let firstMock: Mock<(...args: unknown[]) => number>;
  let secondMock: Mock<(...args: unknown[]) => number>;
  let mergeMock: Mock<(...args: unknown[]) => number>;

  beforeEach(() => {
    firstMock = jest.fn(() => 1);
    secondMock = jest.fn(() => 2);
    mergeMock = jest.fn(() => 3);
  });

  it('merges function results', () => {
    const merged: (...args: unknown[]) => number = mergeFunctions(firstMock, secondMock, mergeMock);
    const self = { name: 'this' };
    const args = ['foo', 'bar'];

    expect(merged.apply(self, args)).toBe(3);

    expect(firstMock).toHaveBeenCalledTimes(1);
    expect(firstMock).toHaveBeenCalledWith(...args);
    expect(firstMock.mock.instances[0]).toBe(self);

    expect(secondMock).toHaveBeenCalledTimes(1);
    expect(secondMock).toHaveBeenCalledWith(...args);
    expect(secondMock.mock.instances[0]).toBe(self);

    expect(mergeMock).toHaveBeenCalledTimes(1);
    expect(mergeMock).toHaveBeenCalledWith(1, 2);
  });
  it('returns the second function result by default', () => {
    const merged: (...args: unknown[]) => number = mergeFunctions(firstMock, secondMock);
    const self = { name: 'this' };
    const args = ['foo', 'bar'];

    expect(merged.apply(self, args)).toBe(2);

    expect(firstMock).toHaveBeenCalledTimes(1);
    expect(firstMock).toHaveBeenCalledWith(...args);
    expect(firstMock.mock.instances[0]).toBe(self);

    expect(secondMock).toHaveBeenCalledTimes(1);
    expect(secondMock).toHaveBeenCalledWith(...args);
    expect(secondMock.mock.instances[0]).toBe(self);

    expect(mergeMock).not.toHaveBeenCalled();
  });
  it('returns the function if another one is absent', () => {
    expect(mergeFunctions(firstMock, undefined)).toBe(firstMock);
    expect(mergeFunctions(undefined, secondMock)).toBe(secondMock);
  });
});
