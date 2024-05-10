import { atom, selector } from 'recoil';
import { LiveItem } from '../../_libs/types/live-item';

const key = 'askingPrice';
const askingPrice = atom<number>({
  key,
  default: 0,
});

export const askingPriceSelector = selector({
  key,
  get: ({ get }) => get(askingPrice),
  set: ({ set }, value) => set(askingPrice, value),
});
