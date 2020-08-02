import { asis } from '../fn';
import { asyncValue } from './async-value';

describe('asyncValue', () => {
  it('resolves to the raw value', async () => {
    expect(await asyncValue('test')).toBe('test');
  });
  it('resolves to promised value', async () => {
    expect(await asyncValue(Promise.resolve('test'))).toBe('test');
  });
  it('rejects when value promise rejected', async () => {

    const error = new Error('test');

    expect(await asyncValue(Promise.reject(error)).catch(asis)).toBe(error);
  });
});
