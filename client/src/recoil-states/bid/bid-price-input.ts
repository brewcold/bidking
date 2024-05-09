import { atom, selector } from 'recoil';

const key = 'bidPriceInput';
const bidPriceInput = atom<string>({
  key,
  default: '',
});

export const bidPriceInputSelector = selector({
  key,
  get: ({ get }) => get(bidPriceInput),
  set: ({ set }, value) => set(bidPriceInput, value),
});
