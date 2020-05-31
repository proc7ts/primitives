import { extendSetOfElements, setOfElements } from './set-of-elements';

describe('setOfElements', () => {
  it('is empty when elements not specified', () => {
    expect(setOfElements(null).size).toBe(0);
  });
  it('contains the only element', () => {

    const set = setOfElements(1);

    expect(set.size).toBe(1);
    expect(set).toContain(1);
  });
  it('contains all elements', () => {

    const set = setOfElements([1, 2, 3]);

    expect(set.size).toBe(3);
    expect(set).toContain(1);
    expect(set).toContain(2);
    expect(set).toContain(3);
  });
});

describe('extendSetOfElements', () => {

  let set: Set<number>;

  beforeEach(() => {
    set = new Set([1, 2, 3]);
  });

  it('adds nothing when elements not specified', () => {
    expect(extendSetOfElements(set, null)).toBe(set);
    expect([...set]).toEqual([1, 2, 3]);
  });
  it('adds single element', () => {
    expect(extendSetOfElements(set, 0)).toBe(set);
    expect([...set]).toEqual([1, 2, 3, 0]);
  });
  it('adds all elements', () => {
    expect(extendSetOfElements(set, [2, 0, 5, 5])).toBe(set);
    expect([...set]).toEqual([1, 2, 3, 0, 5]);
  });
});
