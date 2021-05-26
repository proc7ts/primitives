import { beforeEach, describe, expect, it } from '@jest/globals';
import { asis } from '../fn';
import type { PromiseResolver } from './promise-resolver';
import { newPromiseResolver } from './promise-resolver';

describe('newPromiseResolver', () => {

  let resolver: PromiseResolver<string>;

  beforeEach(() => {
    resolver = newPromiseResolver();
  });

  describe('resolve', () => {
    it('resolves the promise before its construction', async () => {
      resolver.resolve('foo');
      resolver.resolve('bar');

      const promise = resolver.promise();

      expect(await promise).toBe('foo');
      await expect(promise).toBe(resolver.promise());
    });
    it('resolves the promise after its construction', async () => {

      const promise = resolver.promise();

      resolver.resolve('foo');
      resolver.resolve('bar');

      expect(await promise).toBe('foo');
      await expect(promise).toBe(resolver.promise());
    });
    it('resolves the promise by another one', async () => {

      const promise = resolver.promise();

      resolver.resolve(Promise.resolve('foo'));
      resolver.resolve(Promise.resolve('bar'));

      expect(await promise).toBe('foo');
      await expect(promise).toBe(resolver.promise());
    });
    it('resolves the void-value promise', async () => {

      const voidResolver = newPromiseResolver<void>();

      voidResolver.resolve();
      voidResolver.resolve(void 0);
      voidResolver.resolve(Promise.resolve());

      const promise = voidResolver.promise();

      expect(await promise).toBeUndefined();
      await expect(promise).toBe(voidResolver.promise());
    });
  });

  describe('reject', () => {

    let error1: Error;
    let error2: Error;

    beforeEach(() => {
      error1 = new Error('Error 1');
      error2 = new Error('Error 2');
    });

    it('rejects the promise before its construction', async () => {
      resolver.reject(error1);
      resolver.reject(error2);

      const promise = resolver.promise();

      expect(await promise.catch(asis)).toBe(error1);
      await expect(promise).toBe(resolver.promise());
    });
    it('rejects the promise after its construction', async () => {

      const promise = resolver.promise();

      resolver.reject(error1);
      resolver.reject(error2);

      expect(await promise.catch(asis)).toBe(error1);
      await expect(promise).toBe(resolver.promise());
    });
  });

  describe('promise', () => {
    it('builds the promise once', async () => {

      const promise = resolver.promise();

      await expect(resolver.promise()).toBe(promise);
      await expect(resolver.promise()).toBe(promise);
      await expect(resolver.promise()).toBe(promise);
    });
  });

});
