import { atom, selector } from 'recoil';

const key = 'timer';

const timer = atom<number>({
  key,
  default: 10,
});

export const timerSelector = selector({
  key,
  get: ({ get }) => get(timer),
  set: ({ set }, value) => set(timer, value),
});
