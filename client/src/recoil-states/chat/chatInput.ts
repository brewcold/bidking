import { atom, selector } from 'recoil';

const key = 'chatInput';
const chatInput = atom<string>({
  key,
  default: '',
});

export const chatInputSelector = selector({
  key,
  get: ({ get }) => get(chatInput),
  set: ({ set }, value) => set(chatInput, value),
});
