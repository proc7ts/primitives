import { lazyValue } from './lazy-value';

describe('lazyValue', () => {

  let provider: jest.Mock<string>;
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
});
