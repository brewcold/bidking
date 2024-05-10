import { atom, selector } from 'recoil';

const key = 'bidInputDisable';
const bidPriceInputDisable = atom<boolean>({ key, default: true });

export const bidPriceInputAutoAbledSelector = selector({
  key,
  get: ({ get }) => get(bidPriceInputDisable),
  set: ({ set }) => {
    set(bidPriceInputDisable, true);
    setTimeout(() => set(bidPriceInputDisable, false));
  },
});

export const bidPriceInputDisableSelector = selector({
  key,
  get: ({ get }) => get(bidPriceInputDisable),
  set: ({ set }, value) => {
    set(bidPriceInputDisable, value);
  },
});
