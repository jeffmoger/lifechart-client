import { sum, subtract, amount } from './functions';
const item = {
  value: 0,
};

describe('Tests in Components/Gadgets/functions', () => {
  it('U:sum', () => {
    expect(sum(4, 7)).toBe(11);
  });
  it('U:subtract', () => {
    expect(subtract(10, 6)).toBe(4);
  });
  it('U:amount from item object', () => {
    expect(amount(item)).toStrictEqual(expect.any(Number));
  });
});
